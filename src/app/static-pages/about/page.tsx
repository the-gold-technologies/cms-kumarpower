"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImagePickerField } from "@/components/ImagePickerField";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export default function AboutStaticPageCMS() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    pageTitle: "About Kumar Power",
    subtitle: "35+ Years of Trust as Kirloskar Authorized Generator Partners",
    heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    companyStory: "Founded in 1989, Kumar Power has established itself as one of North India's most respected Kirloskar channel partners. We deliver comprehensive power solutions spanning diesel generators, gas gensets, AMF control panels, and custom power rentals.",
    vision: "To be India's undisputed leader in reliable, eco-friendly CPCB IV+ power generation and turnkey engineering services.",
    mission: "To empower industries, healthcare institutions, and infrastructure projects with uninterrupted, clean backup power supported by instant 24/7 technical response.",
    directorName: "Sudeesh Kumar",
    directorTitle: "Managing Director",
    directorQuote: "Our commitment to quality and customer trust is non-negotiable. Every generator we deliver carries Kirloskar's legacy of excellence.",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("About Us page content updated!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="About Us Static Page CMS"
        description="Manage company story, mission & vision, leadership quotes, and corporate overview."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <InputField
          label="Page Title"
          value={formData.pageTitle}
          onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
        />

        <InputField
          label="Header Subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
        />

        <ImagePickerField
          label="Banner Image"
          value={formData.heroImage}
          onChange={(val) => setFormData({ ...formData, heroImage: val })}
        />

        <TextAreaField
          label="Company Story & Background"
          value={formData.companyStory}
          onChange={(e) => setFormData({ ...formData, companyStory: e.target.value })}
          rows={5}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextAreaField
            label="Corporate Vision Statement"
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            rows={3}
          />

          <TextAreaField
            label="Corporate Mission Statement"
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            rows={3}
          />
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
            Leadership & Director's Message
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Director Name"
              value={formData.directorName}
              onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
            />
            <InputField
              label="Designation / Title"
              value={formData.directorTitle}
              onChange={(e) => setFormData({ ...formData, directorTitle: e.target.value })}
            />
          </div>
          <TextAreaField
            label="Director's Message / Quote"
            value={formData.directorQuote}
            onChange={(e) => setFormData({ ...formData, directorQuote: e.target.value })}
            rows={2}
          />
        </div>

        <div className="flex justify-end pt-4">
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
