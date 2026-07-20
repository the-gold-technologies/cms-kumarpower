"use client";

import { useState } from "react";
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

const INITIAL_ITEMS: UseCaseItem[] = [
  {
    id: "uc-1",
    title: "Power Outages and Load Shedding",
    text: "Despite robust infrastructure, metro areas still experience power outages caused by high demand, technical issues, maintenance work, grid failures, natural disasters, and peak-demand overload. Generators provide a reliable backup power source to maintain continuity during these interruptions. Kirloskar generators ensure an uninterrupted power supply, enabling homes, offices, and businesses to operate smoothly.",
  },
  {
    id: "uc-2",
    title: "High-Demand Areas",
    text: "Metro cities are hubs for businesses, industries, commercial buildings, hospitals, malls, data centers, and IT companies—all of which require continuous power to avoid operational disruptions. Kirloskar generators offer a dependable solution, minimizing downtime and preventing losses by maintaining essential services during power fluctuations.",
  },
  {
    id: "uc-3",
    title: "Dependability for Events and Functions",
    text: "Generators are essential for events such as weddings, concerts, public gatherings, construction projects, and outdoor activities where access to the power grid may be limited. In these situations, a stable power supply is crucial for lighting, sound systems, and equipment. Kirloskar generators ensure smooth operations, particularly for outdoor or temporary venues.",
  },
  {
    id: "uc-4",
    title: "Backup for Critical Appliances",
    text: "Households often need generators to keep essential appliances running during outages, such as refrigerators, medical equipment, air conditioners, and security systems. This helps maintain safety and convenience during unexpected power cuts.",
  },
  {
    id: "uc-5",
    title: "Increased Usage During Monsoon Season",
    text: "Heavy rains and storms frequently disrupt power lines in metro cities, resulting in power outages. Generators help reduce the impact of these disruptions on both businesses and homes, providing a stable power solution during the monsoon months.",
  },
  {
    id: "uc-6",
    title: "Urbanization and Infrastructure Stress",
    text: "Rapid urbanization places stress on existing power grids, occasionally leading to shortages or planned outages. Additionally, large-scale construction projects require a stable electricity supply to power tools and machinery, which may not always be accessible on-site. Generators are vital in supporting these urban growth needs, ensuring continuous development.",
  },
];

export function UseCasesSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [headingLine1, setHeadingLine1] = useState("Power Solutions");
  const [headingLine2, setHeadingLine2] = useState("for Metro Cities");
  const [footerQuote, setFooterQuote] = useState(
    "Kirloskar generators, with their reliable performance and versatility, are well-suited to meet the unique demands of metro city environments."
  );
  const [items, setItems] = useState<UseCaseItem[]>(INITIAL_ITEMS);

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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Use Cases section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
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
