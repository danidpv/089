import { Star } from "lucide-react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { siteConfig } from "@/data/site-config";
import { reviewSummary, reviews } from "@/data/reviews";
import styles from "./ReviewsSection.module.css";

export function ReviewsSection() {
  return (
    <section className={`${styles.reviews} section`} id="opiniones">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="kicker">Reseñas</p>
            <h2 className="display">Así vive<br />089 la gente.</h2>
          </div>
          <a className={styles.score} href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
            <strong>{reviewSummary.rating}</strong>
            <span aria-label="Cinco estrellas">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}
            </span>
            <small>{reviewSummary.count} · {reviewSummary.source}</small>
          </a>
        </div>
        <div className={styles.grid}>
          {reviews.map((review) => (
            <article className={styles.review} key={review.id}>
              <q>{review.quote}</q>
              <div>
                <span>{review.source}</span>
                <span>★★★★★</span>
              </div>
            </article>
          ))}
          <div className={styles.action}>
            <BooksyButton label="Ver en Booksy" />
          </div>
        </div>
      </div>
    </section>
  );
}
