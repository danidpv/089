"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { BarberiaImage } from "@/data/barberia";
import styles from "./BarberiaCarousel.module.css";

type BarberiaCarouselProps = {
  images: BarberiaImage[];
};

export function BarberiaCarousel({ images }: BarberiaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const showImage = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, images.length - 1));
    setActiveIndex(nextIndex);
    railRef.current?.children[nextIndex]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const updateActiveIndex = () => {
    const rail = railRef.current;
    if (!rail) return;
    const slides = Array.from(rail.children) as HTMLElement[];
    const nextIndex = slides.reduce((closestIndex, slide, index) => {
      const closestDistance = Math.abs(slides[closestIndex].offsetLeft - rail.scrollLeft);
      const distance = Math.abs(slide.offsetLeft - rail.scrollLeft);
      return distance < closestDistance ? index : closestIndex;
    }, 0);
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (modalIndex === null) return;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalIndex(null);
      if (event.key === "ArrowLeft") setModalIndex((value) => (value === null ? value : (value - 1 + images.length) % images.length));
      if (event.key === "ArrowRight") setModalIndex((value) => (value === null ? value : (value + 1) % images.length));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, modalIndex]);

  const modalImage = modalIndex === null ? null : images[modalIndex];

  return (
    <div className={styles.carousel} aria-label="Galeria de la barberia">
      <div className={styles.controls}>
        <button type="button" aria-label="Fotografía anterior" disabled={activeIndex === 0} onClick={() => showImage(activeIndex - 1)}>
          <ChevronLeft aria-hidden="true" size={20} />
        </button>
        <button type="button" aria-label="Fotografía siguiente" disabled={activeIndex === images.length - 1} onClick={() => showImage(activeIndex + 1)}>
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      </div>

      <div
        className={styles.rail}
        ref={railRef}
        tabIndex={0}
        onScroll={updateActiveIndex}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") showImage(activeIndex - 1);
          if (event.key === "ArrowRight") showImage(activeIndex + 1);
        }}
      >
        {images.map((image, index) => (
          <button
            className={`${styles.slide} ${index === activeIndex ? styles.active : ""}`}
            key={image.src}
            type="button"
            aria-label={`Abrir foto: ${image.label}`}
            onClick={() => {
              setActiveIndex(index);
              setModalIndex(index);
            }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 86vw, 64vw" priority={index === 0} />
            <span>{image.label}</span>
            <i aria-hidden="true">
              <Maximize2 size={18} />
            </i>
          </button>
        ))}
      </div>

      <div className={styles.dots} aria-label="Seleccionar foto">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Ir a ${image.label}`}
            aria-current={index === activeIndex}
            onClick={() => showImage(index)}
          />
        ))}
      </div>

      {modalImage ? (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label={modalImage.alt} onClick={() => setModalIndex(null)}>
          <button className={styles.close} ref={closeRef} type="button" aria-label="Cerrar" onClick={() => setModalIndex(null)}>
            <X aria-hidden="true" size={22} />
          </button>
          <button className={styles.modalPrev} type="button" aria-label="Foto anterior" onClick={(event) => {
            event.stopPropagation();
            setModalIndex((value) => (value === null ? value : (value - 1 + images.length) % images.length));
          }}>
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <div className={styles.frame} onClick={(event) => event.stopPropagation()}>
            <Image src={modalImage.src} alt={modalImage.alt} width={modalImage.width} height={modalImage.height} sizes="92vw" />
          </div>
          <button className={styles.modalNext} type="button" aria-label="Foto siguiente" onClick={(event) => {
            event.stopPropagation();
            setModalIndex((value) => (value === null ? value : (value + 1) % images.length));
          }}>
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
