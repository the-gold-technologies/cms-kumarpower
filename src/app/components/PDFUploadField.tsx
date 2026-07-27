"use client";

import React, { useRef, useState } from "react";
import { FileText, Upload, X, ExternalLink, HelpCircle } from "lucide-react";

interface PDFUploadFieldProps {
  label?: string;
  value?: string | File;
  onChange?: (url: string | File) => void;
  tooltip?: string;
  containerClassName?: string;
}

export const PDFUploadField: React.FC<PDFUploadFieldProps> = ({
  label,
  value = "",
  onChange,
  tooltip,
  containerClassName = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFile = (file: File) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    setFileName(file.name);
    // Pass the File object directly instead of a data URL
    // @ts-ignore
    onChange?.(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    onChange?.("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const isDataUrl = typeof value === "string" && value?.startsWith("data:application/pdf");
  const displayName = fileName || (typeof value === "string" && !isDataUrl ? value.split("/").pop() : (value instanceof File ? value.name : ""));

  return (
    <div className={`flex flex-col gap-2.5 px-0.5 ${containerClassName}`}>
      {label && (
        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          {label}
          {tooltip && (
            <div className="group relative flex items-center">
              <HelpCircle className="w-3.5 h-3.5 cursor-help text-gray-300 hover:text-[#2D6FBA] transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[260px] px-4 py-3 bg-white text-gray-900 text-[11px] font-medium rounded-2xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 text-center">
                {tooltip}
              </div>
            </div>
          )}
        </label>
      )}

      {/* Uploaded state */}
      {value ? (
        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-[#2D6FBA]/30 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#2D6FBA]/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#2D6FBA]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 truncate">
              {displayName || "Brochure PDF"}
            </p>
            <p className="text-[11px] text-slate-400">PDF uploaded</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!isDataUrl && (
              <a
                href={typeof value === "string" ? value : URL.createObjectURL(value as Blob)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#2D6FBA]/10 text-[#2D6FBA] transition"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 px-6 py-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            isDragging
              ? "border-[#2D6FBA] bg-blue-50"
              : "border-gray-200 hover:border-[#2D6FBA]/50 hover:bg-slate-50"
          }`}
        >
          {isUploading ? (
            <div className="flex items-center gap-2 text-[#2D6FBA]">
              <div className="w-4 h-4 border-2 border-[#2D6FBA] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold">Uploading...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Upload className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 text-center">
                <span className="text-[#2D6FBA] font-semibold hover:underline">Click to upload</span>{" "}
                or drag & drop PDF
              </p>
              <p className="text-[10px] text-slate-400">PDF files only</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
};
