import type { OpeningDay } from "./types";

export const openingHours: OpeningDay[] = [
  { day: "Lunes", schemaDay: "Monday", slots: [{ opens: "09:00", closes: "13:00" }, { opens: "16:00", closes: "20:00" }] },
  { day: "Martes", schemaDay: "Tuesday", slots: [{ opens: "09:00", closes: "13:00" }, { opens: "16:00", closes: "20:00" }] },
  { day: "Miércoles", schemaDay: "Wednesday", slots: [{ opens: "09:00", closes: "13:00" }, { opens: "16:00", closes: "20:00" }] },
  { day: "Jueves", schemaDay: "Thursday", slots: [{ opens: "09:00", closes: "13:00" }, { opens: "16:00", closes: "20:00" }] },
  { day: "Viernes", schemaDay: "Friday", slots: [{ opens: "09:00", closes: "13:00" }, { opens: "16:00", closes: "20:00" }] },
  { day: "Sábado", schemaDay: "Saturday", slots: [{ opens: "10:00", closes: "14:00" }] },
  { day: "Domingo", schemaDay: "Sunday", slots: [] }
];

export const siteConfig = {
  name: "089 Barbería Profesional",
  shortName: "089",
  locationLine: "Montequinto · Dos Hermanas",
  addressShort: "Av. Europa, 8 · Montequinto",
  address: {
    street: "Av. Europa, 8, local 4A",
    postalCode: "41089",
    locality: "Montequinto",
    city: "Dos Hermanas",
    region: "Sevilla",
    country: "ES"
  },
  phoneDisplay: "686 65 05 03",
  phoneInternational: "+34686650503",
  email: null as string | null,
  instagramUrl: null as string | null,
  tiktokUrl: null as string | null,
  bookingUrl: "https://booksy.com/es-es/14522_089-barberia-profesional_barberia_29946_dos-hermanas",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.%20Europa%208%20local%204A%2041089%20Montequinto%20Dos%20Hermanas%20Sevilla",
  timezone: "Europe/Madrid",
  openingHours,
  navItems: [
    { label: "Inicio", href: "/" },
    { label: "Carta", href: "/carta" },
    { label: "Productos", href: "/productos" },
    { label: "La barbería", href: "/#barberia" },
    { label: "Contacto", href: "/#visitanos" },
    { label: "Reseñas", href: "/#opiniones" }
  ]
};

export const whatsappUrl = `https://wa.me/${siteConfig.phoneInternational.replace("+", "")}`;
