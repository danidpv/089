import Image from "next/image";
import Link from "next/link";
import { productCategoryLabels } from "@/data/products";
import type { ProductCategory } from "@/data/types";
import styles from "./ProductRecommendation.module.css";

const previewImages: Record<ProductCategory, string> = {
  cabello: "/images/productos/cabello/pomada-deluxe.webp",
  "champu-acondicionador": "/images/productos/champu-acondicionador/3-in-1-wash.webp",
  "barba-bigote": "/images/productos/barba-bigote/beard-oil.webp",
  afeitado: "/images/productos/afeitado/aftershave-suavecito-cristal.webp",
  facial: "/images/productos/facial/limpiador-facial-exfoliante.webp",
  "cepillos-peines": "/images/productos/cepillos-peines/pocket-comb.webp"
};

const helper: Record<ProductCategory, string> = {
  cabello: "Fijacion y acabado",
  "champu-acondicionador": "Limpieza y cuidado diario",
  "barba-bigote": "Suavidad e hidratacion",
  afeitado: "Ritual de afeitado",
  facial: "Cuidado de la piel",
  "cepillos-peines": "Mantenimiento"
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
