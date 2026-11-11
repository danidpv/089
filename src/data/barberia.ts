export type BarberiaImage = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export const barberiaVideo = {
  src: "/media/barberia-tour.mp4",
  poster: "/media/barberia-tour-poster.webp",
  label: "Recorrido real de 089"
};

export const homeBarberiaImage: BarberiaImage = {
  src: "/images/exterior/facade-motorcycle.jpeg",
  alt: "Fachada de 089 Barbería Profesional con una motocicleta frente a la entrada",
  label: "Fachada",
  width: 768,
  height: 1024
};

export const barberiaGallery: BarberiaImage[] = [
  homeBarberiaImage,
  {
    src: "/images/barberia/interior-stations.jpeg",
    alt: "Vista general del interior de 089 con los puestos de barbería",
    label: "Puestos",
    width: 1080,
    height: 721
  },
  {
    src: "/images/barberia/interior-mirror.jpeg",
    alt: "Puesto de 089 reflejado en un espejo con marco de madera",
    label: "Interior",
    width: 768,
    height: 1024
  },
  {
    src: "/images/barberia/barber-at-work.jpeg",
    alt: "Barbero de 089 trabajando un corte frente al espejo",
    label: "Equipo",
    width: 1152,
    height: 2048
  },
  {
    src: "/images/brands/brand-suavecito-team.jpeg",
    alt: "Equipo de 089 mostrando una pieza de la marca Suavecito",
    label: "Marcas",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/services/service-cut.jpeg",
    alt: "Barbero de 089 trabajando un corte de caballero",
    label: "Servicio",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/barberia/haircut-modern.jpeg",
    alt: "Corte moderno con textura y contorno limpio realizado en 089",
    label: "Corte moderno",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/barberia/haircut-style.jpeg",
    alt: "Corte con textura y acabado posterior realizado en 089",
    label: "Corte con textura",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/barberia/haircut-clean.jpeg",
    alt: "Corte clásico peinado y perfilado realizado en 089",
    label: "Corte limpio",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/barberia/haircut-beard.jpeg",
    alt: "Corte degradado y barba larga perfilada en 089",
    label: "Corte y barba",
    width: 2048,
    height: 2048
  },
  {
    src: "/images/services/beard-trim-closeup.webp",
    alt: "Detalle de arreglo de barba en 089",
    label: "Barba",
    width: 900,
    height: 1200
  },
  {
    src: "/images/people/client-finished-look.webp",
    alt: "Cliente con acabado de barbería terminado",
    label: "Acabado",
    width: 900,
    height: 1200
  }
];
