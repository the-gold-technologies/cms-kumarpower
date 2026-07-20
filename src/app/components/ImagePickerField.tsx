"use client";

import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon, Link2, Check } from "lucide-react";

interface ImagePickerFieldProps {
  label: string;
  sublabel?: string;
  value: string;
  onChange: (val: string) => void;
}

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=800&auto=format&fit=crop",
];

export function ImagePickerField({
  label,
  sublabel,
  value,
  onChange,
}: ImagePickerFieldProps) {
  const [showPresets, setShowPresets] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
          {label}
        </label>
        {sublabel && (
          <span className="text-[11px] text-slate-400 font-semibold">{sublabel}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-slate-50 border border-slate-200 p-4 rounded-2xl">
        {/* Preview Thumbnail */}
        <div className="h-20 w-28 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Selected Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-400" />
          )}
        </div>

        <div className="flex-1 flex flex-col gap-2 w-full">
          <div className="relative">
            <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste image URL (https://...)"
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 text-xs rounded-xl focus:ring-2 focus:ring-[#2D6FBA] focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="text-xs font-bold text-[#2D6FBA] hover:underline flex items-center gap-1.5 self-start cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            {showPresets ? "Hide Gallery Presets" : "Select from Image Gallery"}
          </button>
        </div>
      </div>

      {showPresets && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-3 bg-white border border-slate-200 rounded-2xl mt-1">
          {PRESET_IMAGES.map((imgUrl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(imgUrl);
                setShowPresets(false);
              }}
              className={`h-16 rounded-xl overflow-hidden border-2 relative cursor-pointer group transition-all ${
                value === imgUrl ? "border-[#2D6FBA] ring-2 ring-[#2D6FBA]/30" : "border-slate-200 hover:border-slate-400"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgUrl} alt="preset" className="h-full w-full object-cover" />
              {value === imgUrl && (
                <div className="absolute inset-0 bg-[#2D6FBA]/40 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
