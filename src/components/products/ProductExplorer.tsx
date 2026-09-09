"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { normalizeCategory, productCategoryLabels, productCollections, products } from "@/data/products";
import type { ProductCategory } from "@/data/types";
import { Marquee } from "./Marquee";
import { ProductCard } from "./ProductCard";
import styles from "./ProductExplorer.module.css";

const filters: Array<["todo" | ProductCategory, string]> = [
  ["todo", "Todo"],
  ["ceras", "Ceras"],
  ["polvos", "Polvos"],
  ["shampoos", "Shampoos"],
  ["barba", "Barba"],
  ["peines", "Peines"],
  ["geles", "Geles"]
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

  const visibleByCollection = useMemo(() => {
    return productCollections.map((collection) => {
      const collectionProducts = collection.productIds
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is NonNullable<typeof product> => Boolean(product))
        .filter((product) => {
          const categories = new Set([product.category, ...(product.categories ?? [])]);
          return activeCategory === "todo" || categories.has(activeCategory);
        });
      return { ...collection, products: collectionProducts };
    });
  }, [activeCategory]);

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
        <p className={styles.notice}>Mostrando categoría: {productCategoryLabels[activeCategory]}</p>
      ) : null}
      {visibleByCollection.map((collection) =>
        collection.products.length > 0 ? (
          <section className={styles.block} key={collection.id} data-testid={`collection-${collection.id}`}>
            <div className={styles.blockHead}>
              <span>{collection.number}</span>
              <div>
                <h3>{collection.title}</h3>
                <p>{collection.copy}</p>
              </div>
            </div>
            <div className={styles.grid}>
              {collection.products.map((product) => (
                <ProductCard product={product} key={`${collection.id}-${product.id}`} />
              ))}
            </div>
            <Marquee items={collection.marquee} />
          </section>
        ) : null
      )}
    </div>
  );
}
