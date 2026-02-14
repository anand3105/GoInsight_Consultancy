import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | GoInsight",
  description:
    "Read the terms and conditions governing the use of GoInsight's analytics consulting services, including intellectual property, confidentiality, and liability.",
};

export default function TermsPage() {
  return <TermsContent />;
}
