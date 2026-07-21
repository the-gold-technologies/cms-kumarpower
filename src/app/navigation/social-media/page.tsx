"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { SaveButton } from "@/components/SaveButton";
import { SocialLink } from "@/lib/types";
import toast from "react-hot-toast";

export default function SocialMediaCMSPage() {
  const [links, setLinks] = useState<SocialLink[]>([
    { id: "1", platform: "LinkedIn", url: "https://linkedin.com/company/kumarpower" },
    { id: "2", platform: "Facebook", url: "https://facebook.com/kumarpower" },
    { id: "3", platform: "Instagram", url: "https://instagram.com/kumarpower" },
    { id: "4", platform: "YouTube", url: "https://youtube.com/c/kumarpower" },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/nav-links")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.socialLinks)) {
          setLinks(json.socialLinks);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/nav-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "social", links }),
      });
      setIsSaving(false);
      setSaved(true);
      toast.success("Social links saved!");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setIsSaving(false);
      toast.error("Save failed");
    }
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
