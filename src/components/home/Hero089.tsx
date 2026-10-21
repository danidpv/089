"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { siteConfig } from "@/data/site-config";
import styles from "./Hero089.module.css";

export function Hero089() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (frame.current) window.cancelAnimationFrame(frame.current);
      frame.current = window.requestAnimationFrame(() => {
        stage.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 6}deg) translate3d(${x * 9}px, ${y * 6}px, 0)`;
      });
    };

    const onLeave = () => {
      stage.style.transform = "";
    };

    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section className={styles.hero} id="inicio" ref={heroRef}>
      <Image
        className={styles.media}
        src="/images/barberia/interior-main-frontal.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        quality={84}
      />
      <div className={styles.overlay} />
      <div className={styles.stage} ref={stageRef}>
        <span className={styles.number} aria-hidden="true" />
        <p className={styles.chip}>{siteConfig.locationLine}</p>
        <div className={styles.card}>
          <p>{siteConfig.addressShort}</p>
          <span>Booksy</span>
        </div>
      </div>
      <div className={styles.copy}>
        <p className="kicker">Montequinto · Dos Hermanas · Sevilla</p>
        <h1>089 · Barbería profesional en Montequinto</h1>
        <p data-testid="hero-address">{siteConfig.addressShort}</p>
        <BooksyButton label="Reservar" />
      </div>
      <span className={styles.scrollCue}>Scroll</span>
    </section>
  );
}
