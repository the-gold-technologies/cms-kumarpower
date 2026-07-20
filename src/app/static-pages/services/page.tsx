"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export default function ServicesStaticPageCMS() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Generator Services & AMC Solutions",
    subtitle: "24/7 Breakdown Support, Annual Maintenance Contracts & Certified Overhauling",
    introText: "Kumar Power offers comprehensive technical services delivered by KOEL-certified engineers to guarantee continuous power reliability for your business.",
    emergencyHotline: "+91 98110 00000",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Services page content updated!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Services Page Static CMS"
        description="Edit headline, service introductions, and 24/7 hotline callouts."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <InputField
          label="Page Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <InputField
          label="Page Subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
        />

        <InputField
          label="24/7 Emergency Hotline Number"
          value={formData.emergencyHotline}
          onChange={(e) => setFormData({ ...formData, emergencyHotline: e.target.value })}
        />

        <TextAreaField
          label="Services Overview Copy"
          value={formData.introText}
          onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
          rows={3}
        />

        <div className="flex justify-end pt-4">
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
