"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import EmailGateModal from "@/components/EmailGateModal";
import MobileDesktopPrompt from "@/components/MobileDesktopPrompt";
import DarkModePopup from "@/components/DarkModePopup";

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
      <MobileDesktopPrompt />
      <EmailGateModal onSubmit={handleEmailSubmit} />
      <DarkModePopup />
      {children}
    </ThemeProvider>
  );
}
