"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Intro089.module.css";

const sequence = ["0", "08", "089"];

export function Intro089() {
  const [phase, setPhase] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const timer = window.setTimeout(() => setHidden(true), 650);
      return () => window.clearTimeout(timer);
    }

    const timers = [
      window.setTimeout(() => setPhase(1), 520),
      window.setTimeout(() => setPhase(2), 1040),
      window.setTimeout(() => setPhase(3), 1580),
      window.setTimeout(() => setHidden(true), 2450)
    ];

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <div className={`${styles.intro} ${phase >= 3 ? styles.logoOn : ""} ${hidden ? styles.out : ""}`} aria-hidden="true">
      <Image
        className={styles.logo}
        src="/images/branding/logo-089-transparent.webp"
        alt=""
        width={1230}
        height={1278}
        sizes="(max-width: 760px) 92vw, 58vw"
        fetchPriority="high"
        priority
      />
      <strong>{sequence[Math.min(phase, 2)]}</strong>
      <small>Barbería Profesional</small>
    </div>
  );
}
