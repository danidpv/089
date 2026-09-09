import { Instagram, Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import styles from "./SocialLinks.module.css";

function TikTokIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path
        d="M15.8 3c.34 2.1 1.55 3.61 3.7 4.03v3.1a7.05 7.05 0 0 1-3.64-1.08v5.88c0 3.35-2.25 5.57-5.35 5.57-2.84 0-5.01-1.91-5.01-4.55 0-2.9 2.22-4.73 5.38-4.73.35 0 .7.03 1.03.1V8.16h3.03v6.7c-.78-.48-1.55-.69-2.4-.69-1.33 0-2.15.67-2.15 1.71 0 .95.77 1.57 1.82 1.57 1.24 0 2.03-.83 2.03-2.34V3h1.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const items = [
    { label: "Instagram", href: siteConfig.instagramUrl, icon: <Instagram size={compact ? 15 : 17} /> },
    { label: "TikTok", href: siteConfig.tiktokUrl, icon: <TikTokIcon /> },
    { label: "Email", href: siteConfig.email ? `mailto:${siteConfig.email}` : null, icon: <Mail size={compact ? 15 : 17} /> }
  ];

  return (
    <div className={`${styles.socials} ${compact ? styles.compact : ""}`} aria-label="Redes sociales">
      {items.map((item) =>
        item.href ? (
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
            {item.icon}
          </a>
        ) : (
          <span key={item.label} role="img" aria-label={`${item.label} pendiente`} title={`${item.label} pendiente`}>
            {item.icon}
          </span>
        )
      )}
    </div>
  );
}
