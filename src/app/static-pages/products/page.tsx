"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImagePickerField } from "@/components/ImagePickerField";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export default function ProductsStaticPageCMS() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Kirloskar Generators & Power Range",
    subtitle: "CPCB IV+ Compliant Silent Diesel Gensets, Gas Gensets, Portable Gensets & Control Panels",
    bannerImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
    categoryIntro: "Explore our range of Kirloskar silent diesel generators from 2.1 kVA to 1500 kVA built for high fuel efficiency, low noise, and maximum uptime.",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Products page settings saved!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Products Landing Page CMS"
        description="Configure banner graphics, overview header, and introductory copy for the products section."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <InputField
          label="Hero Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <InputField
          label="Header Subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
        />

        <ImagePickerField
          label="Products Banner Image"
          value={formData.bannerImage}
          onChange={(val) => setFormData({ ...formData, bannerImage: val })}
        />

        <TextAreaField
          label="Category Introduction Text"
          value={formData.categoryIntro}
          onChange={(e) => setFormData({ ...formData, categoryIntro: e.target.value })}
          rows={3}
        />

        <div className="flex justify-end pt-4">
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
