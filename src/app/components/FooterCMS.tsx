"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function FooterCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    aboutBio:
      "Kumar Power is certified ISO 9001:2015 Company & have emerged as the leading Power Solution Providers. Being an authorized Channel Partner of Kirloskar Oil Engines Limited, Kumar Power is committed to provide quality power solutions.",
    address: "904, Westend Mall, Janakpuri, New Delhi 110058",
    mainPhone: "+91 97738 51767",
    supportPhone: "+91 97738 77796",
    landline: "011-46701273",
    salesEmail: "sales@kumarpower.com",
    supportEmail: "support@kumarpower.com",
    accountsEmail: "accounts@kumarpower.com",
    facebookUrl: "https://www.facebook.com/kumargenerator/",
    instagramUrl: "https://www.instagram.com/Kumarpowerlimitless",
    linkedinUrl: "https://www.linkedin.com/company/kumar-generator-house---india/",
    copyrightText: "© 2026 Kumar Power. All rights reserved.",
    developerCredit: "Crafted with ❤️ by The Gold Technologies",
    developerUrl: "https://thegoldtechnologies.com/",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Footer settings saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Footer Section"
        description="Manage company bio, office address, phone numbers, email addresses, social media links & copyright info."
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

          {/* Social Links */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Social Media Links</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField
                label="Facebook URL"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              />
              <InputField
                label="Instagram URL"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              />
              <InputField
                label="LinkedIn URL"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Copyright & Credits */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Copyright & Developer Credits</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Copyright Statement"
                value={formData.copyrightText}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
              />
              <InputField
                label="Developer Credit Text"
                value={formData.developerCredit}
                onChange={(e) => setFormData({ ...formData, developerCredit: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
