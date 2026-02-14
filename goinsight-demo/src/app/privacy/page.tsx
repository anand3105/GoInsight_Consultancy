import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import PrivacyContent from "./PrivacyContent";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how GoInsight collects, uses, and protects your personal information. We are committed to safeguarding your data in compliance with Indian IT Act 2000.",
  keywords: [
    "GoInsight privacy policy",
    "data protection",
    "analytics data privacy",
    "GDPR compliance",
  ],
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PrivacyContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Privacy Policy", url: "https://goinsight.in/privacy" },
        ])}
      />
    </>
  );
}
