import { siteConfig } from "@/data/site-config";

export function hairSalonJsonLd() {
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
    url: "/",
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
