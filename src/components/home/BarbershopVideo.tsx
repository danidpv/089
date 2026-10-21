"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./BarbershopVideo.module.css";

type BarbershopVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export function BarbershopVideo({ src, poster, className }: BarbershopVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div className={`${styles.frame} ${className ?? ""}`} ref={frameRef}>
      <Image className={styles.media} src={poster} alt="" aria-hidden="true" fill sizes="(max-width: 860px) 100vw, 56vw" />
      {shouldLoad && !reduceMotion ? (
        <video
          className={styles.media}
          src={src}
          poster={poster}
          autoPlay
          muted
          playsInline
          preload="none"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
