import { MapPin, Phone, Route, MessageCircle } from "lucide-react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { OpenStatus } from "@/components/common/OpenStatus";
import { siteConfig, whatsappUrl } from "@/data/site-config";
import styles from "./ContactSection.module.css";

const compactSchedule = [
  { label: "Lunes - Viernes", slots: siteConfig.openingHours[0].slots },
  { label: "Sábado", slots: siteConfig.openingHours[5].slots },
  { label: "Domingo", slots: siteConfig.openingHours[6].slots }
];

function formatSlots(slots: typeof siteConfig.openingHours[number]["slots"]) {
  if (slots.length === 0) return "Cerrado";
  return slots.map((slot) => `${slot.opens}-${slot.closes}`).join(" / ");
}

export function ContactSection() {
  return (
    <section className={styles.visit} id="visitanos">
      <div className={styles.inner}>
        <div>
          <p className="kicker">Contacto</p>
          <h2>Ven a<br />089.</h2>
          <OpenStatus />
        </div>
        <div className={styles.panel}>
          <address>
            <strong>{siteConfig.name}</strong>
            <span>{siteConfig.address.street}</span>
            <span>{siteConfig.address.postalCode} {siteConfig.address.locality}</span>
            <span>{siteConfig.address.city}</span>
            <span>{siteConfig.address.region}</span>
          </address>
          <a className={styles.phone} href={`tel:${siteConfig.phoneInternational}`}>
            <Phone aria-hidden="true" size={18} />
            {siteConfig.phoneDisplay}
          </a>
          <div className={styles.schedule} aria-label="Horario de apertura">
            <h3>Horario</h3>
            <dl>
              {compactSchedule.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{formatSlots(item.slots)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.actions}>
            <BooksyButton label="Reservar en Booksy" />
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Route aria-hidden="true" size={16} />
              Cómo llegar
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={16} />
              WhatsApp
            </a>
            <a href={`tel:${siteConfig.phoneInternational}`}>
              <Phone aria-hidden="true" size={16} />
              Llamar
            </a>
          </div>
        </div>
        <div className={styles.map} aria-label="Mapa de 089 Barbería Profesional">
          <MapPin aria-hidden="true" size={30} />
          <span>Av. Europa, 8 · Local 4A</span>
          <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>
        </div>
      </div>
    </section>
  );
}
