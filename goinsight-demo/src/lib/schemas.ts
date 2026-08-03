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
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "Country",
        name: "Saudi Arabia",
      },
      {
        "@type": "Country",
        name: "Australia",
      },
      {
        "@type": "Country",
        name: "Qatar",
      },
      {
        "@type": "Country",
        name: "Bahrain",
      },
      {
        "@type": "Country",
        name: "Kuwait",
      },
      {
        "@type": "Country",
        name: "Oman",
      },
      {
        "@type": "Place",
        name: "Middle East",
      },
      {
        "@type": "Place",
        name: "MENA Region",
      },
    ],
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

export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  imageUrl,
  keywords,
  section,
  readTime,
  about = [],
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    jobTitle?: string;
    knowsAbout?: string[];
    url?: string;
  };
  imageUrl: string;
  keywords: string[];
  section?: string;
  /** Reading time in minutes — emitted as ISO-8601 `timeRequired`. */
  readTime?: number;
  /** Key topics/entities the article covers — for AI/answer-engine grounding. */
  about?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    inLanguage: "en",
    isAccessibleForFree: true,
    ...(section ? { articleSection: section } : {}),
    ...(readTime ? { timeRequired: `PT${readTime}M`, wordCount: readTime * 200 } : {}),
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
      ...(author.knowsAbout && author.knowsAbout.length
        ? { knowsAbout: author.knowsAbout }
        : {}),
      url: author.url || siteConfig.url,
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/Go-Insight-Color_ICON.png`,
      },
    },
    image: imageUrl,
    keywords: keywords.join(", "),
    ...(about.length
      ? { about: about.map((name) => ({ "@type": "Thing", name })) }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".blog-faq"],
    },
  };
}

export function blogSchema(
  posts: {
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
    updatedAt: string;
    authorName: string;
  }[]
) {
  const url = `${siteConfig.url}/blog`;
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description:
      "Expert insights on data analytics, Power BI, Tableau, AI/ML, and dashboard design.",
    url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Person", name: post.authorName },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Place", name: "Middle East" },
    ],
  };
}
