"use client";

import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  sublabel?: string;
  options: Option[];
  error?: string;
}

export function SelectField({
  label,
  sublabel,
  options,
  error,
  className = "",
  ...props
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
          {label}
        </label>
        {sublabel && (
          <span className="text-[11px] text-slate-400 font-semibold">{sublabel}</span>
        )}
      </div>
      <select
        className={`px-4 py-3 bg-white border border-slate-200 text-sm rounded-2xl focus:ring-2 focus:ring-[#2D6FBA] focus:border-[#2D6FBA] focus:outline-none text-slate-800 shadow-sm transition-all cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs font-bold text-red-500">{error}</span>}
    </div>
  );
}
