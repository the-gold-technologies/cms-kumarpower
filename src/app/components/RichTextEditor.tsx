"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
  HelpCircle,
} from "lucide-react";

interface RichTextEditorProps {
  label?: string;
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  tooltip?: string;
  containerClassName?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label = "Article Content",
  value = "",
  onChange,
  placeholder = "Start writing your blog article content here...",
  tooltip,
  containerClassName = "",
  minHeight = "280px",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      onChange?.(html);
    }
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleAddLink = () => {
    const url = prompt("Enter link URL (e.g. https://www.kumarpower.com):");
    if (url) {
      execCmd("createLink", url);
    }
  };

  return (
    <div className={`flex flex-col gap-2 px-0.5 ${containerClassName}`}>
      {label && (
        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          {label}
          {tooltip && (
            <div className="group relative flex items-center">
              <HelpCircle className="w-3.5 h-3.5 cursor-help text-gray-300 hover:text-[#2D6FBA] transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[280px] px-4 py-3 bg-white text-gray-900 text-[11px] font-medium rounded-2xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 text-center">
                {tooltip}
              </div>
            </div>
          )}
        </label>
      )}

      {/* Toolbar & Content Wrapper */}
      <div
        className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
          isFocused
            ? "border-[#2D6FBA] ring-2 ring-[#2D6FBA]/30 bg-white"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        {/* Rich Text Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200/80 select-none">
          <button
            type="button"
            onClick={() => execCmd("bold")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("italic")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("underline")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<h2>")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Heading 2"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<h3>")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Heading 3"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<p>")}
            className="px-2 py-1 text-xs font-bold text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Normal Paragraph"
          >
            Paragraph
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          <button
            type="button"
            onClick={() => execCmd("insertUnorderedList")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("insertOrderedList")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<blockquote>")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Quote Block"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<pre>")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          <button
            type="button"
            onClick={handleAddLink}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("unlink")}
            className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
            title="Remove Link"
          >
            <Unlink className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          <button
            type="button"
            onClick={() => execCmd("undo")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("redo")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Editable Rich Content Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ minHeight }}
          className="p-5 text-sm text-slate-800 outline-none prose prose-slate max-w-none focus:outline-none overflow-y-auto"
          data-placeholder={placeholder}
        />
      </div>
    </div>
  );
};
