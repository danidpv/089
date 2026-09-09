# 089 Barbería Profesional

Aplicación web de producción para 089 Barbería Profesional, construida desde los tres HTML de mockup v6.1 conservados en `docs/reference/mockups`.

## Stack

- Next.js App Router
- React + TypeScript
- Server Components por defecto
- CSS Modules + `src/app/globals.css` para tokens globales
- `next/image` para imágenes locales
- `next/font` para Inter y Oswald
- Lucide React para iconos genéricos
- Playwright para E2E mínimo

## Desarrollo

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run test:e2e
```

Rutas:

- `/`
- `/carta`
- `/productos`

## Configuración

Todo lo editable de negocio vive en `src/data`:

- Booksy, teléfono, WhatsApp, dirección, horarios, redes y email: `src/data/site-config.ts`
- Servicios y precios: `src/data/services.ts`
- Productos, categorías y colecciones: `src/data/products.ts`
- Reseñas provisionales: `src/data/reviews.ts`

Las URLs de Instagram, TikTok y email están como `null` hasta tener referencias definitivas. Los horarios están centralizados y deben verificarse antes de producción.

## Assets pendientes

Mapa esperado:

```text
public/images/
├── branding/
│   ├── logo-089-transparent.png
│   └── window-logo.jpg
├── home/
│   └── hero.jpg
├── barberia/
│   ├── interior-01.jpg
│   ├── interior-02.jpg
│   ├── interior-03.jpg
│   └── recepcion.jpg
└── productos/
    ├── ceras/
    ├── polvos/
    ├── shampoos/
    ├── barba/
    ├── peines/
    └── geles/
```

Las imágenes actuales se extrajeron de los HTML de referencia. Cuando haya fotografías definitivas, pueden sustituirse manteniendo nombres/rutas o cambiando una única referencia en `src/data/products.ts` y componentes de home.

## Arquitectura

Las páginas son Server Components. Solo usan `"use client"` las piezas que lo necesitan:

- `Intro089`
- `Hero089`
- `Navbar`
- `Lightbox`
- `OpenStatus`
- `ProductExplorer`

El parallax del hero usa `pointermove`, refs y `requestAnimationFrame`; no usa estado React por frame. Los filtros de productos se sincronizan con `?categoria=` y funcionan si la URL se abre directamente.

## Deploy

La app está preparada para Vercel como proyecto Next.js estático/informativo. No usa backend, API routes, base de datos ni credenciales.
