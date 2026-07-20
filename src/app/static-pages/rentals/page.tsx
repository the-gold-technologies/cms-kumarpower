"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export default function RentalsStaticPageCMS() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Silent Generator Rental Services",
    subtitle: "Temporary Backup Power Fleets from 15 kVA to 1500 kVA Available on Daily & Monthly Hire",
    introText: "Whether you need short-term power for events or long-term industrial generator rental during grid upgrades, Kumar Power provides soundproof containerized gensets delivered and installed on site.",
    termsText: "All rental fleets include soundproof acoustic canopy, fuel tank, and 24/7 operator options.",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Rentals page content updated!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Rentals Page Static CMS"
        description="Edit rental page headlines, fleet overview text, and hire terms."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <InputField
          label="Rentals Page Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <InputField
          label="Subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
        />

        <TextAreaField
          label="Rental Overview Copy"
          value={formData.introText}
          onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
          rows={3}
        />

        <TextAreaField
          label="Rental Terms Note"
          value={formData.termsText}
          onChange={(e) => setFormData({ ...formData, termsText: e.target.value })}
          rows={2}
        />

        <div className="flex justify-end pt-4">
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
