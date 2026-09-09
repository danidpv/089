import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/data/site-config";

test("home loads without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "089 Barbería Profesional" })).toBeVisible();
  await expect(page.getByText("Av. Europa, 8 · Montequinto").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("carta loads services and prices", async ({ page }) => {
  await page.goto("/carta");
  await expect(page.getByRole("heading", { name: "Carta 089." }).first()).toBeVisible();
  await expect(page.getByText("Corte de Caballero")).toBeVisible();
  await expect(page.getByText("19,50 €").first()).toBeVisible();
});

test("productos loads and filters by url", async ({ page }) => {
  await page.goto("/productos?categoria=ceras");
  await expect(page.getByRole("button", { name: "Ceras" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-active-category='ceras']")).toBeVisible();
});

test("home cards navigate to carta and productos", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Servicios Carta 089/i }).click();
  await expect(page).toHaveURL(/\/carta$/);
  await page.goto("/");
  await page.getByRole("link", { name: /089 Selection Productos/i }).click();
  await expect(page).toHaveURL(/\/productos$/);
});

test("service recommendation opens product category", async ({ page }) => {
  await page.goto("/carta");
  await page.getByRole("link", { name: "Ceras" }).first().click();
  await expect(page).toHaveURL(/\/productos\?categoria=ceras$/);
  await expect(page.getByRole("button", { name: "Ceras" })).toHaveAttribute("aria-pressed", "true");
});

test("navbar links and booksy target are correct", async ({ page }) => {
  await page.goto("/");
  if ((page.viewportSize()?.width ?? 1440) < 1060) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.getByRole("link", { name: "Productos", exact: true }).click();
  } else {
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Productos" }).click();
  }
  await expect(page).toHaveURL(/\/productos$/);
  const booksy = page.getByTestId("booksy-link").first();
  await expect(booksy).toHaveAttribute("href", siteConfig.bookingUrl);
  await expect(booksy).toHaveAttribute("target", "_blank");
});

test("mobile menu opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Abrir menú" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toHaveAttribute("aria-expanded", "false");
});

test("no horizontal overflow at 390px and desktop reserve button is compact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const reserveBox = await page.getByTestId("booksy-link").first().boundingBox();
  expect(reserveBox?.width).toBeLessThan(180);
  expect(reserveBox?.height).toBeLessThan(52);
});
