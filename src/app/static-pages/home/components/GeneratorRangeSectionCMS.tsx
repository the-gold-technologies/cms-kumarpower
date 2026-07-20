"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function GeneratorRangeSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Kirloskar Generator Range Showcase",
    subtitle: "Complete spectrum of power solutions for residential, commercial & heavy industrial needs",
    category1Title: "Kirloskar CPCB IV+ Silent Gensets",
    category1Desc: "Compact 2.1 kVA to 1500 kVA water-cooled silent diesel generators.",
    category2Title: "Kirloskar Gas Gensets",
    category2Desc: "Clean natural gas / PNG power generators for eco-friendly operation.",
    category3Title: "Portable Silent Gensets",
    category3Desc: "Lightweight inverter gensets with electric start for mobile backup.",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Generator Range section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Generator Range Section"
        description="Manage featured product category highlights on the homepage."
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
          <InputField
            label="Section Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <TextAreaField
            label="Section Subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            rows={2}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Category 1</span>
              <InputField
                label="Title"
                value={formData.category1Title}
                onChange={(e) => setFormData({ ...formData, category1Title: e.target.value })}
              />
              <TextAreaField
                label="Short Description"
                value={formData.category1Desc}
                onChange={(e) => setFormData({ ...formData, category1Desc: e.target.value })}
                rows={2}
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Category 2</span>
              <InputField
                label="Title"
                value={formData.category2Title}
                onChange={(e) => setFormData({ ...formData, category2Title: e.target.value })}
              />
              <TextAreaField
                label="Short Description"
                value={formData.category2Desc}
                onChange={(e) => setFormData({ ...formData, category2Desc: e.target.value })}
                rows={2}
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Category 3</span>
              <InputField
                label="Title"
                value={formData.category3Title}
                onChange={(e) => setFormData({ ...formData, category3Title: e.target.value })}
              />
              <TextAreaField
                label="Short Description"
                value={formData.category3Desc}
                onChange={(e) => setFormData({ ...formData, category3Desc: e.target.value })}
                rows={2}
              />
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
