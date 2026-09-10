"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BarbershopVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export function BarbershopVideo({ src, poster, className }: BarbershopVideoProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (reduceMotion) {
    return <Image className={className} src={poster} alt="" aria-hidden="true" width={720} height={1280} />;
  }

  return (
    <video
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      aria-label="Recorrido por el interior de 089 Barberia Profesional"
    />
  );
}
