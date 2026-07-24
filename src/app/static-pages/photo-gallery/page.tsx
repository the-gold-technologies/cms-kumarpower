"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, Upload, UploadCloud, X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

type GalleryPhoto = {
  id: string;
  alt: string;
  category: "installations" | "events" | "Award";
  src: string;
};

export default function PhotoGalleryStaticPageCMS() {
  const bulkPhotoInputRef = useRef<HTMLInputElement>(null);

  // Accordion states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);

  // Section saving states
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingPhotos, setSavingPhotos] = useState(false);
  const [savedPhotos, setSavedPhotos] = useState(false);

  const [savingExp, setSavingExp] = useState(false);
  const [savedExp, setSavedExp] = useState(false);

  // Hero Section
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "A visual showcase of our installations, innovations, and industrial excellence across India"
  );
  const [heroBgImage, setHeroBgImage] = useState("");

  // Gallery Photos
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [seeMoreLabel, setSeeMoreLabel] = useState("");
  const [showLessLabel, setShowLessLabel] = useState("");

  // Experience Power Excellence Section
  const [expTitle, setExpTitle] = useState("");
  const [expDesc, setExpDesc] = useState(
    "Ready to transform your power infrastructure with industry-leading generator solutions? Our team of experts is ready to guide you through every step."
  );
  const [expImage, setExpImage] = useState("");
  const [expProfilePdf, setExpProfilePdf] = useState("");
  const [expBtn1Label, setExpBtn1Label] = useState("");
  const [expBtn1Url, setExpBtn1Url] = useState("");
  const [expBtn2Label, setExpBtn2Label] = useState("");
  const [expBtn2Url, setExpBtn2Url] = useState("");

  const handlePhotoChange = (id: string, field: keyof GalleryPhoto, val: string) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const addPhoto = () => {
    setPhotos((prev) => [
      ...prev,
      { id: `g-${Date.now()}`, alt: "", category: "installations", src: "" },
    ]);
    toast.success("New gallery photo slot added!");
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Photo removed");
  };

  const handleBulkPhotoUpload = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotos((prev) => [
          ...prev,
          { id: `g-${Date.now()}-${Math.random()}`, alt: file.name, category: "installations", src: result },
        ]);
      };
      reader.readAsDataURL(file);
    });
    toast.success("Photos added successfully!");
  };

  // Fetch from DB on mount
  useEffect(() => {
    fetchWithCache("/api/photo-gallery")
      .then((json) => {
        if (json.success && json.data) {
          const data = json.data["photo-gallery"] || json.data;
          if (data.hero) {
            setHeroHeading(data.hero.heading || "");
            setHeroSubtitle(data.hero.subtitle || "");
            setHeroBgImage(data.hero.bgImage || "");
          }
          if (data.photos) {
            setPhotos(data.photos);
          }
          if (data.seeMoreLabel) setSeeMoreLabel(data.seeMoreLabel);
          if (data.showLessLabel) setShowLessLabel(data.showLessLabel);
          if (data.experience) {
            setExpTitle(data.experience.title || "");
            setExpDesc(data.experience.description || "");
            setExpImage(data.experience.bgImage || "");
            setExpProfilePdf(data.experience.profilePdf || "");
            setExpBtn1Label(data.experience.btn1Label || "");
            setExpBtn1Url(data.experience.btn1Url || "");
            setExpBtn2Label(data.experience.btn2Label || "");
            setExpBtn2Url(data.experience.btn2Url || "");
          }
        }
      })
      .catch(console.error);
  }, []);

  const handleSaveHero = async () => {
    setSavingHero(true);
    try {
      const payload = {
        hero: { heading: heroHeading, subtitle: heroSubtitle, bgImage: heroBgImage },
        photos,
        seeMoreLabel, showLessLabel,
        experience: { title: expTitle, description: expDesc, bgImage: expImage, profilePdf: expProfilePdf, btn1Label: expBtn1Label, btn1Url: expBtn1Url, btn2Label: expBtn2Label, btn2Url: expBtn2Url },
      };
      await fetch("/api/photo-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "photo-gallery", content: payload }),
      });
      clearCache("/api/photo-gallery");
      setSavedHero(true);
      toast.success("Hero section saved to Database!");
      setTimeout(() => setSavedHero(false), 2000);
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setSavingHero(false);
    }
  };

  const handleSavePhotos = async () => {
    setSavingPhotos(true);
    try {
      const payload = {
        hero: { heading: heroHeading, subtitle: heroSubtitle, bgImage: heroBgImage },
        photos,
        seeMoreLabel, showLessLabel,
        experience: { title: expTitle, description: expDesc, bgImage: expImage, profilePdf: expProfilePdf, btn1Label: expBtn1Label, btn1Url: expBtn1Url, btn2Label: expBtn2Label, btn2Url: expBtn2Url },
      };
      await fetch("/api/photo-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "photo-gallery", content: payload }),
      });
      clearCache("/api/photo-gallery");
      setSavedPhotos(true);
      toast.success("Photo gallery items saved to Database!");
      setTimeout(() => setSavedPhotos(false), 2000);
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setSavingPhotos(false);
    }
  };

  const handleSaveExp = async () => {
    setSavingExp(true);
    try {
      const payload = {
        hero: { heading: heroHeading, subtitle: heroSubtitle, bgImage: heroBgImage },
        photos,
        seeMoreLabel, showLessLabel,
        experience: { title: expTitle, description: expDesc, bgImage: expImage, profilePdf: expProfilePdf, btn1Label: expBtn1Label, btn1Url: expBtn1Url, btn2Label: expBtn2Label, btn2Url: expBtn2Url },
      };
      await fetch("/api/photo-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "photo-gallery", content: payload }),
      });
      clearCache("/api/photo-gallery");
      setSavedExp(true);
      toast.success("Experience section saved to Database!");
      setTimeout(() => setSavedExp(false), 2000);
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setSavingExp(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Photo Gallery Static Page CMS (/about/PhotoGallery)"
        description="Manage legacy photo gallery photos, categories (Installations, Events, Award Ceremony), hero banner & company profile PDF. Expand any section to edit its content."
      />

      {/* 1. Hero Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Explore Our Legacy in Action')"
          description="Manage main heading, subtitle tagline & warehouse banner image."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Main Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <TextAreaField label="Subtitle Tagline" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Image" value={heroBgImage} onChange={(val) => setHeroBgImage(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Photo Gallery Grid */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Photo Gallery Items (${photos.length} Photos)`}
          description="Upload high-res photos and select category tags (Installations, Events, Award Ceremony)."
          isOpen={isPhotosOpen}
          onToggle={() => setIsPhotosOpen(!isPhotosOpen)}
        />
        <div className={`grid transition-all duration-300 ${isPhotosOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Bulk Photo Upload
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Upload multiple photos at once or edit individual slots below
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => bulkPhotoInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" /> Bulk Upload
                </button>
                <button
                  type="button"
                  onClick={addPhoto}
                  className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Slot
                </button>
              </div>
            </div>

            {/* Bulk Upload Banner */}
            <div
              onClick={() => bulkPhotoInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.length) handleBulkPhotoUpload(e.dataTransfer.files);
              }}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100/80 flex flex-col items-center justify-center p-6 transition-colors cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-2 text-[#2D6FBA] group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-500 text-sm mb-1 text-center font-medium">
                <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">Click to upload</span> or drag & drop gallery images
              </p>
              <p className="text-gray-400 text-xs text-center font-medium">PNG, JPG or WebP supported</p>
            </div>

            <input
              ref={bulkPhotoInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleBulkPhotoUpload(e.target.files)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {photos.map((p, idx) => (
                <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Photo #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removePhoto(p.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <InputField label="Photo Title / Caption" value={p.alt} onChange={(e) => handlePhotoChange(p.id, "alt", e.target.value)} placeholder="e.g. Kirloskar DG Set Installation" />
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Filter Category</label>
                    <select
                      value={p.category}
                      onChange={(e) => handlePhotoChange(p.id, "category", e.target.value as any)}
                      className="p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="installations">Installations</option>
                      <option value="events">Events</option>
                      <option value="Award">Award Ceremony</option>
                    </select>
                  </div>
                  <ImageUploadField label="Photo File Upload" value={p.src} onChange={(val) => handlePhotoChange(p.id, "src", val)} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingPhotos} saved={savedPhotos} onClick={handleSavePhotos} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Experience Power Excellence Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Experience Power Excellence Section & Company Profile PDF"
          description="Manage section heading, description copy, showcase image & downloadable Company Profile PDF."
          isOpen={isExpOpen}
          onToggle={() => setIsExpOpen(!isExpOpen)}
        />
        <div className={`grid transition-all duration-300 ${isExpOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Section Heading" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} />
            <TextAreaField label="Description Copy" value={expDesc} onChange={(e) => setExpDesc(e.target.value)} rows={2} />
            <ImageUploadField label="Showcase Graphic Image" value={expImage} onChange={(val) => setExpImage(val)} />
            <PDFUploadField label="Company Profile PDF File (Download button)" value={expProfilePdf} onChange={(val) => setExpProfilePdf(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingExp} saved={savedExp} onClick={handleSaveExp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
