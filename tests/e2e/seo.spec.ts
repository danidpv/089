import { expect, test } from "@playwright/test";

const origin = "https://www.089barberia.es";
const publicRoutes = ["/", "/servicios", "/marcas", "/barberia"];

test("sitemap and robots publish only the official indexable routes", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml", { maxRedirects: 0 });
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  const urls = Array.from((await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url);
  expect(urls).toEqual(publicRoutes.map((route) => origin + route));

  const robots = await request.get("/robots.txt", { maxRedirects: 0 });
  expect(robots.status()).toBe(200);
  expect((await robots.text()).trim().split(/\r?\n/).filter(Boolean)).toEqual([
    "User-Agent: *",
    "Allow: /",
    `Sitemap: ${origin}/sitemap.xml`
  ]);
});

test("public pages have official metadata and remain indexable", async ({ page }) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    expect(response?.request().redirectedFrom(), route).toBeNull();
    expect(response?.headers()["x-robots-tag"] ?? "", route).not.toMatch(/\b(?:noindex|none)\b/i);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    expect(new URL(await canonical.getAttribute("href") ?? "").href).toBe(origin + route);
    const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(new URL(openGraphUrl ?? "").href).toBe(origin + route);
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /^https:\/\/www\.089barberia\.es\//);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="twitter:image"]').first()).toHaveAttribute("content", /^https:\/\/www\.089barberia\.es\//);
    const robots = await page.locator('meta[name="robots"], meta[name="googlebot"]').evaluateAll(
      (tags) => tags.map((tag) => tag.getAttribute("content")).join(",")
    );
    expect(robots, route).not.toMatch(/\b(?:noindex|none)\b/i);

    const business = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "");
    expect(business["@type"]).toBe("HairSalon");
    expect(business.url).toBe(origin + "/");
    expect(business.image).toMatch(/^https:\/\/www\.089barberia\.es\//);
  }
});
