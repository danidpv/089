import { ExternalLink, Star } from "lucide-react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { siteConfig } from "@/data/site-config";
import { reviewSummary, reviews } from "@/data/reviews";
import { ReviewsCarousel } from "./ReviewsCarousel";
import styles from "./ReviewsSection.module.css";

export function ReviewsSection() {
  return (
    <section className={`${styles.reviews} section`} id="opiniones">
      <div className={`container ${styles.inner}`}>
        <div className={`section-head ${styles.header}`}>
          <div>
            <p className="kicker">Reseñas</p>
            <h2 className="display">Lo que dicen<br />de 089.</h2>
          </div>
          <a className={styles.score} href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
            <strong>{reviewSummary.rating}</strong>
            <span aria-label="Cinco estrellas">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}
            </span>
            <small>{reviewSummary.count} · {reviewSummary.source}</small>
            <small>Consultado el {reviewSummary.checkedAt}</small>
          </a>
        </div>
        <ReviewsCarousel reviews={reviews} />
        <div className={styles.actions}>
          <BooksyButton label="Ver reseñas en Booksy" />
          {siteConfig.googleReviewUrl ? (
            <a href={siteConfig.googleReviewUrl} target="_blank" rel="noopener noreferrer">
              Déjanos tu reseña en Google
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
