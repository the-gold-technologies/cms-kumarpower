"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImagePickerField } from "@/components/ImagePickerField";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export default function GlobalSeoCMSPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    siteName: "Kumar Power",
    titleSuffix: " | Kirloskar Authorized Dealer",
    defaultMetaDescription: "Kumar Power - Leading authorized dealer for Kirloskar silent diesel generators, gas gensets, portable generators, and AMC service in Delhi NCR.",
    defaultOgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    googleAnalyticsId: "G-KP12345678",
    googleTagManagerId: "GTM-KP87654",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Global SEO settings saved!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Global SEO & Tracking Settings"
        description="Configure sitewide meta defaults, OpenGraph social previews, Google Analytics & GTM tracking scripts."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Website Brand Name"
            value={formData.siteName}
            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
          />

          <InputField
            label="Title Suffix"
            value={formData.titleSuffix}
            onChange={(e) => setFormData({ ...formData, titleSuffix: e.target.value })}
          />
        </div>

        <TextAreaField
          label="Default Meta Description"
          value={formData.defaultMetaDescription}
          onChange={(e) => setFormData({ ...formData, defaultMetaDescription: e.target.value })}
          rows={3}
        />

        <ImagePickerField
          label="Default OpenGraph Share Image"
          value={formData.defaultOgImage}
          onChange={(val) => setFormData({ ...formData, defaultOgImage: val })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <InputField
            label="Google Analytics Measurement ID (GA4)"
            value={formData.googleAnalyticsId}
            onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
          />

          <InputField
            label="Google Tag Manager Container ID"
            value={formData.googleTagManagerId}
            onChange={(e) => setFormData({ ...formData, googleTagManagerId: e.target.value })}
          />
        </div>

        <div className="flex justify-end pt-4">
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
