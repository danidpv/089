export type BarberiaImage = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export type BarberiaGallerySection = {
  id: "exterior" | "interior" | "equipo" | "cortes" | "marcas";
  label: string;
  images: BarberiaImage[];
};

export const barberiaVideo = {
  src: "/media/barberia-tour.mp4",
  poster: "/media/barberia-tour-poster.webp",
  label: "Recorrido real de 089"
};

export const barberiaPreviewImage: BarberiaImage = {
  src: "/images/branding/window-logo.jpg",
  alt: "Logotipo de 089 Barbería Profesional en el cristal de la entrada",
  label: "Fachada",
  width: 680,
  height: 454
};

export const homeBarberiaImage: BarberiaImage = {
  src: "/images/exterior/Fachada1.jpeg",
  alt: "Fachada de 089 Barbería Profesional con motocicletas frente a la entrada",
  label: "Fachada",
  width: 1200,
  height: 1600
};

const exteriorImages: BarberiaImage[] = [
  homeBarberiaImage,
  {
    src: "/images/exterior/facade-motorcycle.jpeg",
    alt: "Fachada de 089 Barbería Profesional con una motocicleta roja",
    label: "Exterior",
    width: 768,
    height: 1024
  },
  {
    src: "/images/exterior/facade-sign-night.webp",
    alt: "Rótulo exterior iluminado de 089 Barbería Profesional",
    label: "Exterior",
    width: 1080,
    height: 750
  },
  {
    src: "/images/exterior/door-logo-gold.webp",
    alt: "Logotipo dorado de 089 en la entrada de la barbería",
    label: "Exterior",
    width: 788,
    height: 788
  }
];

const interiorImages: BarberiaImage[] = [
  {
    src: "/images/interior/interior-main-frontal.webp",
    alt: "Vista frontal de los puestos de trabajo de 089",
    label: "Interior",
    width: 1080,
    height: 721
  },
  {
    src: "/images/interior/interior-longitudinal.webp",
    alt: "Vista longitudinal del interior de 089 y sus puestos",
    label: "Interior",
    width: 1080,
    height: 740
  },
  {
    src: "/images/interior/interior-mirror.jpeg",
    alt: "Puesto de 089 reflejado en un espejo con marco de madera",
    label: "Interior",
    width: 768,
    height: 1024
  },
  {
    src: "/images/interior/interior-01.jpg",
    alt: "Detalle del interior de 089 Barbería Profesional",
    label: "Interior",
    width: 680,
    height: 454
  },
  {
    src: "/images/interior/interior-02.jpg",
    alt: "Zona de trabajo y mobiliario del local de 089",
    label: "Interior",
    width: 680,
    height: 454
  },
  {
    src: "/images/interior/interior-03.jpg",
    alt: "Ambiente interior de 089 Barbería Profesional",
    label: "Interior",
    width: 900,
    height: 680
  }
];

const equipoImages: BarberiaImage[] = [
  {
    src: "/images/interior/interior-working.webp",
    alt: "Equipo de 089 trabajando en el interior de la barbería",
    label: "Equipo",
    width: 1600,
    height: 1200
  },
  {
    src: "/images/interior/barber-at-work.jpeg",
    alt: "Barbero de 089 trabajando un corte frente al espejo",
    label: "Equipo",
    width: 1152,
    height: 2048
  }
];

const cortesImages: BarberiaImage[] = [
  {
    src: "/images/services/Servicios089.jpeg",
    alt: "Clientes y barberos durante una jornada en 089",
    label: "Cortes",
    width: 768,
    height: 1024
  },
  {
    src: "/images/services/Corte.jpeg",
    alt: "Barbero de 089 trabajando un corte de caballero",
    label: "Cortes",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/services/CorteModerno.jpeg",
    alt: "Corte moderno con textura y contorno limpio realizado en 089",
    label: "Cortes",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/services/CorteStyle.jpeg",
    alt: "Corte con textura y acabado posterior realizado en 089",
    label: "Cortes",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/services/corteLimpio.jpeg",
    alt: "Corte clásico peinado y perfilado realizado en 089",
    label: "Cortes",
    width: 1536,
    height: 2048
  },
  {
    src: "/images/services/Corte+barba.jpeg",
    alt: "Corte degradado y barba larga perfilada en 089",
    label: "Cortes",
    width: 2048,
    height: 2048
  },
  {
    src: "/images/services/beard-trim-closeup.webp",
    alt: "Detalle de arreglo de barba en 089",
    label: "Cortes",
    width: 900,
    height: 1200
  }
];

const marcasImages: BarberiaImage[] = [
  {
    src: "/images/brands/brands-display.jpeg",
    alt: "Exposición de productos profesionales utilizados en 089",
    label: "Marcas",
    width: 768,
    height: 576
  }
];

export const barberiaGallerySections: BarberiaGallerySection[] = [
  { id: "exterior", label: "Exterior", images: exteriorImages },
  { id: "interior", label: "Interior", images: interiorImages },
  { id: "equipo", label: "Equipo", images: equipoImages },
  { id: "cortes", label: "Cortes", images: cortesImages },
  { id: "marcas", label: "Marcas", images: marcasImages }
];

export const barberiaGallery = barberiaGallerySections.flatMap((section) => section.images);
export const barberiaStoryImages = interiorImages.slice(0, 3);
