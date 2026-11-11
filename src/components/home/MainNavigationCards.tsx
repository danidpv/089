import Image from "next/image";
import Link from "next/link";
import styles from "./MainNavigationCards.module.css";

const cards = [
  {
    eyebrow: "Servicios",
    title: "Servicios 089.",
    href: "/servicios",
    image: "/images/services/service-cut.jpeg",
    alt: "Barbero de 089 trabajando un corte de caballero"
  },
  {
    eyebrow: "Selección profesional",
    title: "Marcas.",
    href: "/marcas",
    image: "/images/brands/brands-display.jpeg",
    alt: "Exposición de productos profesionales utilizados en 089"
  },
  {
    eyebrow: "Montequinto",
    title: "La barbería.",
    href: "/barberia",
    image: "/images/exterior/facade-motorcycle.jpeg",
    alt: "Fachada de 089 Barbería Profesional con motocicleta"
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
