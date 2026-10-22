"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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

  // Active formatting state for highlighting toolbar buttons
  const [activeBlock, setActiveBlock] = useState<string>("p");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isUl, setIsUl] = useState(false);
  const [isOl, setIsOl] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [isCode, setIsCode] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const checkActiveFormats = useCallback(() => {
    try {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
      setIsUl(document.queryCommandState("insertUnorderedList"));
      setIsOl(document.queryCommandState("insertOrderedList"));

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node: Node | null = selection.getRangeAt(0).startContainer;
        let foundBlock = "p";
        while (node && node !== editorRef.current) {
          const name = node.nodeName.toLowerCase();
          if (
            ["h1", "h2", "h3", "h4", "p", "blockquote", "pre"].includes(name)
          ) {
            foundBlock = name;
            break;
          }
          node = node.parentNode;
        }
        setActiveBlock(foundBlock);
        setIsQuote(foundBlock === "blockquote");
        setIsCode(foundBlock === "pre");
        return;
      }
      setActiveBlock("p");
      setIsQuote(false);
      setIsCode(false);
    } catch {
      // ignore
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      onChange?.(html);
      checkActiveFormats();
    }
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    if (command === "formatBlock" && value) {
      const clean = value.replace(/[<>]/g, "").toLowerCase();
      // If clicking the currently active block tag (e.g. clicking H1 while on H1), toggle back to normal paragraph
      const targetTag = activeBlock === clean ? "p" : clean;
      const success = document.execCommand("formatBlock", false, targetTag);
      if (!success) {
        document.execCommand("formatBlock", false, `<${targetTag}>`);
      }
    } else {
      document.execCommand(command, false, value);
    }
    handleInput();
    checkActiveFormats();
  };

  const handleAddLink = () => {
    const url = prompt("Enter link URL (e.g. https://www.kumarpower.com):");
    if (url) {
      execCmd("createLink", url);
    }
  };

  const getBtnClass = (isActive: boolean) =>
    `p-2 rounded-xl transition cursor-pointer ${
      isActive
        ? "bg-[#2D6FBA] text-white shadow-xs"
        : "text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60"
    }`;

  const getParagraphClass = (isActive: boolean) =>
    `px-2.5 py-1 text-xs font-bold rounded-xl transition cursor-pointer ${
      isActive
        ? "bg-[#2D6FBA] text-white shadow-xs"
        : "text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60"
    }`;

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
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("bold")}
            className={getBtnClass(isBold)}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("italic")}
            className={getBtnClass(isItalic)}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("underline")}
            className={getBtnClass(isUnderline)}
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          {/* Heading 1 Button */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("formatBlock", "h1")}
            className={getBtnClass(activeBlock === "h1")}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>

          {/* Heading 2 Button */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("formatBlock", "h2")}
            className={getBtnClass(activeBlock === "h2")}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          {/* Paragraph Button */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("formatBlock", "p")}
            className={getParagraphClass(activeBlock === "p")}
            title="Normal Paragraph"
          >
            Paragraph
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("insertUnorderedList")}
            className={getBtnClass(isUl)}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("insertOrderedList")}
            className={getBtnClass(isOl)}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          {/* Quote & Code */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("formatBlock", "blockquote")}
            className={getBtnClass(isQuote)}
            title="Quote Block"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("formatBlock", "pre")}
            className={getBtnClass(isCode)}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          {/* Link Controls */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleAddLink}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("unlink")}
            className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
            title="Remove Link"
          >
            <Unlink className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300/60 mx-1" />

          {/* Undo / Redo */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd("undo")}
            className="p-2 text-slate-600 hover:text-[#2D6FBA] hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
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
          onFocus={() => {
            setIsFocused(true);
            checkActiveFormats();
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onKeyUp={checkActiveFormats}
          onMouseUp={checkActiveFormats}
          onSelect={checkActiveFormats}
          style={{ minHeight }}
          className="p-5 text-sm text-slate-800 outline-none prose prose-slate max-w-none focus:outline-none overflow-y-auto"
          data-placeholder={placeholder}
        />
      </div>
    </div>
  );
};
