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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const showImage = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, images.length - 1));
    const rail = railRef.current;
    const slide = rail?.children[nextIndex] as HTMLElement | undefined;
    if (!rail || !slide) return;

    setActiveIndex(nextIndex);
    const target = Math.min(slide.offsetLeft, rail.scrollWidth - rail.clientWidth);
    rail.scrollTo({ left: target, behavior: "smooth" });
  };

  const updateActiveIndex = () => {
    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail) return;
      const slides = Array.from(rail.children) as HTMLElement[];
      const maxScroll = rail.scrollWidth - rail.clientWidth;

      if (rail.scrollLeft <= 2) {
        setActiveIndex(0);
        return;
      }
      if (rail.scrollLeft >= maxScroll - 2) {
        setActiveIndex(images.length - 1);
        return;
      }

      const nextIndex = slides.reduce((closest, slide, index) => {
        return Math.abs(slide.offsetLeft - rail.scrollLeft) < Math.abs(slides[closest].offsetLeft - rail.scrollLeft)
          ? index
          : closest;
      }, 0);
      setActiveIndex(nextIndex);
    });
  };

  const openModal = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setModalIndex(index);
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (modalIndex !== null && dialog && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => dialog.querySelector<HTMLButtonElement>("button")?.focus());
    }
  }, [modalIndex]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  const modalImage = modalIndex === null ? null : images[modalIndex];

  return (
    <div className={styles.carousel} aria-label="Galería de la barbería">
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
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showImage(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showImage(activeIndex + 1);
          }
        }}
      >
        {images.map((image, index) => (
          <button
            className={`${styles.slide} ${index === activeIndex ? styles.active : ""}`}
            key={image.src}
            type="button"
            aria-label={`Abrir foto: ${image.label}`}
            onClick={(event) => {
              setActiveIndex(index);
              openModal(index, event.currentTarget);
            }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 86vw, 340px" priority={index === 0} />
            <span>{image.label}</span>
            <i aria-hidden="true"><Maximize2 size={18} /></i>
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

      <dialog
        className={styles.modal}
        ref={dialogRef}
        aria-label={modalImage?.alt ?? "Fotografía ampliada de 089"}
        onClose={() => {
          setModalIndex(null);
          openerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
            const first = focusable[0];
            const last = focusable.at(-1);

            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === "ArrowLeft") setModalIndex((value) => value === null ? value : (value - 1 + images.length) % images.length);
          if (event.key === "ArrowRight") setModalIndex((value) => value === null ? value : (value + 1) % images.length);
        }}
      >
        {modalImage ? (
          <div className={styles.modalContent}>
            <button className={styles.close} type="button" aria-label="Cerrar fotografía" onClick={closeModal}>
              <X aria-hidden="true" size={22} />
            </button>
            <button className={styles.modalPrev} type="button" aria-label="Foto anterior" onClick={() => setModalIndex((value) => value === null ? value : (value - 1 + images.length) % images.length)}>
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            <figure className={styles.frame}>
              <Image src={modalImage.src} alt={modalImage.alt} width={modalImage.width} height={modalImage.height} sizes="92vw" />
              <figcaption>{modalImage.label}</figcaption>
            </figure>
            <button className={styles.modalNext} type="button" aria-label="Foto siguiente" onClick={() => setModalIndex((value) => value === null ? value : (value + 1) % images.length)}>
              <ChevronRight aria-hidden="true" size={24} />
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
