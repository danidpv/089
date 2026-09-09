export type ProductCategory =
  | "ceras"
  | "polvos"
  | "shampoos"
  | "barba"
  | "peines"
  | "geles";

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
  name: string;
  category: ProductCategory;
  categories?: ProductCategory[];
  summary: string;
  status: string;
  badge?: string;
  image: string;
  alt: string;
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
