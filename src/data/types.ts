export type ProductCategory =
  | "cabello"
  | "champu-acondicionador"
  | "barba-bigote"
  | "afeitado"
  | "facial"
  | "cepillos-peines";

export type ServiceCategory = "corte" | "barba" | "corte-barba";

export type OpeningSlot = {
  opens: string;
  closes: string;
};

export type OpeningDay = {
  day: string;
  schemaDay: string;
  slots: OpeningSlot[];
};

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  price: number;
  description?: string;
  recommendedProductCategories: ProductCategory[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  currency: "EUR";
  availability: "available" | "sold-out";
  image: string;
  alt: string;
  externalUrl: string;
};

export type ProductCollection = {
  id: "nuevo" | "favoritos" | "ofertas";
  number: string;
  title: string;
  copy: string;
  marquee: string[];
  productIds: string[];
};

export type Review = {
  id: string;
  quote: string;
  source: string;
};
