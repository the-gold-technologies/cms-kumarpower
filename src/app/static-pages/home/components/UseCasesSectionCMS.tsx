"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function UseCasesSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Powering Critical Sectors Across India",
    subtitle: "Delivering reliable generator backup to diverse industries",
    sector1: "Healthcare & Hospitals",
    sector2: "Data Centers & Telecom",
    sector3: "Infrastructure & Airports",
    sector4: "Hotels & Commercial Real Estate",
  });

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
        title="Industry Use Cases Section"
        description="Configure target industry sectors and enterprise applications."
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <InputField
              label="Sector 1"
              value={formData.sector1}
              onChange={(e) => setFormData({ ...formData, sector1: e.target.value })}
            />
            <InputField
              label="Sector 2"
              value={formData.sector2}
              onChange={(e) => setFormData({ ...formData, sector2: e.target.value })}
            />
            <InputField
              label="Sector 3"
              value={formData.sector3}
              onChange={(e) => setFormData({ ...formData, sector3: e.target.value })}
            />
            <InputField
              label="Sector 4"
              value={formData.sector4}
              onChange={(e) => setFormData({ ...formData, sector4: e.target.value })}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
