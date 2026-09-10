import type { MetadataRoute } from "next";

const routes = ["/", "/carta", "/productos", "/barberia"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://089barberia-profesional.vercel.app${route}`,
    lastModified: new Date("2026-09-09")
  }));
}
