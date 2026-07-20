"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export default function ContactCMSPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    headOfficeAddress: "Kumar Power House, Plot No. 42, Industrial Area Phase II, Okhla, New Delhi - 110020",
    phoneNumbers: "+91 98110 43210, +91 11 4160 8888",
    emailAddresses: "sales@kumarpower.com, info@kumarpower.com",
    workingHours: "Monday - Saturday: 9:00 AM - 7:00 PM (Emergency SLA: 24/7)",
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.623123!",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Contact details updated!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Contact Us Page & Location CMS"
        description="Update corporate address, phone numbers, email contact channels, and Google Maps embed code."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <TextAreaField
          label="Corporate Head Office Address"
          value={formData.headOfficeAddress}
          onChange={(e) => setFormData({ ...formData, headOfficeAddress: e.target.value })}
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Contact Phone Numbers"
            value={formData.phoneNumbers}
            onChange={(e) => setFormData({ ...formData, phoneNumbers: e.target.value })}
          />

          <InputField
            label="Email Addresses"
            value={formData.emailAddresses}
            onChange={(e) => setFormData({ ...formData, emailAddresses: e.target.value })}
          />
        </div>

        <InputField
          label="Working Hours & SLA"
          value={formData.workingHours}
          onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
        />

        <InputField
          label="Google Maps Embed URL"
          value={formData.googleMapEmbed}
          onChange={(e) => setFormData({ ...formData, googleMapEmbed: e.target.value })}
        />

        <div className="flex justify-end pt-4">
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
