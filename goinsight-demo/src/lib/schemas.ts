import { siteConfig } from "./seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/Go-Insight-Color_ICON.png`,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    foundingDate: siteConfig.foundingDate,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.facebook,
    ],
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/demo/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/Go-Insight-Color_ICON.png`,
    image: `${siteConfig.url}/og-image.png`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    priceRange: "$$",
    areaServed: "Worldwide",
    serviceType: [
      "Analytics Consulting",
      "Power BI Dashboard Development",
      "AI/ML Solutions",
      "Data Visualization",
      "Business Intelligence",
      "Data Warehousing",
    ],
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function softwareAppSchema({
  name,
  description,
  url,
  industry,
}: {
  name: string;
  description: string;
  url: string;
  industry: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    about: {
      "@type": "Thing",
      name: industry,
    },
  };
}
