"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { SaveButton } from "@/components/SaveButton";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { Linkedin, Youtube, Instagram, Facebook, Share2 } from "lucide-react";
import toast from "react-hot-toast";

const SAVE_URL = "/api/social-links";

const PLATFORMS = [
  {
    key: "linkedinUrl",
    label: "LinkedIn",
    icon: Linkedin,
    color: "#0A66C2",
    placeholder: "https://www.linkedin.com/company/kumar-power/",
    description: "Company LinkedIn page",
  },
  {
    key: "youtubeUrl",
    label: "YouTube",
    icon: Youtube,
    color: "#FF0000",
    placeholder: "https://youtube.com/@kumarpowertv",
    description: "YouTube channel",
  },
  {
    key: "instagramUrl",
    label: "Instagram",
    icon: Instagram,
    color: "#E4405F",
    placeholder: "https://www.instagram.com/kumarpowerlimitless",
    description: "Instagram profile",
  },
  {
    key: "facebookUrl",
    label: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    placeholder: "https://www.facebook.com/kumargenerator/",
    description: "Facebook page",
  },
];

export default function SocialMediaCMSPage() {
  const [formData, setFormData] = useState({
    connectTitle: "Connect with us:",
    linkedinUrl: "",
    youtubeUrl: "",
    instagramUrl: "",
    facebookUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchWithCache(SAVE_URL)
      .then((json) => {
        if (json.success && json.data) {
          setFormData((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(json.data).filter(
                ([k, v]) => k in prev && v !== undefined && v !== null
              )
            ),
          }));
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(SAVE_URL);
      // Also clear home page cache since footer section is updated
      clearCache("/api/home");
      setSaved(true);
      toast.success("Social links saved! Updates everywhere on the site.");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Social Media & Handles"
        description="Configure social channel URLs here — updates everywhere on the site: footer, About page 'Connect with us' buttons, and all other locations."
        action={<SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />}
      />

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <Share2 className="w-5 h-5 text-[#2D6FBA] mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-[#1a3f6f]">Single Source of Truth</p>
          <p className="text-xs text-blue-600 mt-0.5">
            Any change saved here automatically updates the <strong>site footer</strong> and
            the <strong>Our Profile page "Connect with us"</strong> section — no need to update
            them separately.
          </p>
        </div>
      </div>

      {/* Connect Label */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100/50">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-4">
          Button Label
        </p>
        <InputField
          label='"Connect with us" Label Text'
          value={formData.connectTitle}
          onChange={(e) => setFormData({ ...formData, connectTitle: e.target.value })}
          placeholder='e.g. "Connect with us:" or "Follow us:"'
        />
        <p className="text-xs text-slate-400 mt-2">
          This label appears before the social icons on the About/Our Profile page.
        </p>
      </div>

      {/* Social Platform URLs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100/50">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-5">
          Platform URLs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PLATFORMS.map(({ key, label, icon: Icon, color, placeholder, description }) => (
            <div
              key={key}
              className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{label}</p>
                  <p className="text-[10px] text-slate-400">{description}</p>
                </div>
              </div>
              <InputField
                label="Profile URL"
                value={(formData as any)[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
