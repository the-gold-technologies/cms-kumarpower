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
  Image as ImageIcon,
  Upload,
  Loader2,
  Undo,
  Redo,
  HelpCircle,
} from "lucide-react";
import { uploadFile } from "@/lib/uploadHelpers";
import toast from "react-hot-toast";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageMenuRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        imageMenuRef.current &&
        !imageMenuRef.current.contains(e.target as Node)
      ) {
        setShowImageMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (
      sel &&
      sel.rangeCount > 0 &&
      editorRef.current?.contains(sel.anchorNode)
    ) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

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
    saveSelection();
    const url = prompt("Enter link URL (e.g. https://www.kumarpower.com):");
    if (url) {
      execCmd("createLink", url);
    }
  };

  const insertImage = (url: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const sel = window.getSelection();
    let range = savedRangeRef.current;
    if (!range || !editorRef.current.contains(range.commonAncestorContainer)) {
      range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
    }

    if (sel && range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }

    const img = document.createElement("img");
    img.src = url;
    img.alt = "Article image";
    img.className = "rounded-xl my-4 max-w-full h-auto shadow-sm block";

    const p = document.createElement("p");
    p.innerHTML = "<br>";

    if (range) {
      range.deleteContents();
      range.insertNode(p);
      range.insertNode(img);

      const newRange = document.createRange();
      newRange.setStart(p, 0);
      newRange.collapse(true);
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    } else {
      document.execCommand("insertImage", false, url);
    }

    handleInput();
  };

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const tid = toast.loading("Uploading image to article...");
    try {
      setIsUploadingImage(true);
      const url = await uploadFile(file);
      if (url) {
        insertImage(url);
        toast.success("Image inserted into article!", { id: tid });
      } else {
        toast.error("Failed to upload image", { id: tid });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image", { id: tid });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleInsertImageUrl = () => {
    saveSelection();
    const url = prompt("Enter Image URL (e.g. https://...):");
    if (url && url.trim()) {
      insertImage(url.trim());
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          saveSelection();
          const tid = toast.loading("Uploading pasted image...");
          try {
            setIsUploadingImage(true);
            const url = await uploadFile(file);
            if (url) {
              insertImage(url);
              toast.success("Pasted image inserted!", { id: tid });
            }
          } catch (err: any) {
            toast.error(err.message || "Failed to upload image", { id: tid });
          } finally {
            setIsUploadingImage(false);
          }
          return;
        }
      }
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
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
            }}
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

          {/* Image Upload & Insert Controls */}
          <div className="relative" ref={imageMenuRef}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                saveSelection();
              }}
              onClick={() => setShowImageMenu((prev) => !prev)}
              className={getBtnClass(showImageMenu)}
              title="Insert Image (Upload or URL)"
            >
              {isUploadingImage ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#2D6FBA]" />
              ) : (
                <ImageIcon className="w-4 h-4" />
              )}
            </button>

            {showImageMenu && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50 flex flex-col gap-1 text-xs font-semibold animate-in fade-in slide-in-from-top-1">
                <button
                  type="button"
                  onClick={() => {
                    saveSelection();
                    fileInputRef.current?.click();
                    setShowImageMenu(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition text-left cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#2D6FBA]" />
                  <span>Upload from Device</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowImageMenu(false);
                    handleInsertImageUrl();
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition text-left cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4 text-emerald-600" />
                  <span>Insert from URL</span>
                </button>
              </div>
            )}
          </div>

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
          onPaste={handlePaste}
          onFocus={() => {
            setIsFocused(true);
            checkActiveFormats();
            saveSelection();
          }}
          onBlur={() => {
            setIsFocused(false);
            saveSelection();
          }}
          onKeyUp={() => {
            checkActiveFormats();
            saveSelection();
          }}
          onMouseUp={() => {
            checkActiveFormats();
            saveSelection();
          }}
          onSelect={() => {
            checkActiveFormats();
            saveSelection();
          }}
          style={{ minHeight }}
          className="p-5 text-sm text-slate-800 outline-none prose prose-slate max-w-none focus:outline-none overflow-y-auto"
          data-placeholder={placeholder}
        />
      </div>
    </div>
  );
};
