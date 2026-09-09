import Image from "next/image";
import Link from "next/link";
import { productCategoryLabels } from "@/data/products";
import type { ProductCategory } from "@/data/types";
import styles from "./ProductRecommendation.module.css";

const previewImages: Record<ProductCategory, string> = {
  ceras: "/images/productos/ceras/matte-pomade.jpg",
  polvos: "/images/productos/polvos/styling-powder.jpg",
  shampoos: "/images/productos/shampoos/daily-shampoo.jpg",
  barba: "/images/productos/barba/beard-oil.jpg",
  peines: "/images/barberia/recepcion.jpg",
  geles: "/images/productos/geles/sea-salt-spray.jpg"
};

const helper: Record<ProductCategory, string> = {
  ceras: "Fijación y acabado",
  polvos: "Textura y volumen",
  shampoos: "Limpieza y cuidado diario",
  barba: "Suavidad e hidratación",
  peines: "Mantenimiento",
  geles: "Definición"
};

export function ProductRecommendation({ categories }: { categories: ProductCategory[] }) {
  const uniqueCategories = Array.from(new Set(categories));

  return (
    <div className={styles.kit}>
      <div className={styles.pills}>
        {uniqueCategories.map((category) => (
          <Link href={`/productos?categoria=${category}`} key={category}>
            {productCategoryLabels[category]}
          </Link>
        ))}
      </div>
      <div className={styles.thumbs}>
        {uniqueCategories.slice(0, 3).map((category) => (
          <Link className={styles.thumb} href={`/productos?categoria=${category}`} key={category}>
            <Image src={previewImages[category]} alt={productCategoryLabels[category]} fill sizes="120px" />
            <span>
              <b>{productCategoryLabels[category]}</b>
              <small>{helper[category]}</small>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
