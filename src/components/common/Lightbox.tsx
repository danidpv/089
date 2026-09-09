"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import styles from "./Lightbox.module.css";

type LightboxImage = {
  src: string;
  alt: string;
  label: string;
};

export function Lightbox({ images }: { images: LightboxImage[] }) {
  const [active, setActive] = useState<LightboxImage | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <button
            className={`${styles.shot} ${index === 0 ? styles.wide : ""}`}
            key={image.src}
            type="button"
            onClick={() => setActive(image)}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 820px) 100vw, 33vw" />
            <span>{image.label}</span>
            <i aria-hidden="true">＋</i>
          </button>
        ))}
      </div>

      {active ? (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label={active.alt} onClick={() => setActive(null)}>
          <button className={styles.close} ref={closeRef} type="button" aria-label="Cerrar" onClick={() => setActive(null)}>
            <X aria-hidden="true" size={22} />
          </button>
          <div className={styles.frame} onClick={(event) => event.stopPropagation()}>
            <Image src={active.src} alt={active.alt} width={1200} height={800} sizes="90vw" />
          </div>
        </div>
      ) : null}
    </>
  );
}
