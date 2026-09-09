import type { Service, ServiceCategory } from "./types";

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  corte: "Corte",
  barba: "Barba",
  "corte-barba": "Corte + barba"
};

export const services: Service[] = [
  {
    id: "corte-caballero",
    name: "Corte de Caballero",
    category: "corte",
    durationMinutes: 40,
    price: 16,
    description: "Incluye pre-lavado",
    recommendedProductCategories: ["shampoos", "polvos", "ceras"]
  },
  {
    id: "corte-nino",
    name: "Corte Niño (-8 años)",
    category: "corte",
    durationMinutes: 40,
    price: 15,
    recommendedProductCategories: ["shampoos", "peines", "ceras"]
  },
  {
    id: "rasurado-cabeza",
    name: "Rasurado de Cabeza",
    category: "corte",
    durationMinutes: 30,
    price: 13,
    recommendedProductCategories: ["shampoos", "geles", "ceras"]
  },
  {
    id: "perfilado-barba",
    name: "Solo Perfilado de Barba",
    category: "barba",
    durationMinutes: 30,
    price: 13,
    recommendedProductCategories: ["barba", "peines", "barba"]
  },
  {
    id: "arreglo-barba",
    name: "Arreglo de Barba",
    category: "barba",
    durationMinutes: 40,
    price: 15,
    recommendedProductCategories: ["barba", "barba", "peines"]
  },
  {
    id: "corte-perfilado-barba",
    name: "Corte Caballero + Solo Perfilado de Barba",
    category: "corte-barba",
    durationMinutes: 40,
    price: 19.5,
    recommendedProductCategories: ["shampoos", "ceras", "barba"]
  },
  {
    id: "corte-barba-completa",
    name: "Corte Caballero + Arreglo de Barba Completa",
    category: "corte-barba",
    durationMinutes: 60,
    price: 23,
    recommendedProductCategories: ["shampoos", "polvos", "barba"]
  },
  {
    id: "rasurado-barba",
    name: "Rasurado de Cabeza + Barba",
    category: "corte-barba",
    durationMinutes: 40,
    price: 19.5,
    recommendedProductCategories: ["geles", "barba", "barba"]
  }
];
