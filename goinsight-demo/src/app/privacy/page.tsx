import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | GoInsight",
  description:
    "Learn how GoInsight collects, uses, and protects your personal information. We are committed to safeguarding your data in compliance with Indian IT Act 2000.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
