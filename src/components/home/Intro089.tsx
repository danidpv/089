"use client";

import { useEffect, useState } from "react";
import styles from "./Intro089.module.css";

export function Intro089() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setHidden(true), reduced ? 700 : 2050);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.intro} ${hidden ? styles.out : ""}`} aria-hidden="true" data-testid="intro">
      <span className={styles.logo} data-testid="intro-logo" />
    </div>
  );
}
