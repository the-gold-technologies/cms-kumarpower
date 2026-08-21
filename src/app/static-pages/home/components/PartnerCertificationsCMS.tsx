"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { uploadFilesDeep } from "@/lib/uploadHelpers";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  Upload,
  CloudUpload,
  Image as ImageIcon,
  Trash2,
  X,
  Plus,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

export type PartnerLogoItem = {
  id: string;
  url: string | File;
  alt: string;
};

interface PartnerCertificationsCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function PartnerCertificationsCMS({
  saveUrl = "/api/home",
  responseKey = "partnerCertifications",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: PartnerCertificationsCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    logos: PartnerLogoItem[];
  }>({
    title: "",
    description: "",
    logos: [],
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey ? json.data?.[responseKey] : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData({
              title: sectionData.title ?? "",
              description: sectionData.description ?? "",
              logos: Array.isArray(sectionData.logos) ? sectionData.logos : [],
            });
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleFileUpload = (id: string, file: File) => {
    if (file.size > 100 * 1024 * 1024) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      toast.error(
        `File "${file.name}" is too big (${sizeMb}MB). Maximum allowed limit is 100MB. Please reduce it to under 100MB.`
      );
      return;
    }
    setFormData((prev) => ({
      ...prev,
      logos: prev.logos.map((l) =>
        l.id === id ? { ...l, url: file, alt: l.alt || file.name } : l
      ),
    }));
    toast.success("Partner logo updated!");
  };

  const handleBulkFiles = (files: FileList | File[]) => {
    const newLogos: PartnerLogoItem[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 100 * 1024 * 1024) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        toast.error(
          `File "${file.name}" is too big (${sizeMb}MB). Maximum allowed limit is 100MB. Please reduce it to under 100MB.`
        );
        return;
      }
      newLogos.push({
        id: `partner-logo-${Date.now()}-${Math.random()}`,
        url: file,
        alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      });
    });

    if (newLogos.length > 0) {
      setFormData((prev) => ({
        ...prev,
        logos: [...prev.logos, ...newLogos],
      }));
      toast.success(`${newLogos.length} partner logos added!`);
    }
    if (bulkInputRef.current) bulkInputRef.current.value = "";
  };

  const removeLogo = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      logos: prev.logos.filter((l) => l.id !== id),
    }));
    toast.success("Logo removed");
  };

  const updateLogoAlt = (id: string, alt: string) => {
    setFormData((prev) => ({
      ...prev,
      logos: prev.logos.map((l) => (l.id === id ? { ...l, alt } : l)),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = await uploadFilesDeep(formData);

      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");

      if (payload.logos) {
        setFormData((prev) => ({ ...prev, logos: payload.logos }));
      }

      clearCache(saveUrl);
      setSaved(true);
      toast.success("Partner & Certifications section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save partner & certifications section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="10. Partner & Certifications Section (Trusted Association)"
        description="Manage the partner certifications and industry association logos (Kirloskar Powergen, IIA, BAI, IPA, MBA, BNI, WSCC, ISO 9001:2015, Client logos) in the dark infinite marquee."
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
          {/* Header Block */}
          <div className="space-y-4">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
              Header Block
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Section Heading"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Trusted Association"
              />
              <TextAreaField
                label="Section Subtitle"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="e.g. Certified and recognized by leading industry organizations..."
                rows={2}
              />
            </div>
          </div>

          {/* Partner Logos Marquee Manager */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Association & Partner Logos ({formData.logos.length} logos)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload OEM partner badges, association crests, and certification logos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => bulkInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Logos
              </button>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onClick={() => bulkInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.length) handleBulkFiles(e.dataTransfer.files);
              }}
              className="w-full border-2 border-dashed border-gray-200 hover:border-[#1A6AA2]/50 rounded-xl bg-gray-50 hover:bg-blue-50/20 flex flex-col items-center justify-center p-6 lg:p-8 transition-colors cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-3 text-[#1A6AA2] group-hover:scale-110 transition-transform">
                <CloudUpload className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-700 text-sm mb-1 text-center font-medium">
                <span className="text-[#1A6AA2] font-semibold hover:underline mr-1">
                  Click to upload
                </span>
                or drag & drop logo images
              </p>
              <p className="text-gray-400 text-xs text-center font-medium">
                PNG, JPG, SVG or WebP supported (Multiple files selection allowed)
              </p>
            </div>

            <input
              ref={bulkInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleBulkFiles(e.target.files)}
            />

            {/* Logos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {formData.logos.map((logo, idx) => (
                <div
                  key={logo.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 relative group hover:border-[#1A6AA2]/40 transition"
                >
                  <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    {logo.url ? (
                      <img
                        src={
                          typeof logo.url === "string"
                            ? logo.url
                            : URL.createObjectURL(logo.url)
                        }
                        alt={logo.alt || "Logo"}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-300" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <input
                      type="text"
                      value={logo.alt}
                      onChange={(e) => updateLogoAlt(logo.id, e.target.value)}
                      placeholder="Organization Name / Alt"
                      className="w-full bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-2 py-1 outline-none focus:border-[#1A6AA2] font-medium"
                    />
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Logo #{idx + 1}</span>
                      <label className="text-[#1A6AA2] hover:underline cursor-pointer font-semibold">
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(logo.id, file);
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeLogo(logo.id)}
                    className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 transition cursor-pointer shrink-0"
                    title="Remove logo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
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
