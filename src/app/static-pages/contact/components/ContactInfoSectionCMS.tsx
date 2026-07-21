"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

interface ContactInfoSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function ContactInfoSectionCMS({
  saveUrl = "/api/contact",
  responseKey = "info",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: ContactInfoSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    officeHours: "",
    phoneMain: "",
    phoneSupport: "",
    phoneLandline: "",
    emailMain: "",
    emailSales: "",
    emailSupport: "",
    emailAccounts: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const info = responseKey ? json.data?.[responseKey] : json.data;
          if (info && typeof info === "object") {
            setFormData((prev) => ({
              ...prev,
              ...Object.fromEntries(Object.entries(info).filter(([k]) => k in prev)),
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: formData }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("Contact info cards saved!");
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
