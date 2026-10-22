# 089 Barbería Profesional

Web informativa de 089 Barbería Profesional, construida con Next.js, React y TypeScript.

## Puesta en marcha

Requisitos: Node.js 20.9 o posterior y npm.

```bash
npm ci
npm run dev
```

Comprobaciones disponibles:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

En este entorno de Windows con Node 24 y npm 11, `cmd.exe` no pudo lanzar el `postinstall` de `unrs-resolver` ni los binarios de los scripts del proyecto. El mismo proceso termina correctamente usando PowerShell como shell de scripts. Si aparece `El sistema no puede encontrar la ruta especificada`, usa:

```bash
npm ci --script-shell=powershell.exe
npm run lint --script-shell=powershell.exe
npm run typecheck --script-shell=powershell.exe
npm run build --script-shell=powershell.exe
node node_modules/@playwright/test/cli.js test
```

## Rutas públicas

- `/`: portada, reseñas y contacto.
- `/servicios`: carta de servicios y precios.
- `/marcas`: marcas profesionales utilizadas en la barbería.
- `/barberia`: espacio, equipo y galería.

Las rutas antiguas `/carta` y `/productos` mantienen redirecciones permanentes a `/servicios` y `/marcas`.

## Configuración

Los datos editables del negocio viven en `src/data`:

- Datos de contacto, Booksy, dirección, horarios y redes: `site-config.ts`.
- Servicios y precios: `services.ts`.
- Marcas: `brands.ts`.
- Reseñas acreditadas y resúmenes de plataformas: `reviews.ts`.

Los logotipos proporcionados por el negocio se guardan en `public/images/brands`. La sección de reseñas combina testimonios acreditados de Booksy y Google; el resumen visible de Google corresponde a la captura facilitada el 22 de octubre de 2026.

Instagram, TikTok y el correo oficial están configurados. El enlace directo para reseñar en Google permanece en `null` hasta disponer de una URL oficial confirmada; la interfaz no publica esa acción mientras falte.

## Contenido archivado

`src/data/products.ts`, las imágenes de producto y `docs/089wear-catalog-sync.md` se conservan como una captura histórica para una futura integración. No alimentan ninguna ruta pública y sus precios o existencias no deben considerarse actuales.

El vídeo actual de la portada pesa aproximadamente 6 MB y dura 47 segundos. Se carga solo cuando el bloque se aproxima a la ventana, no se reproduce en bucle y sirve como recurso provisional hasta recibir un vídeo definitivo del negocio.

## Arquitectura y despliegue

Las páginas usan Server Components por defecto. Los componentes cliente se reservan para la navegación móvil, movimiento del hero, carruseles, vídeo y estado de apertura. Las imágenes locales se sirven con `next/image`; la galería ampliada usa el elemento nativo `dialog`.

La aplicación está preparada para desplegarse como un proyecto Next.js informativo. No contiene backend, rutas API, base de datos ni credenciales.

## Estado de seguridad de dependencias

La revisión del 21 de octubre de 2026 actualizó Next.js y `eslint-config-next` a 16.4.2. `npm audit --omit=dev` no detecta vulnerabilidades en dependencias de producción. La auditoría completa mantiene cinco avisos altos agrupados en `braces@3.0.3`, dependencia transitiva de las herramientas de ESLint; esa es la versión más reciente publicada y npm solo propone una regresión incompatible a `eslint-config-next@14.2.35`. El riesgo queda limitado al análisis local de patrones durante desarrollo y debe revisarse cuando su cadena publique una corrección compatible.
