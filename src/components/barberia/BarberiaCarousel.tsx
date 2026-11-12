"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { BarberiaGallerySection } from "@/data/barberia";
import styles from "./BarberiaCarousel.module.css";

type BarberiaCarouselProps = {
  sections: BarberiaGallerySection[];
};

type ModalSelection = {
  sectionIndex: number;
  imageIndex: number;
};

export function BarberiaCarousel({ sections }: BarberiaCarouselProps) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [modalSelection, setModalSelection] = useState<ModalSelection | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const showSection = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, sections.length - 1));
    const rail = railRef.current;
    const slide = rail?.children[nextIndex] as HTMLElement | undefined;
    if (!rail || !slide) return;

    setActiveSectionIndex(nextIndex);
    const target = Math.min(slide.offsetLeft, rail.scrollWidth - rail.clientWidth);
    rail.scrollTo({ left: target, behavior: "smooth" });
  };

  const updateActiveSection = () => {
    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail) return;
      const slides = Array.from(rail.children) as HTMLElement[];
      const maxScroll = rail.scrollWidth - rail.clientWidth;

      if (rail.scrollLeft <= 2) {
        setActiveSectionIndex(0);
        return;
      }
      if (rail.scrollLeft >= maxScroll - 2) {
        setActiveSectionIndex(sections.length - 1);
        return;
      }

      const nextIndex = slides.reduce((closest, slide, index) => {
        return Math.abs(slide.offsetLeft - rail.scrollLeft) < Math.abs(slides[closest].offsetLeft - rail.scrollLeft)
          ? index
          : closest;
      }, 0);
      setActiveSectionIndex(nextIndex);
    });
  };

  const openSection = (sectionIndex: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setModalSelection({ sectionIndex, imageIndex: 0 });
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const moveModalImage = (direction: number) => {
    setModalSelection((selection) => {
      if (!selection) return selection;
      const imageCount = sections[selection.sectionIndex].images.length;
      return {
        ...selection,
        imageIndex: (selection.imageIndex + direction + imageCount) % imageCount
      };
    });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (modalSelection && dialog && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => dialog.querySelector<HTMLButtonElement>("button")?.focus());
    }
  }, [modalSelection]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  const modalSection = modalSelection ? sections[modalSelection.sectionIndex] : null;
  const modalImage = modalSection && modalSelection ? modalSection.images[modalSelection.imageIndex] : null;
  const modalHasMultipleImages = (modalSection?.images.length ?? 0) > 1;

  return (
    <div className={styles.carousel} aria-label="Galerías de la barbería">
      <div className={styles.controls}>
        <button
          type="button"
          aria-label="Sección anterior"
          disabled={activeSectionIndex === 0}
          onClick={() => showSection(activeSectionIndex - 1)}
        >
          <ChevronLeft aria-hidden="true" size={20} />
        </button>
        <button
          type="button"
          aria-label="Sección siguiente"
          disabled={activeSectionIndex === sections.length - 1}
          onClick={() => showSection(activeSectionIndex + 1)}
        >
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      </div>

      <div
        className={styles.rail}
        ref={railRef}
        tabIndex={0}
        onScroll={updateActiveSection}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showSection(activeSectionIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showSection(activeSectionIndex + 1);
          }
        }}
      >
        {sections.map((section, index) => {
          const cover = section.images[0];
          return (
            <button
              className={`${styles.slide} ${index === activeSectionIndex ? styles.active : ""}`}
              key={section.id}
              type="button"
              aria-label={`Abrir galería: ${section.label}`}
              onClick={(event) => {
                setActiveSectionIndex(index);
                openSection(index, event.currentTarget);
              }}
            >
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 760px) 86vw, 340px" priority={index === 0} />
              <span className={styles.slideLabel}>
                <b>{section.label}</b>
                <small>{section.images.length} {section.images.length === 1 ? "foto" : "fotos"}</small>
              </span>
              <i aria-hidden="true"><Maximize2 size={18} /></i>
            </button>
          );
        })}
      </div>

      <div className={styles.dots} aria-label="Seleccionar sección">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            aria-label={`Ir a ${section.label}`}
            aria-current={index === activeSectionIndex}
            onClick={() => showSection(index)}
          />
        ))}
      </div>

      <dialog
        className={styles.modal}
        ref={dialogRef}
        aria-label={modalSection ? `Galería ${modalSection.label}` : "Fotografías de 089"}
        onClose={() => {
          setModalSelection(null);
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
          if (event.key === "ArrowLeft" && modalHasMultipleImages) moveModalImage(-1);
          if (event.key === "ArrowRight" && modalHasMultipleImages) moveModalImage(1);
        }}
      >
        {modalImage && modalSection && modalSelection ? (
          <div className={styles.modalContent}>
            <button className={styles.close} type="button" aria-label="Cerrar galería" onClick={closeModal}>
              <X aria-hidden="true" size={22} />
            </button>
            <button
              className={styles.modalPrev}
              type="button"
              aria-label="Foto anterior"
              disabled={!modalHasMultipleImages}
              onClick={() => moveModalImage(-1)}
            >
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            <figure className={styles.frame}>
              <Image src={modalImage.src} alt={modalImage.alt} width={modalImage.width} height={modalImage.height} sizes="92vw" />
              <figcaption>
                {modalSection.label} · {modalSelection.imageIndex + 1} de {modalSection.images.length}
              </figcaption>
            </figure>
            <button
              className={styles.modalNext}
              type="button"
              aria-label="Foto siguiente"
              disabled={!modalHasMultipleImages}
              onClick={() => moveModalImage(1)}
            >
              <ChevronRight aria-hidden="true" size={24} />
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
