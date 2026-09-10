"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { normalizeCategory, productCategoryLabels, products } from "@/data/products";
import type { ProductCategory } from "@/data/types";
import { ProductCard } from "./ProductCard";
import styles from "./ProductExplorer.module.css";

const filters: Array<["todo" | ProductCategory, string]> = [
  ["todo", "Todo"],
  ...(Object.entries(productCategoryLabels) as Array<[ProductCategory, string]>)
];

export function ProductExplorer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const catalogRef = useRef<HTMLDivElement>(null);
  const activeCategory = normalizeCategory(searchParams.get("categoria"));

  useEffect(() => {
    if (activeCategory !== "todo") {
      catalogRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [activeCategory]);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => activeCategory === "todo" || product.category === activeCategory);
  }, [activeCategory]);

  const soldOutCount = visibleProducts.filter((product) => product.availability === "sold-out").length;

  const setFilter = (category: "todo" | ProductCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "todo") params.delete("categoria");
    else params.set("categoria", category);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className={styles.explorer} ref={catalogRef} data-active-category={activeCategory}>
      <div className={styles.filters} role="group" aria-label="Filtrar productos">
        {filters.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={activeCategory === value ? styles.active : ""}
            aria-pressed={activeCategory === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {activeCategory !== "todo" ? (
        <p className={styles.notice}>Mostrando categoria: {productCategoryLabels[activeCategory]}</p>
      ) : null}
      <section className={styles.block} data-testid="catalogo-089wear">
        <div className={styles.blockHead}>
          <span>{visibleProducts.length}</span>
          <div>
            <h3>Catalogo 089.</h3>
            <p>
              Productos fisicos reales publicados hoy en 089Wear. La compra continua siempre en SumUp
              {soldOutCount > 0 ? ` - ${soldOutCount} agotado${soldOutCount === 1 ? "" : "s"}` : ""}.
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
