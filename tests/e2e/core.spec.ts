import { expect, test, type Page } from "@playwright/test";
import { siteConfig } from "../../src/data/site-config";
import { normalizeCategory } from "../../src/data/products";

async function waitForIntro(page: Page) {
  await expect(page.getByTestId("intro")).toBeHidden({ timeout: 3_500 });
}

test("home loads with the real business heading and without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await waitForIntro(page);
  await expect(page.getByRole("heading", { level: 1, name: "089 · Barbería profesional en Montequinto" })).toBeVisible();
  await expect(page.getByTestId("hero-address")).toHaveText("Av. Europa, 8 · Montequinto");
  expect(errors).toEqual([]);
});

test("services lists the real prices and the legacy route redirects", async ({ page }) => {
  await page.goto("/carta");
  await expect(page).toHaveURL(/\/servicios$/);
  await expect(page.getByRole("heading", { level: 1, name: "Servicios de barbería 089" })).toBeVisible();
  await expect(page.getByText("Corte de Caballero", { exact: true })).toBeVisible();
  await expect(page.getByText("19,50 €").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Reservar Corte de Caballero/i })).toHaveCount(0);
  await expect(page.locator('a[href*="categoria="]')).toHaveCount(0);
});

test("brands replaces the public product catalogue", async ({ page }) => {
  await page.goto("/productos?categoria=__proto__");
  await expect(page).toHaveURL(/\/marcas$/);
  await expect(page.getByRole("heading", { level: 1, name: "Descubre nuestras marcas" })).toBeVisible();

  const grid = page.getByTestId("brand-grid");
  for (const brand of ["Uppercut Deluxe", "Suavecito", "Dick Johnson", "Dr. K"]) {
    await expect(grid.getByRole("heading", { name: brand })).toBeVisible();
  }

  await expect(page.getByText("Agotado")).toHaveCount(0);
  await expect(page.locator('button[aria-label="Filtrar productos"]')).toHaveCount(0);
});

test("home cards navigate to services and brands", async ({ page }) => {
  await page.goto("/");
  await waitForIntro(page);
  await page.getByRole("link", { name: /Servicios Servicios 089/i }).click();
  await expect(page).toHaveURL(/\/servicios$/);

  await page.goto("/");
  await waitForIntro(page);
  await page.getByRole("link", { name: /Selección profesional Marcas/i }).click();
  await expect(page).toHaveURL(/\/marcas$/);
});

test("navbar uses scoped navigation and the Booksy destination", async ({ page }) => {
  await page.goto("/");
  await waitForIntro(page);

  if ((page.viewportSize()?.width ?? 1_440) < 1_061) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.getByRole("navigation", { name: "Navegación móvil" }).getByRole("link", { name: "Marcas" }).click();
  } else {
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Marcas" }).click();
  }

  await expect(page).toHaveURL(/\/marcas$/);
  await expect(page.getByTestId("booksy-link").first()).toHaveAttribute("href", siteConfig.bookingUrl);
});

test("official social and email links use the supplied destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[aria-label="Instagram"]').first()).toHaveAttribute("href", siteConfig.instagramUrl);
  await expect(page.locator('a[aria-label="TikTok"]').first()).toHaveAttribute("href", siteConfig.tiktokUrl);
  await expect(page.locator(`a[href="mailto:${siteConfig.email}"]`).first()).toBeAttached();
});

test("mobile menu closes on Escape and resets at the desktop breakpoint", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForIntro(page);

  const menuButton = page.getByRole("button", { name: "Abrir menú" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await menuButton.click();
  await page.setViewportSize({ width: 1_440, height: 900 });
  await expect(page.locator("header button[aria-controls]")).toHaveAttribute("aria-expanded", "false");
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
});

test("barbershop dialog traps focus, supports keys and restores its opener", async ({ page }) => {
  await page.goto("/barberia");
  await expect(page.getByRole("heading", { level: 1, name: "El local de 089" })).toBeVisible();

  const opener = page.getByRole("button", { name: "Abrir foto: Interior" });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Shift+Tab");
  await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest("dialog")))).toBe(true);
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("img", { name: /Vista longitudinal/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("Google and Booksy reviews use independent keyboard-operable carousels", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await waitForIntro(page);
  const googleCarousel = page.getByTestId("reviews-carousel-google");
  const booksyCarousel = page.getByTestId("reviews-carousel-booksy");
  await googleCarousel.scrollIntoViewIfNeeded();
  await expect(googleCarousel.getByText("Reseña de Google")).toBeVisible();
  await expect(googleCarousel.getByText("1 de 1")).toBeVisible();
  await expect(booksyCarousel.getByText("Cliente verificado · Booksy").first()).toBeVisible();

  const rail = booksyCarousel.getByLabel("Reseñas de Booksy");
  await rail.focus();
  await page.keyboard.press("ArrowRight");
  await expect(booksyCarousel.getByText("2 de 3")).toBeVisible();

  if (siteConfig.googleReviewUrl) {
    await expect(page.getByRole("link", { name: /Déjanos tu reseña en Google/i })).toHaveAttribute("href", siteConfig.googleReviewUrl);
  } else {
    await expect(page.getByRole("link", { name: /Déjanos tu reseña en Google/i })).toHaveCount(0);
  }
});

test("reviews advance automatically and can be paused", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Autoplay behavior only needs one browser profile");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const carousel = page.getByTestId("reviews-carousel-booksy");
  await expect(carousel.getByText("1 de 3")).toBeVisible();
  await expect(carousel.getByText("2 de 3")).toBeVisible({ timeout: 7_000 });

  const pause = carousel.getByRole("button", { name: "Pausar carrusel de Booksy" });
  await pause.focus();
  await page.keyboard.press("Enter");
  await expect(carousel.getByRole("button", { name: "Reproducir carrusel de Booksy" })).toHaveAttribute("aria-pressed", "true");
});

test("product category validation rejects inherited and unknown properties", () => {
  expect(normalizeCategory("cabello")).toBe("cabello");
  expect(normalizeCategory("")).toBe("todo");
  expect(normalizeCategory("desconocida")).toBe("todo");
  expect(normalizeCategory("__proto__")).toBe("todo");
  expect(normalizeCategory("constructor")).toBe("todo");
});

test("the offscreen video is lazy and does not block the initial page load", async ({ page }) => {
  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("barberia-tour.mp4")) videoRequests.push(request.url());
  });

  await page.goto("/", { waitUntil: "load" });
  expect(videoRequests).toEqual([]);
  await page.getByText("Recorrido real de 089").scrollIntoViewIfNeeded();
  await expect.poll(() => videoRequests.length).toBeGreaterThan(0);
});

test("key routes have no horizontal overflow at required breakpoints", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Responsive matrix runs once in the desktop project");

  for (const width of [320, 375, 390, 768, 1_024, 1_440]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 900 });
    for (const route of ["/", "/servicios", "/marcas", "/barberia"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  }
});
