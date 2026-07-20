"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function ContactInfoSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    officeHours: "Monday - Saturday: 10:00 AM - 7:00 PM (Closed on Sundays & National Holidays)",
    phoneMain: "9773851767",
    phoneSupport: "9773877796",
    phoneLandline: "01146701273",
    emailMain: "kumargeneratorhouse@gmail.com",
    emailSales: "sales@kumarpower.com",
    emailSupport: "support@kumarpower.com",
    emailAccounts: "accounts@kumarpower.com",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Contact info cards saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="2. Contact Info Cards Section (Office Hours, Phone, Email)"
        description="Manage office working hours, main/support/landline phones & main/sales/support/accounts emails."
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
          <TextAreaField
            label="Office Hours Text"
            value={formData.officeHours}
            onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
            rows={2}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField
              label="Main Phone"
              value={formData.phoneMain}
              onChange={(e) => setFormData({ ...formData, phoneMain: e.target.value })}
            />
            <InputField
              label="Support Phone"
              value={formData.phoneSupport}
              onChange={(e) => setFormData({ ...formData, phoneSupport: e.target.value })}
            />
            <InputField
              label="Landline"
              value={formData.phoneLandline}
              onChange={(e) => setFormData({ ...formData, phoneLandline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Main Email"
              value={formData.emailMain}
              onChange={(e) => setFormData({ ...formData, emailMain: e.target.value })}
            />
            <InputField
              label="Sales Email"
              value={formData.emailSales}
              onChange={(e) => setFormData({ ...formData, emailSales: e.target.value })}
            />
            <InputField
              label="Support Email"
              value={formData.emailSupport}
              onChange={(e) => setFormData({ ...formData, emailSupport: e.target.value })}
            />
            <InputField
              label="Accounts Email"
              value={formData.emailAccounts}
              onChange={(e) => setFormData({ ...formData, emailAccounts: e.target.value })}
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
