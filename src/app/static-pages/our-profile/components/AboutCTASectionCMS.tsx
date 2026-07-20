"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function AboutCTASectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [ctaTitle, setCtaTitle] = useState("Ready to Power Your Business?");
  const [ctaDesc, setCtaDesc] = useState(
    "Contact us today for a consultation and discover how Kumar Generator House can provide reliable power solutions tailored to your needs."
  );
  const [ctaBtnLabel, setCtaBtnLabel] = useState("Get in Touch →");
  const [ctaBtnUrl, setCtaBtnUrl] = useState("/contact");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Bottom CTA section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="5. Bottom Call To Action Banner"
        description="Manage the bottom conversion banner headline, description copy, and CTA button URL."
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
            label="CTA Title"
            value={ctaTitle}
            onChange={(e) => setCtaTitle(e.target.value)}
          />
          <TextAreaField
            label="CTA Description Copy"
            value={ctaDesc}
            onChange={(e) => setCtaDesc(e.target.value)}
            rows={2}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Button Label"
              value={ctaBtnLabel}
              onChange={(e) => setCtaBtnLabel(e.target.value)}
            />
            <InputField
              label="Button Target URL"
              value={ctaBtnUrl}
              onChange={(e) => setCtaBtnUrl(e.target.value)}
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
