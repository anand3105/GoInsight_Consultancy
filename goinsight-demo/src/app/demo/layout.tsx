"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import EmailGateModal from "@/components/EmailGateModal";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleEmailSubmit = (email: string) => {
    console.log("Professional email submitted:", email);
    // You can add additional logic here, like sending to an API
  };

  return (
    <ThemeProvider>
      <EmailGateModal onSubmit={handleEmailSubmit} />
      {children}
    </ThemeProvider>
  );
}
