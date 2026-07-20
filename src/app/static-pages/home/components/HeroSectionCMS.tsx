"use client";

import { useState, useRef } from "react";
import { InputField } from "@/components/InputField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, X, Upload, UploadCloud, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

type TrustLogo = { id: string; url: string; alt: string };

const INITIAL_LOGOS: TrustLogo[] = [
  { id: "logo-1", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg", alt: "Client Logo 1" },
  { id: "logo-2", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg", alt: "Client Logo 2" },
  { id: "logo-3", url: "", alt: "Client Logo 3" },
];

export function HeroSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    headingLine1: "Trusted Kirloskar Generator Dealer",
    headingLine2: "Certified Dealer for India's Power Needs",
    descriptionDesktop:
      "Authorized Channel Distributor | ISO 9001:2015 | 500+ Enterprise Clients | 30+ Years of Uninterrupted Excellence",
    descriptionMobileLine1: "Authorized Channel Distributor",
    descriptionMobileLine2: "ISO 9001:2015",
    descriptionMobileLine3: "500+ Enterprise Clients",
    descriptionMobileLine4: "30+ Years of Excellence",
    ctaPrimaryLabel: "Explore Power Solutions",
    ctaPrimaryUrl: "/products",
    ctaSecondaryLabel: "Download Profile",
    companyProfilePdf: "",
    trustedByLabel: "TRUSTED BY",
    backgroundVideo: "",
  });

  const [logos, setLogos] = useState<TrustLogo[]>(INITIAL_LOGOS);

  const handleFileUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogos((prev) =>
        prev.map((l) => (l.id === id ? { ...l, url: result } : l))
      );
      toast.success("Logo image updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleBulkFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogos((prev) => [
          ...prev,
          { id: `logo-${Date.now()}-${Math.random()}`, url: result, alt: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
    toast.success("Logos added successfully!");
  };

  const addEmptyLogo = () => {
    const newId = `logo-${Date.now()}`;
    setLogos((prev) => [...prev, { id: newId, url: "", alt: "" }]);
  };

  const removeLogo = (id: string) => {
    setLogos((prev) => prev.filter((l) => l.id !== id));
    toast.success("Logo removed");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
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
            <InputField
              label="Background Video URL"
              value={formData.backgroundVideo}
              onChange={(e) => setFormData({ ...formData, backgroundVideo: e.target.value })}
              placeholder="e.g. https://cdn.example.com/hero-video.mp4"
              tooltip="MP4 video URL shown behind the hero content"
            />
          </div>

          {/* Trusted By Logos - Screenshot Design Format */}
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

            {/* Drag & Drop Bulk Uploader Banner matching standard ImageUploadField */}
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

            {/* List of uploaded logos matching screenshot format */}
            <div className="space-y-2.5">
              {logos.map((logo, idx) => (
                <div
                  key={logo.id}
                  className="bg-slate-50/70 border border-slate-200/70 rounded-2xl px-4 py-3 flex items-center justify-between transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {logo.url ? (
                        <img src={logo.url} alt="Client Logo" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {logo.url ? "Uploaded Image" : `Client Logo #${idx + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {logo.url
                          ? logo.url.startsWith("data:")
                            ? "Local File"
                            : "Cloud / Remote"
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

                    {/* Circular close button matching screenshot */}
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
