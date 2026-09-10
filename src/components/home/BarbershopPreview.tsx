import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { BarbershopVideo } from "@/components/home/BarbershopVideo";
import { barberiaVideo, homeBarberiaImage } from "@/data/barberia";
import styles from "./BarbershopPreview.module.css";

export function BarbershopPreview() {
  return (
    <section className="section" id="barberia">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="kicker">La barbería</p>
            <h2 className="display">Mira 089<br />por dentro.</h2>
          </div>
          <p className="lead">Una mirada directa al local, al ritmo de trabajo y a la identidad real de 089 antes de venir.</p>
        </div>
        <div className={styles.previewGrid}>
          <div className={styles.videoPanel}>
            <BarbershopVideo className={styles.video} src={barberiaVideo.src} poster={barberiaVideo.poster} />
            <span className={styles.videoLabel}>
              <Play aria-hidden="true" size={16} />
              {barberiaVideo.label}
            </span>
          </div>
          <Link className={styles.photoLink} href="/barberia">
            <Image
              src={homeBarberiaImage.src}
              alt={homeBarberiaImage.alt}
              fill
              sizes="(max-width: 860px) 100vw, 42vw"
            />
            <span>{homeBarberiaImage.label}</span>
            <strong>
              Ver la barberia
              <ArrowRight aria-hidden="true" size={18} />
            </strong>
          </Link>
        </div>
      </div>
    </section>
  );
}
