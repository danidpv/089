import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BarberiaCarousel } from "@/components/barberia/BarberiaCarousel";
import { BooksyButton } from "@/components/common/BooksyButton";
import { barberiaGallery } from "@/data/barberia";
import { siteConfig } from "@/data/site-config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "La barberia",
  description: "Galeria real del interior, fachada y ambiente de 089 Barberia Profesional en Montequinto."
};

export default function BarberiaPage() {
  const [heroImage, ...supportImages] = barberiaGallery;

  return (
    <main>
      <section className={styles.hero}>
        <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <p className="kicker">La barberia</p>
          <h1>El local de 089</h1>
          <p>
            Espacio de barberia profesional en Montequinto: puestos amplios, producto a mano y un ambiente pensado para
            trabajar con calma cada corte y cada barba.
          </p>
          <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin aria-hidden="true" size={16} />
            {siteConfig.addressShort}
          </a>
        </div>
      </section>

      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">Galeria</p>
              <h2 className="display">Interior,<br />fachada y oficio.</h2>
            </div>
            <p className="lead">
              Fotos reales del local y del trabajo diario. Usa las flechas o el teclado para moverte por la galeria.
            </p>
          </div>
          <BarberiaCarousel images={barberiaGallery} />
        </div>
      </section>

      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.copy}>
              <p className="kicker">089 por dentro</p>
              <h2>Un espacio directo, reconocible y preparado para repetir.</h2>
              <p>
                La barberia mantiene una identidad clara sin convertir la experiencia en decorado: sillones, espejos,
                herramientas y producto profesional forman parte del mismo lenguaje visual.
              </p>
            </div>
            {supportImages.slice(0, 3).map((image) => (
              <figure className={styles.storyImage} key={image.src}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 860px) 100vw, 30vw" />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <p className="kicker">Reserva</p>
          <h2>Ven a 089.</h2>
          <p>Elige servicio, hora y disponibilidad directamente en Booksy.</p>
        </div>
        <div className={styles.ctaActions}>
          <BooksyButton label="Reservar en Booksy" />
          <Link href="/#visitanos">
            Contacto
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
