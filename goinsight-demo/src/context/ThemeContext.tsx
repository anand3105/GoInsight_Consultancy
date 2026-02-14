"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("dashboard-theme") as Theme;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// ApexCharts theme configuration
export const getApexChartTheme = (isDark: boolean) => ({
  theme: {
    mode: isDark ? "dark" : "light" as "dark" | "light",
    palette: "palette1",
  },
  chart: {
    background: "transparent",
    foreColor: isDark ? "#E5E7EB" : "#374151",
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  grid: {
    borderColor: isDark ? "#374151" : "#E5E7EB",
    strokeDashArray: 3,
  },
  xaxis: {
    labels: {
      style: {
        colors: isDark ? "#9CA3AF" : "#6B7280",
      },
    },
    axisBorder: {
      color: isDark ? "#374151" : "#E5E7EB",
    },
    axisTicks: {
      color: isDark ? "#374151" : "#E5E7EB",
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: isDark ? "#9CA3AF" : "#6B7280",
      },
    },
  },
  tooltip: {
    theme: isDark ? "dark" : "light",
  },
  legend: {
    labels: {
      colors: isDark ? "#E5E7EB" : "#374151",
    },
  },
});

// Color palettes
export const chartColors = {
  primary: "#0B1F3A",
  yellow: "#ecc41a",
  green: "#22c55e",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  orange: "#f97316",
  cyan: "#06b6d4",
  pink: "#ec4899",
  teal: "#14b8a6",
};

export const chartColorArray = [
  "#ecc41a",
  "#3b82f6",
  "#22c55e",
  "#8b5cf6",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#14b8a6",
];
