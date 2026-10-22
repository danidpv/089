import type { Review } from "./types";

export const reviewSummaries = {
  Google: {
    rating: "4,9",
    count: "107 reseñas",
    checkedAt: "22 de octubre de 2026"
  },
  Booksy: {
    rating: "5,0",
    count: "829 reseñas",
    checkedAt: "20 de octubre de 2026"
  }
} as const;

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
  },
  {
    id: "daniel-del-pino",
    quote: "Siendo sincero, una de las mejores peluquerías a las que he ido, por no decir la mejor, el trato es increíble, las instalaciones y lo mas importante la CALIDAD DEL PELADO es mas que buena.",
    author: "Daniel Del pino Velázquez",
    service: "Publicada hace un mes",
    source: "Google"
  },
  {
    id: "pedro-tornero",
    quote: "Fui a cortarme el pelo y salí muy satisfecho. Son muy amables y el trabajo que hacen con el corte es increíble. 100% recomendados.",
    author: "Pedro Tornero",
    service: "Publicada hace 3 meses",
    source: "Google"
  },
  {
    id: "r-google",
    quote: "GENIAL. Es desde ahora mi peluquería de confianza. Sistema de reservas bueno, gama de productos de cuidado de calidad y un servicio y corte perfecto. Te ven al detalle, pasan tiempo contigo y se paran a tratarte. Se agradece, y se recompensa. Aquí un cliente nuevo y fiel 💗",
    author: "R.",
    service: "Publicada hace 5 meses",
    source: "Google"
  }
];
