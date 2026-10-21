import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BooksyButton } from "@/components/common/BooksyButton";
import { ServiceGroup } from "@/components/services/ServiceGroup";
import { serviceCategoryLabels, services } from "@/data/services";
import type { ServiceCategory } from "@/data/types";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Servicios de barbería en Montequinto",
  description:
    "Servicios 089: corte de caballero, arreglo de barba y combinaciones con precios y duración. Reserva tu cita en Montequinto mediante Booksy.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios 089 | Barbería en Montequinto",
    description: "Consulta cortes, barba, duración y precios de 089 Barbería Profesional.",
    url: "/servicios",
    images: [{ url: "/images/barberia/interior-working.webp", width: 1600, height: 1200 }]
  }
};

const categories = Object.keys(serviceCategoryLabels) as ServiceCategory[];

export default function ServiciosPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/barberia/interior-working.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          quality={84}
        />
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <p className="kicker">Corte · barba · cuidado</p>
          <h1>Servicios de barbería 089</h1>
          <p>Elige tu servicio, consulta su duración y precio, y reserva la cita directamente en Booksy.</p>
          <div className={styles.heroActions}>
            <BooksyButton label="Reservar cita" />
            <Link href="/">Volver a inicio</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.services} section`} id="servicios" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">Precios y duración</p>
              <h2 className="display" id="services-title">Servicios<br />089.</h2>
            </div>
            <p className="lead">Información clara para elegir entre corte, barba o un servicio combinado. La disponibilidad se confirma en Booksy.</p>
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
