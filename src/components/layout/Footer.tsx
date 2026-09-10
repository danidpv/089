import Link from "next/link";
import { BooksyButton } from "@/components/common/BooksyButton";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/data/site-config";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <Link className={styles.logoLink} href="/" aria-label="089 Barbería Profesional - inicio">
            <span className={styles.logoMark} aria-hidden="true" />
          </Link>
          <div>
            <strong>{siteConfig.name}</strong>
            <span>{siteConfig.locationLine}</span>
          </div>
        </div>
        <nav className={styles.links} aria-label="Navegación de pie">
          <Link href="/">Inicio</Link>
          <Link href="/carta">Servicios</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/#barberia">La barbería</Link>
          <Link href="/#visitanos">Contacto</Link>
          <Link href="/#opiniones">Reseñas</Link>
        </nav>
        <div className={styles.actionBlock}>
          <SocialLinks />
          <BooksyButton compact />
        </div>
      </div>
      <div className={styles.bottom}>
        <span>Reserva y disponibilidad mediante Booksy</span>
        <span>{siteConfig.name}</span>
      </div>
    </footer>
  );
}
