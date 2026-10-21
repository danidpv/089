import Image from "next/image";
import Link from "next/link";
import styles from "./MainNavigationCards.module.css";

const cards = [
  {
    eyebrow: "Servicios",
    title: "Servicios 089.",
    href: "/servicios",
    image: "/images/services/barbers-at-work-vertical.webp",
    alt: "Profesionales de 089 trabajando en varios cortes"
  },
  {
    eyebrow: "Selección profesional",
    title: "Marcas.",
    href: "/marcas",
    image: "/images/branding/window-logo.jpg",
    alt: "Identidad gráfica de 089 en el escaparate"
  },
  {
    eyebrow: "Montequinto",
    title: "La barbería.",
    href: "/barberia",
    image: "/images/barberia/interior-main-frontal.webp",
    alt: "Interior de 089 Barbería Profesional"
  }
];

export function MainNavigationCards() {
  return (
    <section className={styles.hub} aria-label="Accesos principales de 089" id="explora">
      <div className={styles.grid}>
        {cards.map((card) => (
          <Link className={styles.card} href={card.href} key={card.href}>
            <Image src={card.image} alt={card.alt} fill sizes="(max-width: 820px) 100vw, 33vw" />
            <span className={styles.shade} />
            <span className={styles.label}>
              <small>{card.eyebrow}</small>
              <strong>{card.title}</strong>
              <i aria-hidden="true">↘</i>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
