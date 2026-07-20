"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function PowerSolutionsSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Turnkey Power & Engineering Solutions",
    subtitle: "From civil foundation to acoustic treatment and Annual Maintenance Contracts",
    solution1: "Turnkey Installation & Commissioning",
    solution1Desc: "Civil foundation, exhaust piping, acoustic ducting, and pollution clearances.",
    solution2: "Annual Maintenance Contracts (AMC)",
    solution2Desc: "Preventive routine maintenance & 24/7 breakdown coverage with OEM parts.",
    solution3: "Generator Rentals Fleet",
    solution3Desc: "Flexible daily & monthly rental fleet from 15 kVA to 1500 kVA.",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Power Solutions section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Turnkey Power Solutions Section"
        description="Manage engineering services highlights, AMC, and installation callouts."
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
            label="Section Main Title"
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
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Solution 1</span>
              <InputField
                label="Title"
                value={formData.solution1}
                onChange={(e) => setFormData({ ...formData, solution1: e.target.value })}
              />
              <TextAreaField
                label="Description"
                value={formData.solution1Desc}
                onChange={(e) => setFormData({ ...formData, solution1Desc: e.target.value })}
                rows={2}
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Solution 2</span>
              <InputField
                label="Title"
                value={formData.solution2}
                onChange={(e) => setFormData({ ...formData, solution2: e.target.value })}
              />
              <TextAreaField
                label="Description"
                value={formData.solution2Desc}
                onChange={(e) => setFormData({ ...formData, solution2Desc: e.target.value })}
                rows={2}
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Solution 3</span>
              <InputField
                label="Title"
                value={formData.solution3}
                onChange={(e) => setFormData({ ...formData, solution3: e.target.value })}
              />
              <TextAreaField
                label="Description"
                value={formData.solution3Desc}
                onChange={(e) => setFormData({ ...formData, solution3Desc: e.target.value })}
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
