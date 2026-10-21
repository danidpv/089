"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Review } from "@/data/types";
import styles from "./ReviewsCarousel.module.css";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticScrollRef = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionPreference, () => true);

  const moveTo = useCallback((index: number) => {
    const nextIndex = (index + reviews.length) % reviews.length;
    const rail = railRef.current;
    const slide = rail?.children[nextIndex] as HTMLElement | undefined;
    if (!rail || !slide) return;

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    programmaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current) clearTimeout(programmaticScrollTimerRef.current);
    programmaticScrollTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
    }, prefersReducedMotion ? 100 : 700);
    rail.scrollTo({
      left: slide.offsetLeft - rail.offsetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion, reviews.length]);

  const updateActive = () => {
    if (programmaticScrollRef.current) return;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      const rail = railRef.current;
      if (!rail) return;
      const slides = Array.from(rail.children) as HTMLElement[];
      const index = slides.reduce((closest, slide, current) => {
        const slideLeft = slide.offsetLeft - rail.offsetLeft;
        const closestLeft = slides[closest].offsetLeft - rail.offsetLeft;
        return Math.abs(slideLeft - rail.scrollLeft) < Math.abs(closestLeft - rail.scrollLeft)
          ? current
          : closest;
      }, 0);
      activeIndexRef.current = index;
      setActiveIndex(index);
    }, 100);
  };

  useEffect(() => {
    if (!autoPlay || interacting || prefersReducedMotion || reviews.length < 2) return;

    const interval = window.setInterval(() => {
      moveTo(activeIndexRef.current + 1);
    }, 4_800);

    return () => window.clearInterval(interval);
  }, [autoPlay, interacting, moveTo, prefersReducedMotion, reviews.length]);

  useEffect(() => () => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    if (programmaticScrollTimerRef.current) clearTimeout(programmaticScrollTimerRef.current);
  }, []);

  return (
    <div
      className={styles.carousel}
      data-testid="reviews-carousel"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div className={styles.controls}>
        <button type="button" aria-label="Reseña anterior" onClick={() => moveTo(activeIndex - 1)}>
          <ChevronLeft aria-hidden="true" size={20} />
        </button>
        <span aria-live="polite">{activeIndex + 1} de {reviews.length}</span>
        <button type="button" aria-label="Reseña siguiente" onClick={() => moveTo(activeIndex + 1)}>
          <ChevronRight aria-hidden="true" size={20} />
        </button>
        <button
          className={styles.playback}
          type="button"
          aria-label={autoPlay ? "Pausar carrusel de reseñas" : "Reproducir carrusel de reseñas"}
          aria-pressed={!autoPlay}
          onClick={() => setAutoPlay((value) => !value)}
        >
          {autoPlay ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
        </button>
      </div>

      <div
        className={styles.rail}
        ref={railRef}
        tabIndex={0}
        aria-label="Reseñas verificadas de clientes"
        onScroll={updateActive}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveTo(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            moveTo(activeIndex + 1);
          }
        }}
      >
        {reviews.map((review) => (
          <article className={styles.review} key={review.id}>
            <q>{review.quote}</q>
            <footer>
              <strong>{review.author}</strong>
              <span>Cliente verificado · {review.source}</span>
              <small>{review.service}</small>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
