"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type UseCaseItem = {
  id: string;
  title: string;
  text: string;
};

export function UseCasesSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [headingLine1, setHeadingLine1] = useState("");
  const [headingLine2, setHeadingLine2] = useState("");
  const [footerQuote, setFooterQuote] = useState("");
  const [items, setItems] = useState<UseCaseItem[]>([]);

  useEffect(() => {
    fetch("/api/pages/home")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const uc = json.data["use-cases"] || {};
          if (uc.headingLine1 !== undefined) setHeadingLine1(uc.headingLine1);
          if (uc.headingLine2 !== undefined) setHeadingLine2(uc.headingLine2);
          if (uc.footerQuote !== undefined) setFooterQuote(uc.footerQuote);
          if (Array.isArray(uc.items)) setItems(uc.items);
        }
      })
      .catch(console.error);
  }, []);

  const handleItemChange = (id: string, field: keyof UseCaseItem, val: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: val } : it)));
  };

  const addItem = () => {
    const newId = `uc-${Date.now()}`;
    setItems((prev) => [...prev, { id: newId, title: "", text: "" }]);
    toast.success("New use case added!");
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    toast.success("Use case removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { headingLine1, headingLine2, footerQuote, items };
      const res = await fetch("/api/pages/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "use-cases", content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Use Cases section saved!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Power Solutions for Metro Cities (Use Cases)"
        description="Manage the 2-line heading, use case scenarios & bottom summary statement."
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-6 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Heading Line 1"
              value={headingLine1}
              onChange={(e) => setHeadingLine1(e.target.value)}
              placeholder="e.g. Power Solutions"
            />
            <InputField
              label="Heading Line 2"
              value={headingLine2}
              onChange={(e) => setHeadingLine2(e.target.value)}
              placeholder="e.g. for Metro Cities"
            />
          </div>

          <TextAreaField
            label="Bottom Summary Quote"
            value={footerQuote}
            onChange={(e) => setFooterQuote(e.target.value)}
            rows={2}
          />

          {/* Dynamic Use Cases List */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Use Case Items ({items.length} items)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Scenarios showing why customers choose Kirloskar generators
                </p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Use Case
              </button>
            </div>

            <div className="space-y-4">
              {items.map((it, idx) => (
                <div key={it.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                      Use Case #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(it.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <InputField
                    label="Use Case Title"
                    value={it.title}
                    onChange={(e) => handleItemChange(it.id, "title", e.target.value)}
                    placeholder="e.g. Power Outages and Load Shedding"
                  />
                  <TextAreaField
                    label="Description Text"
                    value={it.text}
                    onChange={(e) => handleItemChange(it.id, "text", e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
