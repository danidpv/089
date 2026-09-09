import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import styles from "./BooksyButton.module.css";

type BooksyButtonProps = {
  label?: string;
  compact?: boolean;
  className?: string;
};

export function BooksyButton({ label = "Reservar", compact = false, className = "" }: BooksyButtonProps) {
  return (
    <a
      className={`${styles.button} ${compact ? styles.compact : ""} ${className}`}
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="booksy-link"
    >
      <span>{label}</span>
      <ExternalLink aria-hidden="true" size={compact ? 13 : 15} strokeWidth={2.5} />
    </a>
  );
}
