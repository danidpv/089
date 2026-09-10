import Image from "next/image";
import { productCategoryLabels } from "@/data/products";
import type { Product } from "@/data/types";
import styles from "./ProductCard.module.css";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className={styles.card} data-testid="product-card">
      <div className={styles.media}>
        <Image src={product.image} alt={product.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" />
        {product.badge ? <span>{product.badge}</span> : null}
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{productCategoryLabels[product.category]}</span>
        <h4>{product.name}</h4>
        <p>{product.summary}</p>
      </div>
    </article>
  );
}
