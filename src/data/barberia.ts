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
  src: "/images/barberia/interior-main-frontal.webp",
  alt: "Interior frontal de 089 con pared verde, espejos y sillones",
  label: "Interior",
  width: 1080,
  height: 721
};

export const barberiaGallery: BarberiaImage[] = [
  homeBarberiaImage,
  {
    src: "/images/barberia/interior-longitudinal.webp",
    alt: "Vista longitudinal del local 089 con puestos de barberia",
    label: "Puestos",
    width: 1080,
    height: 740
  },
  {
    src: "/images/barberia/interior-working.webp",
    alt: "Barberos trabajando en el interior de 089",
    label: "Equipo",
    width: 1600,
    height: 1200
  },
  {
    src: "/images/barberia/interior-main-frontal-alt.webp",
    alt: "Interior de 089 visto desde la entrada",
    label: "Sala",
    width: 1080,
    height: 773
  },
  {
    src: "/images/exterior/facade-sign-day.webp",
    alt: "Fachada de 089 Barberia Profesional en Montequinto",
    label: "Fachada",
    width: 1080,
    height: 735
  },
  {
    src: "/images/exterior/facade-sign-night.webp",
    alt: "Rotulo exterior iluminado de 089",
    label: "Rotulo",
    width: 1080,
    height: 750
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
    alt: "Cliente con acabado de barberia terminado",
    label: "Acabado",
    width: 900,
    height: 1200
  }
];
