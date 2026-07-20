"use client";

import React from "react";
import { ChevronDown, Plus } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SectionHeader({
  title,
  description,
  subtitle,
  isOpen,
  onToggle,
  action,
}: SectionHeaderProps) {
  const descText = description || subtitle || "";

  return (
    <header className="flex items-center justify-between border-b border-gray-100 pb-4">
      <div
        className="flex flex-col gap-1.5 cursor-pointer flex-1 group"
        onClick={onToggle}
      >
        <h2 className="text-[#0B0F29] text-lg font-bold group-hover:text-[#2D6FBA] transition-colors">
          {title}
        </h2>
        {descText && <p className="text-gray-400 text-xs font-medium">{descText}</p>}
      </div>
      {!action && (
        <ChevronDown
          onClick={onToggle}
          className={`text-gray-400 h-5 w-5 cursor-pointer transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#2D6FBA]" : ""
          }`}
        />
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="bg-[#0B0F29] text-white px-6 py-2.5 rounded-full font-semibold text-xs hover:bg-black transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {action.label}
        </button>
      )}
    </header>
  );
}
