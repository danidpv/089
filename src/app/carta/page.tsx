import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ServiceGroup } from "@/components/services/ServiceGroup";
import { serviceCategoryLabels, services } from "@/data/services";
import type { ServiceCategory } from "@/data/types";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Carta y precios",
  description:
    "Carta 089 con cortes, barba, combinaciones, duración y precios de 089 Barbería Profesional en Montequinto."
};

const categories = Object.keys(serviceCategoryLabels) as ServiceCategory[];

export default function CartaPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/barberia/interior-01.jpg"
          alt=""
          fill
          sizes="100vw"
          fetchPriority="high"
          priority
        />
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <p className="kicker">Tarifa clara</p>
          <h1>Carta 089.</h1>
          <p>Cortes, barba y combinaciones pensadas para que elijas rápido, reserves mejor y mantengas el resultado con producto recomendado por 089.</p>
          <Link href="/">← Volver a Inicio</Link>
        </div>
      </section>
      <section className={`${styles.services} section`} id="servicios">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">Servicios</p>
              <h2 className="display">Carta<br />089.</h2>
            </div>
            <p className="lead">Cada servicio enlaza a Booksy y a las categorías de producto que mejor encajan con el mantenimiento.</p>
          </div>
          <div className={styles.grid}>
            {categories.map((category) => (
              <ServiceGroup
                category={category}
                services={services.filter((service) => service.category === category)}
                key={category}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
