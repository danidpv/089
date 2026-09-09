import Image from "next/image";
import Link from "next/link";
import styles from "./MainNavigationCards.module.css";

const cards = [
  {
    number: "01",
    eyebrow: "Servicios",
    title: "Carta 089.",
    href: "/carta",
    image: "/images/barberia/interior-01.jpg",
    alt: "Zona de corte de 089"
  },
  {
    number: "02",
    eyebrow: "089 Selection",
    title: "Productos.",
    href: "/productos",
    image: "/images/productos/ceras/product-shelf-01.jpg",
    alt: "Productos disponibles en 089"
  },
  {
    number: "03",
    eyebrow: "Montequinto",
    title: "La barbería.",
    href: "/#barberia",
    image: "/images/home/hero.jpg",
    alt: "Interior de 089 Barbería Profesional"
  }
];

export function MainNavigationCards() {
  return (
    <section className={styles.hub} aria-label="Accesos principales de 089" id="explora">
      <div className={styles.grid}>
        {cards.map((card) => (
          <Link className={styles.card} href={card.href} key={card.number}>
            <Image src={card.image} alt={card.alt} fill sizes="(max-width: 820px) 100vw, 33vw" />
            <span className={styles.shade} />
            <span className={styles.number}>{card.number}</span>
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
