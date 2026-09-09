import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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
        <h4>{product.name}</h4>
        <p>{product.summary}</p>
        <div>
          <span>{product.status}</span>
          <Link href={`/productos?categoria=${product.category}`}>
            Ver producto <ExternalLink aria-hidden="true" size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
