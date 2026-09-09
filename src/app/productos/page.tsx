import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Productos profesionales",
  description:
    "Productos profesionales recomendados por 089 Barbería Profesional: styling, cuidado, barba y mantenimiento diario."
};

export default function ProductosPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/productos/ceras/product-shelf-01.jpg"
          alt=""
          fill
          sizes="100vw"
          fetchPriority="high"
          priority
        />
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <p className="kicker">Productos 089</p>
          <h1>Productos 089.</h1>
          <p>Styling, cuidado, barba y mantenimiento diario. Descubre la selección de 089 y filtra por lo que necesitas.</p>
          <Link href="/">← Volver a Inicio</Link>
        </div>
      </section>
      <section className={`${styles.products} section`} id="productos">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">089 Selection</p>
              <h2 className="display">Lo que usamos.<br />Lo que recomendamos.</h2>
            </div>
            <p className="lead">Colecciones editoriales preparadas para sustituir marcas, precios y ofertas cuando el catálogo real quede cerrado.</p>
          </div>
          <Suspense fallback={<p className={styles.loading}>Cargando productos 089.</p>}>
            <ProductExplorer />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
