"use client";

import { Lightbulb } from "lucide-react";

interface BlogProTipProps {
  title?: string;
  children: React.ReactNode;
}

export default function BlogProTip({ title = "Pro Tip", children }: BlogProTipProps) {
  return (
    <div className="my-6 rounded-xl border border-brand-yellow/20 bg-brand-yellow/5 p-5">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-yellow/20 flex items-center justify-center mt-0.5">
          <Lightbulb className="w-4 h-4 text-brand-yellow" />
        </span>
        <div>
          <p className="text-sm font-bold text-brand-dark mb-1">{title}</p>
          <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
