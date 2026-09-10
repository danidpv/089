import { expect, test, type Page } from "@playwright/test";
import { siteConfig } from "../../src/data/site-config";

async function waitForIntro(page: Page) {
  await expect(page.getByTestId("intro")).toBeHidden({ timeout: 3500 });
}

test("home loads without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await waitForIntro(page);
  await expect(page.getByRole("heading", { name: "089 Barbería Profesional" })).toBeVisible();
  await expect(page.getByTestId("hero-address")).toBeVisible();
  expect(errors).toEqual([]);
});

test("official branding, intro, contact and footer are present", async ({ page }) => {
  await page.goto("/");

  const brand = page.getByRole("link", { name: /089 Barbería Profesional/i }).first();
  await expect(brand).toHaveAttribute("href", "/");
  await expect(page.getByTestId("intro-logo")).toBeVisible();
  await expect(page.getByTestId("intro")).not.toContainText(/0|08|089/);

  await waitForIntro(page);
  await expect(page.getByRole("heading", { name: "Horario" })).toBeVisible();
  await expect(page.getByText("Lunes - Viernes")).toBeVisible();
  await expect(page.getByText("09:00-13:00 / 16:00-20:00")).toBeVisible();
  await expect(page.getByTestId("open-status")).toBeVisible();

  const footerNav = page.getByRole("navigation", { name: "Navegación de pie" });
  await expect(footerNav.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
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
  await waitForIntro(page);
  await page.getByRole("link", { name: /Servicios Carta 089/i }).click();
  await expect(page).toHaveURL(/\/carta$/);
  await page.goto("/");
  await waitForIntro(page);
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
  await waitForIntro(page);
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
  await waitForIntro(page);
  const menuButton = page.getByRole("button", { name: "Abrir menú" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toHaveAttribute("aria-expanded", "false");
});

test("no horizontal overflow at 390px and desktop reserve button is compact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForIntro(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await waitForIntro(page);
  const reserveBox = await page.getByTestId("booksy-link").first().boundingBox();
  expect(reserveBox?.width).toBeLessThan(180);
  expect(reserveBox?.height).toBeLessThan(52);
});
