"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { uploadFilesDeep } from "@/lib/uploadHelpers";
import { InputField } from "@/components/InputField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, X, Upload, UploadCloud, CloudUpload, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

type TrustLogo = { id: string; url: string | File; alt: string };

interface HeroSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function HeroSectionCMS({
  saveUrl = "/api/home",
  responseKey = "hero",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: HeroSectionCMSProps) {
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
    headingLine1: string;
    headingLine2: string;
    descriptionDesktop: string;
    descriptionMobileLine1: string;
    descriptionMobileLine2: string;
    descriptionMobileLine3: string;
    descriptionMobileLine4: string;
    ctaPrimaryLabel: string;
    ctaPrimaryUrl: string;
    ctaSecondaryLabel: string;
    companyProfilePdf: string | File;
    trustedByLabel: string;
    backgroundVideo: string | File;
  }>({
    headingLine1: "",
    headingLine2: "",
    descriptionDesktop: "",
    descriptionMobileLine1: "",
    descriptionMobileLine2: "",
    descriptionMobileLine3: "",
    descriptionMobileLine4: "",
    ctaPrimaryLabel: "",
    ctaPrimaryUrl: "",
    ctaSecondaryLabel: "",
    companyProfilePdf: "",
    trustedByLabel: "",
    backgroundVideo: "",
  });

  const [logos, setLogos] = useState<TrustLogo[]>([]);

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const hero = responseKey ? json.data?.[responseKey] : json.data;
          if (hero && typeof hero === "object") {
            setFormData((prev) => ({
              ...prev,
              ...Object.fromEntries(
                Object.entries(hero).filter(([k]) => k in prev)
              ),
            }));
            if (Array.isArray(hero.logos)) {
              setLogos(hero.logos);
            }
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleFileUpload = (id: string, file: File) => {
    setLogos((prev) =>
      prev.map((l) => (l.id === id ? { ...l, url: file } : l))
    );
    toast.success("Logo image updated!");
  };

  const handleBulkFiles = (files: FileList | File[]) => {
    const newLogos: TrustLogo[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      newLogos.push({ id: `logo-${Date.now()}-${Math.random()}`, url: file, alt: file.name });
    });
    setLogos((prev) => [...prev, ...newLogos]);
    toast.success(`${newLogos.length} logos added`);
    if (bulkInputRef.current) bulkInputRef.current.value = "";
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file.");
      return;
    }

    const toastId = toast.loading("Uploading video...");
    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.files?.length > 0) {
        setFormData({ ...formData, backgroundVideo: json.files[0] });
        toast.success("Video uploaded successfully!", { id: toastId });
      } else {
        throw new Error(json.error || "Upload failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to upload video", { id: toastId });
    }
  };

  const addEmptyLogo = () => {
    const newId = `logo-${Date.now()}`;
    setLogos((prev) => [...prev, { id: newId, url: "", alt: "" }]);
  };

  const removeLogo = (id: string) => {
    setLogos((prev) => prev.filter((l) => l.id !== id));
    toast.success("Logo removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const rawPayload = {
        ...formData,
        logos,
      };
      const payload = await uploadFilesDeep(rawPayload);

      if (payload.companyProfilePdf && typeof payload.companyProfilePdf === "string") {
        setFormData(prev => ({ ...prev, companyProfilePdf: payload.companyProfilePdf }));
      }
      if (payload.backgroundVideo && typeof payload.backgroundVideo === "string") {
        setFormData(prev => ({ ...prev, backgroundVideo: payload.backgroundVideo }));
      }
      if (payload.logos) {
        setLogos(payload.logos);
      }

      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("Hero section saved!");
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
        title="Hero Section"
        description="Manage homepage hero content — headings, CTAs, company profile PDF, background video, and trusted client logos marquee."
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

          {/* Heading */}
          <div className="space-y-3">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Main Heading</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Heading Line 1"
                value={formData.headingLine1}
                onChange={(e) => setFormData({ ...formData, headingLine1: e.target.value })}
                placeholder="e.g. Trusted Kirloskar Generator Dealer"
              />
              <InputField
                label="Heading Line 2"
                value={formData.headingLine2}
                onChange={(e) => setFormData({ ...formData, headingLine2: e.target.value })}
                placeholder="e.g. Certified Dealer for India's Power Needs"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Description</p>
            <InputField
              label="Desktop Description (single line)"
              value={formData.descriptionDesktop}
              onChange={(e) => setFormData({ ...formData, descriptionDesktop: e.target.value })}
              placeholder="Authorized Channel Distributor | ISO 9001:2015 | ..."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Mobile Line 1"
                value={formData.descriptionMobileLine1}
                onChange={(e) => setFormData({ ...formData, descriptionMobileLine1: e.target.value })}
              />
              <InputField
                label="Mobile Line 2"
                value={formData.descriptionMobileLine2}
                onChange={(e) => setFormData({ ...formData, descriptionMobileLine2: e.target.value })}
              />
              <InputField
                label="Mobile Line 3"
                value={formData.descriptionMobileLine3}
                onChange={(e) => setFormData({ ...formData, descriptionMobileLine3: e.target.value })}
              />
              <InputField
                label="Mobile Line 4"
                value={formData.descriptionMobileLine4}
                onChange={(e) => setFormData({ ...formData, descriptionMobileLine4: e.target.value })}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">CTA Buttons & Documents</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Primary Button Label"
                value={formData.ctaPrimaryLabel}
                onChange={(e) => setFormData({ ...formData, ctaPrimaryLabel: e.target.value })}
                placeholder="e.g. Explore Power Solutions"
              />
              <InputField
                label="Primary Button URL"
                value={formData.ctaPrimaryUrl}
                onChange={(e) => setFormData({ ...formData, ctaPrimaryUrl: e.target.value })}
                placeholder="e.g. /products"
              />
            </div>

            <InputField
              label="Secondary Button Label"
              value={formData.ctaSecondaryLabel}
              onChange={(e) => setFormData({ ...formData, ctaSecondaryLabel: e.target.value })}
              placeholder="e.g. Download Profile"
            />

            {/* Company Profile PDF */}
            <PDFUploadField
              label="Company Profile PDF Document (Download Profile button)"
              value={formData.companyProfilePdf}
              onChange={(val) => setFormData({ ...formData, companyProfilePdf: val })}
              tooltip="Upload company profile PDF downloaded when users click 'Download Profile'"
            />
          </div>

          {/* Background Video */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Background Video</p>
            <div className="flex flex-col gap-2">
              <InputField
                label="Background Video URL"
                value={typeof formData.backgroundVideo === "string" ? formData.backgroundVideo : formData.backgroundVideo.name}
                onChange={(e) => setFormData({ ...formData, backgroundVideo: e.target.value })}
                placeholder="e.g. https://cdn.example.com/hero-video.mp4"
                tooltip="MP4 video URL shown behind the hero content. You can upload one below or paste a URL directly."
              />
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition">
                  <Upload className="w-4 h-4" />
                  Upload Video File
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </label>
                {formData.backgroundVideo && typeof formData.backgroundVideo === "string" && formData.backgroundVideo.startsWith("http") && (
                  <p className="text-xs text-slate-500 font-medium truncate mt-2">
                    Current URL:{" "}
                    <a href={formData.backgroundVideo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {formData.backgroundVideo}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Trusted By Logos */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Trusted By Logos ({logos.length} client logos)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Upload client brand logos to display in the scrolling marquee banner
                </p>
              </div>
              <button
                type="button"
                onClick={() => bulkInputRef.current?.click()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Logos
              </button>
            </div>

            <div
              onClick={() => bulkInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.length) handleBulkFiles(e.dataTransfer.files);
              }}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100/80 flex flex-col items-center justify-center p-6 lg:p-8 transition-colors cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-3 text-[#2D6FBA] group-hover:scale-110 transition-transform">
                <CloudUpload className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-500 text-sm mb-1 text-center font-medium">
                <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">
                  Click to upload
                </span>
                or drag & drop client logo images
              </p>
              <p className="text-gray-400 text-xs text-center font-medium">
                PNG, JPG, SVG or WebP supported
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

            <div className="space-y-2.5">
              {logos.map((logo, idx) => (
                <div
                  key={logo.id}
                  className="bg-slate-50/70 border border-slate-200/70 rounded-2xl px-4 py-3 flex items-center justify-between transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {logo.url ? (
                        <img src={typeof logo.url === "string" ? logo.url : URL.createObjectURL(logo.url)} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {logo.url ? "Uploaded Logo" : `Client Logo #${idx + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {logo.url
                          ? typeof logo.url === "string" && logo.url.startsWith("data:")
                            ? "Local File"
                            : typeof logo.url !== "string" ? "Local File" : "Cloud / Remote"
                          : "No file uploaded"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <label className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#2D6FBA] hover:border-[#2D6FBA]/40 rounded-xl text-xs font-semibold cursor-pointer transition shadow-2xs">
                      {logo.url ? "Replace" : "Upload"}
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

                    <button
                      type="button"
                      onClick={() => removeLogo(logo.id)}
                      className="w-8 h-8 rounded-full border border-slate-200/80 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition cursor-pointer shadow-2xs"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
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
