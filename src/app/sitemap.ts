import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

const routes = ["/", "/servicios", "/marcas", "/barberia"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date("2026-10-20")
  }));
}
