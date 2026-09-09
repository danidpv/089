import type { Product, ProductCategory, ProductCollection } from "./types";

export const productCategoryLabels: Record<ProductCategory, string> = {
  ceras: "Ceras",
  polvos: "Polvos",
  shampoos: "Shampoos",
  barba: "Barba",
  peines: "Peines",
  geles: "Geles"
};

export const categoryAliases: Record<string, ProductCategory> = {
  cera: "ceras",
  ceras: "ceras",
  polvo: "polvos",
  polvos: "polvos",
  shampoo: "shampoos",
  shampoos: "shampoos",
  aceite: "barba",
  balsamo: "barba",
  barba: "barba",
  peines: "peines",
  peine: "peines",
  gel: "geles",
  geles: "geles"
};

export const products: Product[] = [
  {
    id: "styling-powder",
    name: "Styling Powder",
    category: "polvos",
    summary: "Textura y volumen con acabado ligero.",
    status: "Disponible en barbería",
    badge: "NUEVO",
    image: "/images/productos/polvos/styling-powder.jpg",
    alt: "Expositor de Styling Powder en 089"
  },
  {
    id: "matte-pomade",
    name: "Matte Pomade",
    category: "ceras",
    summary: "Control, definición y acabado mate.",
    status: "Disponible en barbería",
    badge: "TOP 089",
    image: "/images/productos/ceras/matte-pomade.jpg",
    alt: "Productos de fijación Matte Pomade"
  },
  {
    id: "beard-oil",
    name: "Beard Oil",
    category: "barba",
    summary: "Suavidad, hidratación y acabado limpio.",
    status: "Disponible en barbería",
    badge: "RECOMENDADO",
    image: "/images/productos/barba/beard-oil.jpg",
    alt: "Aceites para barba en expositor"
  },
  {
    id: "sea-salt-spray",
    name: "Sea Salt Spray",
    category: "geles",
    categories: ["geles", "ceras"],
    summary: "Movimiento, textura y acabado natural.",
    status: "Disponible en barbería",
    badge: "NUEVO",
    image: "/images/productos/geles/sea-salt-spray.jpg",
    alt: "Producto de styling Sea Salt Spray"
  },
  {
    id: "daily-shampoo",
    name: "Daily Shampoo",
    category: "shampoos",
    summary: "Limpieza y preparación para el día a día.",
    status: "Disponible en barbería",
    badge: "RECOMENDADO",
    image: "/images/productos/shampoos/daily-shampoo.jpg",
    alt: "Selección de shampoos profesionales"
  },
  {
    id: "beard-balm",
    name: "Beard Balm",
    category: "barba",
    summary: "Orden, acondicionamiento y forma para la barba.",
    status: "Disponible en barbería",
    badge: "BARBER'S CHOICE",
    image: "/images/productos/barba/beard-balm.jpg",
    alt: "Bálsamo de barba en 089"
  },
  {
    id: "pack-cabello",
    name: "Pack Cabello",
    category: "shampoos",
    categories: ["shampoos", "ceras"],
    summary: "Shampoo + producto de acabado para mantener el corte.",
    status: "Precio especial en local",
    badge: "OFERTA",
    image: "/images/productos/ceras/uppercut-display.jpg",
    alt: "Pack de productos para cabello"
  },
  {
    id: "pack-barba",
    name: "Pack Barba",
    category: "barba",
    categories: ["barba", "peines"],
    summary: "Cuidado + herramienta de mantenimiento para barba.",
    status: "Precio especial en local",
    badge: "OFERTA",
    image: "/images/productos/barba/balm-display.jpg",
    alt: "Pack de cuidado de barba"
  },
  {
    id: "pack-styling",
    name: "Pack Styling",
    category: "geles",
    categories: ["geles", "ceras", "polvos"],
    summary: "Textura + fijación para alternar acabados.",
    status: "Precio especial en local",
    badge: "OFERTA",
    image: "/images/productos/polvos/product-shelf-02.jpg",
    alt: "Productos de styling en estantería"
  },
  {
    id: "peines-cepillos",
    name: "Peines + Cepillos",
    category: "peines",
    summary: "Herramientas para mantener el look entre visitas.",
    status: "Precio especial en local",
    badge: "OFERTA",
    image: "/images/barberia/recepcion.jpg",
    alt: "Recepción y zona de mantenimiento en 089"
  }
];

export const productCollections: ProductCollection[] = [
  {
    id: "nuevo",
    number: "01",
    title: "Nuevo en 089.",
    copy: "Lo último que entra en la selección de producto.",
    marquee: ["NUEVO EN 089", "RECIÉN LLEGADO", "NUEVAS FÓRMULAS", "NUEVO EN 089"],
    productIds: ["styling-powder", "matte-pomade", "beard-oil", "sea-salt-spray"]
  },
  {
    id: "favoritos",
    number: "02",
    title: "Favoritos de 089.",
    copy: "Los que más encajan con el trabajo que se hace en el sillón.",
    marquee: ["089 RECOMIENDA", "LOS MÁS USADOS", "BARBER'S CHOICE", "TOP 089"],
    productIds: ["matte-pomade", "styling-powder", "daily-shampoo", "beard-balm"]
  },
  {
    id: "ofertas",
    number: "03",
    title: "Ofertas.",
    copy: "Espacio preparado para promociones y packs disponibles en el local.",
    marquee: ["SELECCIÓN 089", "PACKS EN LOCAL", "OFERTAS", "CONSULTAR EN BARBERÍA"],
    productIds: ["pack-cabello", "pack-barba", "pack-styling", "peines-cepillos"]
  }
];

export function normalizeCategory(value: string | null): ProductCategory | "todo" {
  if (!value || value === "todo") return "todo";
  return categoryAliases[value] ?? "todo";
}
