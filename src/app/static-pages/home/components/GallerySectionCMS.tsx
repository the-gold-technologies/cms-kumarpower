"use client";

import { useState, useRef, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { CloudUpload, Plus, X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

type GalleryImage = { id: string; url: string; caption: string };

interface GallerySectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function GallerySectionCMS({
  saveUrl = "/api/home",
  responseKey = "gallery",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: GallerySectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const gal = responseKey ? json.data?.[responseKey] : json.data;
          if (gal) {
            if (gal.title !== undefined) setTitle(gal.title);
            if (gal.subtitle !== undefined) setSubtitle(gal.subtitle);
            if (Array.isArray(gal.images)) setImages(gal.images);
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleFileUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, url: result } : img)));
      toast.success("Image updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleBulkFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages((prev) => [
          ...prev,
          { id: `img-${Date.now()}-${Math.random()}`, url: result, caption: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
    toast.success("Gallery images uploaded!");
  };

  const addImageSlot = () => {
    const newId = `img-${Date.now()}`;
    setImages((prev) => [...prev, { id: newId, url: "", caption: `Gallery image ${prev.length + 1}` }]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { title, subtitle, images };
      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("Gallery section saved!");
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
        title="Photo Gallery Section"
        description="Manage the Photo Gallery title, description, and upload multiple gallery showcase photos."
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
          <InputField
            label="Gallery Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Photo Gallery"
          />

          <TextAreaField
            label="Gallery Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
          />

          {/* Bulk Dropzone */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Gallery Photos ({images.length} photos)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Photos displayed in the responsive masonry grid
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Upload Photos
              </button>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
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
                or drag & drop gallery photo files
              </p>
              <p className="text-gray-400 text-xs text-center font-medium">
                PNG, JPG, SVG or WebP supported
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleBulkFiles(e.target.files)}
            />

            {/* List of uploaded gallery images matching exact design */}
            <div className="space-y-2.5">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="bg-slate-50/70 border border-slate-200/70 rounded-2xl px-4 py-3 flex items-center justify-between transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {img.url ? (
                        <img src={img.url} alt="Gallery Photo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {img.url ? (img.caption || "Uploaded Image") : `Gallery Photo #${idx + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {img.url
                          ? img.url.startsWith("data:")
                            ? "Local File"
                            : "Cloud / Remote"
                          : "No file uploaded"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <label className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#2D6FBA] hover:border-[#2D6FBA]/40 rounded-xl text-xs font-semibold cursor-pointer transition shadow-2xs">
                      {img.url ? "Replace" : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(img.id, file);
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
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
