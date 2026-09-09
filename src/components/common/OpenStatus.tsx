"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site-config";
import styles from "./OpenStatus.module.css";

function madridDateParts(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: siteConfig.timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const parts = formatter.formatToParts(now);
  return {
    weekday: parts.find((part) => part.type === "weekday")?.value ?? "Monday",
    time: parts.find((part) => part.type === "hour")?.value + ":" + parts.find((part) => part.type === "minute")?.value
  };
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getStatus() {
  const { weekday, time } = madridDateParts();
  const day = siteConfig.openingHours.find((item) => item.schemaDay.toLowerCase() === weekday.toLowerCase());
  if (!day || day.slots.length === 0) return { open: false, label: "Cerrado ahora" };
  const current = toMinutes(time);
  const active = day.slots.some((slot) => current >= toMinutes(slot.opens) && current < toMinutes(slot.closes));
  return { open: active, label: active ? "Abierto ahora" : "Cerrado ahora" };
}

export function OpenStatus() {
  const [status, setStatus] = useState(() => ({ open: false, label: "Horario Europe/Madrid" }));

  useEffect(() => {
    const update = () => setStatus(getStatus());
    const starter = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 60_000);
    return () => {
      window.clearTimeout(starter);
      window.clearInterval(timer);
    };
  }, []);

  return <span className={`${styles.status} ${status.open ? styles.open : ""}`}>{status.label}</span>;
}
