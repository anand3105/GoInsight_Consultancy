import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import TermsContent from "./TermsContent";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Read the terms and conditions governing the use of GoInsight's analytics consulting services, including intellectual property, confidentiality, and liability.",
  keywords: [
    "GoInsight terms of service",
    "analytics consulting terms",
    "service agreement",
    "consulting terms and conditions",
  ],
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <TermsContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Terms of Service", url: "https://goinsight.in/terms" },
        ])}
      />
    </>
  );
}
