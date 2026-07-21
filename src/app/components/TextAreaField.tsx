"use client";

import React, { useState, useRef } from "react";
import { HelpCircle, Link as LinkIcon, X, Upload, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
  tooltip?: string;
  allowJsonUpload?: boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  containerClassName = "",
  className = "",
  rows = 4,
  tooltip,
  allowJsonUpload = false,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const parsed = JSON.parse(text);
        const formatted = JSON.stringify(parsed, null, 2);

        const textarea = textareaRef.current;
        if (!textarea) return;

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          HTMLTextAreaElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(textarea, formatted);

        const changeEvent = new Event("input", { bubbles: true });
        textarea.dispatchEvent(changeEvent);

        toast.success("Valid Schema JSON-LD loaded successfully!");
      } catch (err) {
        console.error("Invalid JSON file:", err);
        toast.error("Invalid JSON format. Please upload valid JSON-LD schema.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleValidateJson = (e: React.MouseEvent) => {
    e.preventDefault();
    const textarea = textareaRef.current;
    if (!textarea || !textarea.value.trim()) {
      toast.error("Please enter Schema JSON markup to validate.");
      return;
    }
    try {
      const parsed = JSON.parse(textarea.value);
      const formatted = JSON.stringify(parsed, null, 2);

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(textarea, formatted);

      const changeEvent = new Event("input", { bubbles: true });
      textarea.dispatchEvent(changeEvent);

      toast.success("✅ Valid Schema JSON-LD structure!");
    } catch (err: any) {
      toast.error(`❌ Invalid Schema JSON: ${err.message}`);
    }
  };

  const textareaClass = `w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-1 focus:ring-[#2D6FBA] focus:border-[#2D6FBA] outline-none transition-all text-gray-800 ${className}`;

  const handleOpenLinkModal = (e: React.MouseEvent) => {
    e.preventDefault();
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    setLinkText(selectedText || "");
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const finalLinkText = linkText.trim() || "link";
    const finalLinkUrl = linkUrl.trim() || "#";

    const linkMarkdown = `[${finalLinkText}](${finalLinkUrl})`;
    const newValue = text.substring(0, start) + linkMarkdown + text.substring(end);

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value"
    )?.set;
    nativeInputValueSetter?.call(textarea, newValue);

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    setShowLinkModal(false);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + linkMarkdown.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName} px-0.5 relative`}>
      <div className="flex justify-between items-center w-full pr-4">
        {label && (
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-1.5 relative">
            {label}
            {tooltip && (
              <div className="group relative flex items-center">
                <HelpCircle className="w-3.5 h-3.5 cursor-help text-gray-300 hover:text-[#2D6FBA] transition-colors" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[280px] px-4 py-3 bg-white text-gray-900 text-[11px] font-medium rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 normal-case tracking-normal text-center leading-relaxed backdrop-blur-sm">
                  {tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white"></div>
                </div>
              </div>
            )}
          </label>
        )}
        
        <div className="flex items-center gap-3">
          {allowJsonUpload && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
                title="Upload Schema JSON file"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload JSON
              </button>
              <button
                type="button"
                onClick={handleValidateJson}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                title="Validate Schema JSON syntax"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Validate JSON
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleOpenLinkModal}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#2D6FBA] hover:text-[#1a5a9e] transition-colors cursor-pointer"
            title="Insert link formatting"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Add Link
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        rows={rows}
        className={textareaClass}
        {...props}
      />

      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#2D6FBA]" />
                Insert Hyperlink
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertLink} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Click here or Learn more"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6FBA] text-gray-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  URL / Target Link
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or /contact"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6FBA] text-gray-800"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2D6FBA] hover:bg-[#235896] transition-colors rounded-xl shadow-sm"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
