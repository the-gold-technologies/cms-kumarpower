"use client";

import React from "react";
import { Save, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSaving?: boolean;
  saved?: boolean;
  label?: string;
}

export function SaveButton({
  isSaving = false,
  saved = false,
  label = "Save Changes",
  className = "",
  disabled,
  ...props
}: SaveButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isSaving}
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-black tracking-wide uppercase transition-all duration-200 shadow-md cursor-pointer active:scale-95 disabled:opacity-70",
        saved
          ? "bg-emerald-600 text-white shadow-emerald-600/30"
          : "bg-[#2D6FBA] text-white hover:bg-blue-600 shadow-[#2D6FBA]/30",
        className
      )}
      {...props}
    >
      {isSaving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>Saving...</span>
        </>
      ) : saved ? (
        <>
          <Check className="w-4 h-4 text-white" />
          <span>Saved!</span>
        </>
      ) : (
        <>
          <Save className="w-4 h-4 text-white" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
