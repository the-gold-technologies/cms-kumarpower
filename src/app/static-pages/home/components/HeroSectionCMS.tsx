"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { InputField } from "@/components/InputField";
import { Upload, Video, Trash2, CheckCircle2, Play, ExternalLink } from "lucide-react";
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
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    backgroundVideo: string;
  }>({
    backgroundVideo: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const hero = responseKey ? json.data?.[responseKey] : json.data;
          if (hero && typeof hero === "object") {
            setFormData({
              backgroundVideo: hero.backgroundVideo || "",
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
        setFormData({ backgroundVideo: json.files[0] });
        toast.success("Video uploaded successfully!", { id: toastId });
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
        description="Manage the full-screen background video journey displayed at the top of the landing page."
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
          {/* Background Video Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Hero Background Video
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload an MP4 video or provide a direct video URL for the landing page hero.
                </p>
              </div>
            </div>

            <InputField
              label="Background Video URL"
              value={formData.backgroundVideo}
              onChange={(e) => setFormData({ backgroundVideo: e.target.value })}
              placeholder="e.g. /background.mp4 or https://your-cdn.com/hero.mp4"
              tooltip="Direct URL to the video file or relative path"
            />

            {/* Video Upload Area */}
            <div
              onClick={() => videoInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 hover:border-[#2D6FBA]/50 rounded-xl bg-gray-50 hover:bg-blue-50/20 flex flex-col items-center justify-center p-8 transition-colors cursor-pointer group"
            >
              <div className="p-3.5 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-3 text-[#2D6FBA] group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-700 text-sm mb-1 text-center font-medium">
                <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">
                  {isUploading ? "Uploading video..." : "Click to upload video file"}
                </span>
                or drag & drop
              </p>
              <p className="text-gray-400 text-xs text-center">
                MP4, WebM or OGG format supported (Recommended: High-bitrate optimized MP4)
              </p>
            </div>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />

            {/* Video Preview Link */}
            {formData.backgroundVideo && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2D6FBA] shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-800">Current Video</span>
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
                    onClick={() => setFormData({ backgroundVideo: "" })}
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

