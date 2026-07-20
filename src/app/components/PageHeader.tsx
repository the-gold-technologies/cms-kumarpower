"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-3xl font-bold text-[#0B0F29] leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-4">{action}</div>}
    </header>
  );
}
