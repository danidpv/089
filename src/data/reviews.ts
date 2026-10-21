import type { Review } from "./types";

export const reviewSummary = {
  rating: "5.0",
  count: "829 reseñas",
  source: "Booksy",
  verifiedAt: "20 de octubre de 2026"
};

export const reviews: Review[] = [
  {
    id: "juanan",
    quote: "Primera vez y me han cortado y arreglado la barba exactamente como quería. No es fácil acertar a la primera.",
    author: "Juanan",
    service: "Corte y arreglo de barba",
    source: "Booksy"
  },
  {
    id: "jonatan",
    quote: "Como siempre, todo bien. Juande, además de ser un gran peluquero, es una gran persona.",
    author: "Jonatan",
    service: "Corte de caballero",
    source: "Booksy"
  },
  {
    id: "alejandro",
    quote: "Experiencia magnífica, excelente trato y el corte perfecto.",
    author: "Alejandro",
    service: "Corte de caballero",
    source: "Booksy"
  }
];
