import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Productos profesionales",
  description:
    "Catalogo real de productos fisicos de 089Wear: styling, champu, barba, afeitado y herramientas con compra en SumUp."
};

export default function ProductosPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/productos/cabello/pomada-deluxe.webp"
          alt=""
          fill
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
          priority
        />
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <p className="kicker">Productos 089</p>
          <h1>Productos 089.</h1>
          <p>Productos fisicos reales de 089Wear. Mira el catalogo y compra siempre fuera de esta web, directamente en SumUp.</p>
          <Link href="/">Volver a Inicio</Link>
        </div>
      </section>
      <section className={`${styles.products} section`} id="productos">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">Catalogo 089</p>
              <h2 className="display">Producto real.<br />Compra en 089Wear.</h2>
            </div>
            <p className="lead">Cards sencillas con foto, nombre, precio y disponibilidad actual. Cada producto abre su ficha real en 089Wear.</p>
          </div>
          <Suspense fallback={<p className={styles.loading}>Cargando productos 089.</p>}>
            <ProductExplorer />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
