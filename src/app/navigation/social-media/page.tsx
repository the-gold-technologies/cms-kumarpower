"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { SaveButton } from "@/components/SaveButton";
import { useCMSStore } from "@/lib/cms-store";
import { SocialLink } from "@/lib/types";
import toast from "react-hot-toast";

export default function SocialMediaCMSPage() {
  const { socialLinks, saveSocialLinks } = useCMSStore();
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveSocialLinks(links);
      setIsSaving(false);
      setSaved(true);
      toast.success("Social links saved!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Social Media & Handles"
        description="Configure social channel handles for LinkedIn, Facebook, Instagram, and YouTube."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((s, idx) => (
          <div key={s.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
              {s.platform}
            </span>
            <InputField
              label="Profile URL"
              value={s.url}
              onChange={(e) => {
                const updated = [...links];
                updated[idx].url = e.target.value;
                setLinks(updated);
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
