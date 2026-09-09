import { serviceCategoryLabels } from "@/data/services";
import type { Service, ServiceCategory } from "@/data/types";
import { ServiceCard } from "./ServiceCard";
import styles from "./ServiceGroup.module.css";

export function ServiceGroup({ category, services }: { category: ServiceCategory; services: Service[] }) {
  return (
    <section className={styles.group} aria-labelledby={`service-${category}`}>
      <h3 id={`service-${category}`}>{serviceCategoryLabels[category]}</h3>
      <div className={styles.list}>
        {services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
    </section>
  );
}
