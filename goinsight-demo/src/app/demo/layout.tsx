import type { Metadata } from "next";
import DemoLayoutClient from "./DemoLayoutClient";

export const metadata: Metadata = {
  title: {
    template: "%s | GoInsight Interactive Demo",
    default: "Interactive Analytics Demos | GoInsight",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoLayoutClient>{children}</DemoLayoutClient>;
}
