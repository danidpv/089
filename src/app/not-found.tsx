import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <p className="kicker">089 Barbería Profesional</p>
      <h1 className="display">404.</h1>
      <p>La página que buscas no está disponible.</p>
      <Link href="/">Volver a inicio</Link>
    </main>
  );
}
