import Image from "next/image";
import Link from "next/link";
import { BooksyButton } from "@/components/common/BooksyButton";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/data/site-config";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Image src="/images/branding/logo-089-transparent.webp" alt="Logo 089" width={62} height={64} />
          <div>
            <strong>{siteConfig.name}</strong>
            <span>{siteConfig.locationLine}</span>
          </div>
        </div>
        <nav className={styles.links} aria-label="Navegación de pie">
          <Link href="/carta">Servicios</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/#barberia">La barbería</Link>
          <Link href="/#visitanos">Contacto</Link>
          <Link href="/#opiniones">Reseñas</Link>
        </nav>
        <div className={styles.actions}>
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
