"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function AboutCTASectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaDesc, setCtaDesc] = useState("");
  const [ctaBtnLabel, setCtaBtnLabel] = useState("");
  const [ctaBtnUrl, setCtaBtnUrl] = useState("");

  useEffect(() => {
    fetch("/api/pages/our-profile")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const cta = json.data.cta || {};
          if (cta.ctaTitle !== undefined) setCtaTitle(cta.ctaTitle);
          if (cta.ctaDesc !== undefined) setCtaDesc(cta.ctaDesc);
          if (cta.ctaBtnLabel !== undefined) setCtaBtnLabel(cta.ctaBtnLabel);
          if (cta.ctaBtnUrl !== undefined) setCtaBtnUrl(cta.ctaBtnUrl);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ctaTitle, ctaDesc, ctaBtnLabel, ctaBtnUrl };
      const res = await fetch("/api/pages/our-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "cta", content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Bottom CTA section saved!");
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
