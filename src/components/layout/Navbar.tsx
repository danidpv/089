"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { BooksyButton } from "@/components/common/BooksyButton";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/data/site-config";
import styles from "./Navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || (href.startsWith("/#") && pathname === "/");
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (href: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (href === "/") {
      handleHomeClick(event);
      return;
    }
    setOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${scrolled || open ? styles.scrolled : ""}`}>
      <Link className={styles.brand} href="/" onClick={handleHomeClick}>
        <b>089</b>
        <span>Barbería Profesional</span>
      </Link>
      <SocialLinks compact />
      <nav className={styles.links} aria-label="Navegación principal">
        {siteConfig.navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? styles.active : ""}
            onClick={(event) => handleNavClick(item.href, event)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <BooksyButton label="Reservar" compact className={styles.navBooksy} />
      <button
        className={styles.menuButton}
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <div className={`${styles.mobileMenu} ${open ? styles.open : ""}`} id={menuId}>
        {siteConfig.navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={(event) => handleNavClick(item.href, event)}>
            {item.label}
          </Link>
        ))}
        <div className={styles.mobileSocials}>
          <SocialLinks />
        </div>
        <BooksyButton label="Reservar en Booksy" />
      </div>
    </header>
  );
}
