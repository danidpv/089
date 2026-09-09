import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import type { Service } from "@/data/types";
import { formatDuration, formatPrice } from "@/lib/format";
import { ProductRecommendation } from "./ProductRecommendation";
import styles from "./ServiceCard.module.css";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={styles.card}>
      <a className={styles.headline} href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
        <span>
          <strong>{service.name}</strong>
          {service.description ? <small>{service.description}</small> : null}
        </span>
        <span className={styles.meta}>
          <i>{formatDuration(service.durationMinutes)}</i>
          <b>{formatPrice(service.price)}</b>
          <em>
            Reservar <ExternalLink aria-hidden="true" size={13} />
          </em>
        </span>
      </a>
      <ProductRecommendation categories={service.recommendedProductCategories} />
    </article>
  );
}
