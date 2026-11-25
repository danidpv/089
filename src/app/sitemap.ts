import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

const routes = ["/", "/servicios", "/marcas", "/barberia"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteConfig.siteUrl).href
  }));
}
