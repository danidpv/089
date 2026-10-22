import { ExternalLink, Star } from "lucide-react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { siteConfig } from "@/data/site-config";
import { reviewSummaries, reviews } from "@/data/reviews";
import { ReviewsCarousel } from "./ReviewsCarousel";
import styles from "./ReviewsSection.module.css";

export function ReviewsSection() {
  const googleReviews = reviews.filter((review) => review.source === "Google");
  const booksyReviews = reviews.filter((review) => review.source === "Booksy");

  return (
    <section className={`${styles.reviews} section`} id="opiniones">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <p className="kicker">Reseñas</p>
          <h2 className="display">Dos plataformas.<br />Una misma confianza.</h2>
          <p>Opiniones reales de clientes en Google y Booksy.</p>
        </div>

        <div className={styles.platformGrid}>
          <div className={styles.platformCard}>
            <div className={styles.platformHead}>
              <div>
                <span className={styles.platformName}>Google</span>
                <div className={styles.stars} aria-label="Cinco estrellas">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}
                </div>
              </div>
              <strong>{reviewSummaries.Google.rating}</strong>
              <small>{reviewSummaries.Google.count}</small>
            </div>
            <ReviewsCarousel reviews={googleReviews} label="Google" testId="reviews-carousel-google" />
            <a className={styles.platformLink} href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              Ver reseñas en Google
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          </div>

          <div className={styles.platformCard}>
            <div className={styles.platformHead}>
              <div>
                <span className={styles.platformName}>Booksy</span>
                <div className={styles.stars} aria-label="Cinco estrellas">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}
                </div>
              </div>
              <strong>{reviewSummaries.Booksy.rating}</strong>
              <small>{reviewSummaries.Booksy.count}</small>
            </div>
            <ReviewsCarousel reviews={booksyReviews} label="Booksy" testId="reviews-carousel-booksy" />
            <div className={styles.booksyAction}>
              <BooksyButton label="Ver reseñas en Booksy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
