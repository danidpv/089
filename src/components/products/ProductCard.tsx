import Image from "next/image";
import { productCategoryLabels } from "@/data/products";
import type { Product } from "@/data/types";
import styles from "./ProductCard.module.css";

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR"
});

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      className={styles.card}
      href={product.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="product-card"
    >
      <div className={styles.media}>
        <Image src={product.image} alt={product.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" />
        {product.availability === "sold-out" ? <span>Agotado</span> : null}
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{productCategoryLabels[product.category]}</span>
        <h4>{product.name}</h4>
        <p>{priceFormatter.format(product.price)}</p>
      </div>
    </a>
  );
}
