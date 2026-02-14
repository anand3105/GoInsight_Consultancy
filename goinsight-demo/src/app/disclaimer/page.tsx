import type { Metadata } from "next";
import DisclaimerContent from "./DisclaimerContent";

export const metadata: Metadata = {
  title: "Disclaimer | GoInsight",
  description:
    "Important disclaimers regarding GoInsight's analytics consulting services, recommendations, and third-party tools. MSME registered enterprise.",
};

export default function DisclaimerPage() {
  return <DisclaimerContent />;
}
