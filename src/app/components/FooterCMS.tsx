"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

interface FooterCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FooterCMS({
  saveUrl = "/api/home",
  responseKey = "footer",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: FooterCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    aboutBio: "",
    address: "",
    mainPhone: "",
    supportPhone: "",
    landline: "",
    salesEmail: "",
    supportEmail: "",
    accountsEmail: "",
    copyrightText: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const footer = responseKey ? json.data?.[responseKey] : json.data;
          if (footer && typeof footer === "object") {
            setFormData((prev) => ({
              ...prev,
              ...Object.fromEntries(Object.entries(footer).filter(([k]) => k in prev)),
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
      toast.success("Footer section saved!");
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
        title="Footer Section"
        description="Manage company bio, office address, phone numbers, email addresses & copyright info."
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
          {/* About Bio */}
          <TextAreaField
            label="Footer Company Bio"
            value={formData.aboutBio}
            onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
            rows={3}
          />

          {/* Contact Details */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Contact Information</p>
            <TextAreaField
              label="Office Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Main Phone"
                value={formData.mainPhone}
                onChange={(e) => setFormData({ ...formData, mainPhone: e.target.value })}
              />
              <InputField
                label="Support Phone"
                value={formData.supportPhone}
                onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
              />
              <InputField
                label="Landline"
                value={formData.landline}
                onChange={(e) => setFormData({ ...formData, landline: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Sales Email"
                value={formData.salesEmail}
                onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
              />
              <InputField
                label="Support Email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
              />
              <InputField
                label="Accounts Email"
                value={formData.accountsEmail}
                onChange={(e) => setFormData({ ...formData, accountsEmail: e.target.value })}
              />
            </div>
          </div>

          {/* Social Media Links notice */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                Global Social Media
              </span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">
                Social Media Links & Handles
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                Social media links (LinkedIn, YouTube, Instagram, Facebook) and labels are centrally managed in the <strong>Navigation → Social Media</strong> tab and automatically sync with the footer across the website.
              </p>
            </div>
            <a
              href="/navigation/social-media"
              className="shrink-0 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-[#2D6FBA] rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              Manage Social Media →
            </a>
          </div>

          {/* Copyright Statement */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Copyright Statement</p>
            <InputField
              label="Copyright Statement"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
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
