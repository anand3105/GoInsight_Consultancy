import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import DisclaimerContent from "./DisclaimerContent";

export const metadata = createPageMetadata({
  title: "Disclaimer",
  description:
    "Important disclaimers regarding GoInsight's analytics consulting services, recommendations, and third-party tools. MSME registered enterprise.",
  keywords: [
    "GoInsight disclaimer",
    "analytics consulting disclaimer",
    "service disclaimer",
    "liability notice",
  ],
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <DisclaimerContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Disclaimer", url: "https://goinsight.in/disclaimer" },
        ])}
      />
    </>
  );
}
