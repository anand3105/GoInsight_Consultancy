"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import EmailGateModal from "@/components/EmailGateModal";

export default function DemoLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleEmailSubmit = (email: string) => {
    console.log("Professional email submitted:", email);
  };

  return (
    <ThemeProvider>
      <EmailGateModal onSubmit={handleEmailSubmit} />
      {children}
    </ThemeProvider>
  );
}
