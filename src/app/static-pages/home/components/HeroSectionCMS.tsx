"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { InputField } from "@/components/InputField";
import { Video, Trash2, CheckCircle2, ExternalLink, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

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
  const onToggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isMobileUploading, setIsMobileUploading] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const mobileVideoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    backgroundVideo: string;
    mobileBackgroundVideo: string;
  }>({
    backgroundVideo: "",
    mobileBackgroundVideo: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json: any) => {
        if (json.success && json.data) {
          const hero = responseKey ? json.data?.[responseKey] : json.data;
          if (hero && typeof hero === "object") {
            setFormData({
              backgroundVideo: hero.backgroundVideo || "",
              mobileBackgroundVideo: hero.mobileBackgroundVideo || "",
            });
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file (MP4, WebM, etc.).");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      toast.error(
        `Video file size is too big (${sizeMb}MB). Maximum allowed limit is 100MB. Please reduce it to under 100MB.`
      );
      if (videoInputRef.current) videoInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading hero background video...");
    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.files?.length > 0) {
        setFormData((prev) => ({ ...prev, backgroundVideo: json.files[0] }));
        toast.success("Desktop video uploaded successfully!", { id: toastId });
      } else {
        throw new Error(json.error || "Upload failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to upload video", { id: toastId });
    } finally {
      setIsUploading(false);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };

  const handleMobileVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file (MP4, WebM, etc.).");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      toast.error(
        `Video file size is too big (${sizeMb}MB). Maximum allowed limit is 100MB. Please reduce it to under 100MB.`
      );
      if (mobileVideoInputRef.current) mobileVideoInputRef.current.value = "";
      return;
    }

    setIsMobileUploading(true);
    const toastId = toast.loading("Uploading mobile background video...");
    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.success && json.files?.length > 0) {
        setFormData((prev) => ({ ...prev, mobileBackgroundVideo: json.files[0] }));
        toast.success("Mobile video uploaded successfully!", { id: toastId });
      } else {
        throw new Error(json.error || "Upload failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to upload mobile video", { id: toastId });
    } finally {
      setIsMobileUploading(false);
      if (mobileVideoInputRef.current) mobileVideoInputRef.current.value = "";
    }
  };

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
      toast.success("Hero section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save hero section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="1. Hero Section (Full-Screen Video)"
        description="Manage the full-screen background video journey displayed at the top of the landing page for Desktop, Tablet, and Mobile."
        isOpen={isOpen}
        onToggle={onToggle}
      />

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-8 pt-1">
          {/* Desktop & Tablet Background Video Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Desktop & Tablet Background Video
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload a 16:9 landscape MP4 video or provide a direct video URL for desktop and tablet screens.
                </p>
              </div>
            </div>

            <InputField
              label="Desktop Background Video URL"
              value={formData.backgroundVideo}
              onChange={(e) => setFormData((prev) => ({ ...prev, backgroundVideo: e.target.value }))}
              placeholder="e.g. /background.mp4 or https://your-cdn.com/hero.mp4"
              tooltip="Direct URL to the video file or relative path"
            />

            {/* Desktop Video Upload Area */}
            <div
              onClick={() => videoInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 hover:border-[#2D6FBA]/50 rounded-xl bg-gray-50 hover:bg-blue-50/20 flex flex-col items-center justify-center p-8 transition-colors cursor-pointer group"
            >
              <div className="p-3.5 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-3 text-[#2D6FBA] group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-700 text-sm mb-1 text-center font-medium">
                <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">
                  {isUploading ? "Uploading video..." : "Click to upload desktop video file"}
                </span>
                or drag & drop
              </p>
              <p className="text-gray-400 text-xs text-center">
                MP4, WebM or OGG format supported (Recommended: 16:9 Landscape MP4)
              </p>
            </div>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />

            {/* Desktop Video Preview Link */}
            {formData.backgroundVideo && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2D6FBA] shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-800">Current Desktop Video</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3" />
                        Uploaded / Set
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5 max-w-md">
                      {formData.backgroundVideo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={formData.backgroundVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-[#2D6FBA] text-slate-700 hover:text-[#2D6FBA] text-xs font-semibold rounded-lg shadow-2xs transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Preview Link
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, backgroundVideo: "" }))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg shadow-2xs transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Background Video (Portrait) Section */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                    Mobile Background Video (Portrait)
                  </p>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                    Mobile Specific
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload a 9:16 vertical/portrait video specifically optimized for mobile phones. If left empty, desktop video will be used.
                </p>
              </div>
            </div>

            <InputField
              label="Mobile Background Video URL"
              value={formData.mobileBackgroundVideo}
              onChange={(e) => setFormData((prev) => ({ ...prev, mobileBackgroundVideo: e.target.value }))}
              placeholder="e.g. /mobile-background.mp4 or https://your-cdn.com/mobile-hero.mp4"
              tooltip="Direct URL to the mobile portrait video file or relative path"
            />

            {/* Mobile Video Upload Area */}
            <div
              onClick={() => mobileVideoInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 hover:border-[#2D6FBA]/50 rounded-xl bg-gray-50 hover:bg-blue-50/20 flex flex-col items-center justify-center p-8 transition-colors cursor-pointer group"
            >
              <div className="p-3.5 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-3 text-[#2D6FBA] group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-700 text-sm mb-1 text-center font-medium">
                <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">
                  {isMobileUploading ? "Uploading mobile video..." : "Click to upload mobile portrait video"}
                </span>
                or drag & drop
              </p>
              <p className="text-gray-400 text-xs text-center">
                MP4, WebM or OGG format supported (Recommended: 9:16 Vertical / Portrait MP4)
              </p>
            </div>

            <input
              ref={mobileVideoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleMobileVideoUpload}
            />

            {/* Mobile Video Preview Link */}
            {formData.mobileBackgroundVideo && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2D6FBA] shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-800">Current Mobile Video</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3" />
                        Uploaded / Set
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5 max-w-md">
                      {formData.mobileBackgroundVideo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={formData.mobileBackgroundVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-[#2D6FBA] text-slate-700 hover:text-[#2D6FBA] text-xs font-semibold rounded-lg shadow-2xs transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Preview Link
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, mobileBackgroundVideo: "" }))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg shadow-2xs transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
