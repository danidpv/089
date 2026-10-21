import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { brands } from "@/data/brands";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Marcas profesionales",
  description:
    "Descubre las marcas profesionales con las que trabaja 089 Barbería Profesional en Montequinto: Uppercut Deluxe, Suavecito, Dick Johnson y Dr. K.",
  alternates: { canonical: "/marcas" },
  openGraph: {
    title: "Marcas profesionales de 089",
    description: "Uppercut Deluxe, Suavecito, Dick Johnson y Dr. K en la selección profesional de 089.",
    url: "/marcas",
    images: [{ url: "/images/branding/window-logo.jpg", width: 680, height: 454 }]
  }
};

export default function MarcasPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/branding/window-logo.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          quality={86}
        />
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <p className="kicker">Selección profesional</p>
          <h1>Descubre nuestras marcas</h1>
          <p>Cuatro firmas que forman parte del trabajo y el criterio profesional de 089.</p>
          <Link href="/">Volver a inicio</Link>
        </div>
      </section>

      <section className={`${styles.brands} section`} aria-labelledby="brands-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">Marcas</p>
              <h2 className="display" id="brands-title">Herramientas<br />con criterio.</h2>
            </div>
            <p className="lead">Una selección breve y reconocible, presentada sin catálogo, precios ni promesas de disponibilidad.</p>
          </div>

          <div className={styles.brandGrid} data-testid="brand-grid">
            {brands.map((brand) => (
              <article className={styles.brandCard} key={brand.id}>
                <span aria-hidden="true">089</span>
                <h3>{brand.name}</h3>
                <p>Marca profesional seleccionada por 089.</p>
              </article>
            ))}
          </div>

          <div className={styles.cta}>
            <div>
              <p className="kicker">Asesoramiento</p>
              <h2>El acabado empieza con un buen servicio.</h2>
            </div>
            <div className={styles.ctaActions}>
              <BooksyButton label="Reservar en Booksy" />
              <Link href="/servicios">Ver servicios <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
