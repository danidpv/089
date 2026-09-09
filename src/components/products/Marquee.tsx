import styles from "./Marquee.module.css";

export function Marquee({ items }: { items: string[] }) {
  const repeated = Array.from({ length: 2 }, () => items).flat();

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
