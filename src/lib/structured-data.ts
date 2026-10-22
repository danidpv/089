import { siteConfig } from "@/data/site-config";

export function hairSalonJsonLd() {
  const sameAs = [siteConfig.instagramUrl, siteConfig.tiktokUrl].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: siteConfig.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: `${siteConfig.address.locality}, ${siteConfig.address.city}`,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country
    },
    telephone: siteConfig.phoneInternational,
    email: siteConfig.email,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/images/barberia/interior-main-frontal.webp`,
    hasMap: siteConfig.mapsUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    priceRange: "13 € - 23 €",
    openingHoursSpecification: siteConfig.openingHours.flatMap((day) =>
      day.slots.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day.schemaDay,
        opens: slot.opens,
        closes: slot.closes
      }))
    )
  };
}
