"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { siteConfig } from "@/data/site-config";
import styles from "./Hero089.module.css";

export function Hero089() {
  const stageRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    const render = () => {
      current.current.x += (target.current.x - current.current.x) * 0.09;
      current.current.y += (target.current.y - current.current.y) * 0.09;
      stage.style.transform = `rotateX(${current.current.y * -6}deg) rotateY(${current.current.x * 8}deg) translate3d(${current.current.x * 12}px, ${current.current.y * 8}px, 0)`;
      frame.current = window.requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      target.current.x = (event.clientX - rect.left) / rect.width - 0.5;
      target.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    frame.current = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section className={styles.hero} id="inicio">
      <Image
        className={styles.media}
        src="/images/home/hero.jpg"
        alt="Interior de 089 Barbería Profesional en Montequinto"
        fill
        sizes="100vw"
        fetchPriority="high"
        priority
      />
      <div className={styles.overlay} />
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.number}>089</div>
        <p className={styles.chip}>{siteConfig.locationLine}</p>
        <div className={styles.card}>
          <p>{siteConfig.addressShort}</p>
          <span>Booksy</span>
        </div>
      </div>
      <div className={styles.copy}>
        <p className="kicker">Montequinto · Dos Hermanas · Sevilla</p>
        <h1>{siteConfig.name}</h1>
        <p>{siteConfig.addressShort}</p>
        <BooksyButton label="Reservar" />
      </div>
      <span className={styles.scrollCue}>Scroll</span>
    </section>
  );
}
