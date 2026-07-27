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
import {
  Plus,
  Trash2,
  Upload,
  UploadCloud,
  X,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import { uploadFilesDeep } from "@/lib/uploadHelpers";

type TestimonialCard = {
  id: string;
  authorName: string;
  roleCompany: string;
  logo: string | File;
  quote: string;
};

type ClientLogo = {
  id: string;
  url: string | File;
  alt: string;
};

export default function TestimonialsStaticPageCMS() {
  const bulkLogoInputRef = useRef<HTMLInputElement>(null);

  // Section Open states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isLogosOpen, setIsLogosOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Saving states per section
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingGrid, setSavingGrid] = useState(false);
  const [savedGrid, setSavedGrid] = useState(false);

  const [savingLogos, setSavingLogos] = useState(false);
  const [savedLogos, setSavedLogos] = useState(false);

  const [savingStats, setSavingStats] = useState(false);
  const [savedStats, setSavedStats] = useState(false);

  // Hero Section
  const [heroHeadingLine1, setHeroHeadingLine1] = useState("");
  const [heroHeadingLine2, setHeroHeadingLine2] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroBgImage, setHeroBgImage] = useState<string | File>("");

  // Testimonials Cards Section Header & Filter
  const [storiesTitle, setStoriesTitle] = useState("");
  const [filterText, setFilterText] = useState("");

  // Testimonials Cards
  const [testimonials, setTestimonials] = useState<TestimonialCard[]>([]);

  // Client Logos Header & Array
  const [trustedTitle, setTrustedTitle] = useState("");
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);

  // Stats Section
  const [stat1Num, setStat1Num] = useState("");
  const [stat1Text, setStat1Text] = useState("");
  const [stat2Num, setStat2Num] = useState("");
  const [stat2Text, setStat2Text] = useState("");
  const [stat3Num, setStat3Num] = useState("");
  const [stat3Text, setStat3Text] = useState("");

  // Bottom CTA
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaDesc, setCtaDesc] = useState("");
  const [ctaBtnText, setCtaBtnText] = useState("");
  const [brochureBtnText, setBrochureBtnText] = useState("");
  const [whatsappText, setWhatsappText] = useState("");
  const [helplineLabel, setHelplineLabel] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [helplinePhone, setHelplinePhone] = useState("");
  const [brochurePdf, setBrochurePdf] = useState<string | File>("");

  // Load existing data from DB on mount
  useEffect(() => {
    fetchWithCache("/api/testimonials")
      .then((json) => {
        if (json.success && json.data) {
          const data = json.data["testimonials"] || json.data;

          if (data.heroHeadingLine1 !== undefined)
            setHeroHeadingLine1(data.heroHeadingLine1);
          if (data.heroHeadingLine2 !== undefined)
            setHeroHeadingLine2(data.heroHeadingLine2);
          if (data.heroSubtitle !== undefined)
            setHeroSubtitle(data.heroSubtitle);
          if (data.heroBgImage !== undefined) setHeroBgImage(data.heroBgImage);

          if (data.storiesTitle !== undefined)
            setStoriesTitle(data.storiesTitle);
          if (data.filterText !== undefined) setFilterText(data.filterText);
          if (data.trustedTitle !== undefined)
            setTrustedTitle(data.trustedTitle);

          if (Array.isArray(data.testimonials)) {
            setTestimonials(data.testimonials);
          }
          if (Array.isArray(data.clientLogos)) {
            setClientLogos(data.clientLogos);
          }

          if (data.stat1Num !== undefined) setStat1Num(data.stat1Num);
          if (data.stat1Text !== undefined) setStat1Text(data.stat1Text);
          if (data.stat2Num !== undefined) setStat2Num(data.stat2Num);
          if (data.stat2Text !== undefined) setStat2Text(data.stat2Text);
          if (data.stat3Num !== undefined) setStat3Num(data.stat3Num);
          if (data.stat3Text !== undefined) setStat3Text(data.stat3Text);

          if (data.ctaTitle !== undefined) setCtaTitle(data.ctaTitle);
          if (data.ctaDesc !== undefined) setCtaDesc(data.ctaDesc);
          if (data.ctaBtnText !== undefined) setCtaBtnText(data.ctaBtnText);
          if (data.brochureBtnText !== undefined)
            setBrochureBtnText(data.brochureBtnText);
          if (data.whatsappText !== undefined)
            setWhatsappText(data.whatsappText);
          if (data.helplineLabel !== undefined)
            setHelplineLabel(data.helplineLabel);
          if (data.whatsappPhone !== undefined)
            setWhatsappPhone(data.whatsappPhone);
          if (data.helplinePhone !== undefined)
            setHelplinePhone(data.helplinePhone);
          if (data.brochurePdf !== undefined) setBrochurePdf(data.brochurePdf);
        }
      })
      .catch(console.error);
  }, []);

  const saveAllToDB = async () => {
    const rawPayload = {
      heroHeadingLine1,
      heroHeadingLine2,
      heroSubtitle,
      heroBgImage,
      storiesTitle,
      filterText,
      trustedTitle,
      testimonials,
      clientLogos,
      stat1Num,
      stat1Text,
      stat2Num,
      stat2Text,
      stat3Num,
      stat3Text,
      ctaTitle,
      ctaDesc,
      ctaBtnText,
      brochureBtnText,
      whatsappText,
      helplineLabel,
      whatsappPhone,
      helplinePhone,
      brochurePdf,
    };

    const payload = await uploadFilesDeep(rawPayload);

    // sync state
    if (payload.heroBgImage && typeof payload.heroBgImage === "string") setHeroBgImage(payload.heroBgImage);
    if (payload.brochurePdf && typeof payload.brochurePdf === "string") setBrochurePdf(payload.brochurePdf);
    if (payload.testimonials) setTestimonials(payload.testimonials);
    if (payload.clientLogos) setClientLogos(payload.clientLogos);

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "testimonials", content: payload }),
    });

    if (!res.ok) throw new Error("Failed to save to database");
    clearCache("/api/testimonials");
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    try {
      await saveAllToDB();
      setSavedHero(true);
      toast.success("Hero section saved to Database!");
      setTimeout(() => setSavedHero(false), 2000);
    } catch {
      toast.error("Failed to save hero section");
    } finally {
      setSavingHero(false);
    }
  };

  const handleSaveGrid = async () => {
    setSavingGrid(true);
    try {
      await saveAllToDB();
      setSavedGrid(true);
      toast.success("Testimonial stories saved to Database!");
      setTimeout(() => setSavedGrid(false), 2000);
    } catch {
      toast.error("Failed to save testimonial stories");
    } finally {
      setSavingGrid(false);
    }
  };

  const handleSaveLogos = async () => {
    setSavingLogos(true);
    try {
      await saveAllToDB();
      setSavedLogos(true);
      toast.success("Trusted client logos saved to Database!");
      setTimeout(() => setSavedLogos(false), 2000);
    } catch {
      toast.error("Failed to save client logos");
    } finally {
      setSavingLogos(false);
    }
  };

  const handleSaveStats = async () => {
    setSavingStats(true);
    try {
      await saveAllToDB();
      setSavedStats(true);
      toast.success("Metrics & CTA section saved to Database!");
      setTimeout(() => setSavedStats(false), 2000);
    } catch {
      toast.error("Failed to save metrics & CTA");
    } finally {
      setSavingStats(false);
    }
  };

  const handleTestimonialChange = (
    id: string,
    field: keyof TestimonialCard,
    val: string | File,
  ) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: val } : t)),
    );
  };

  const addTestimonialCard = () => {
    setTestimonials((prev) => [
      ...prev,
      {
        id: `test-${Date.now()}`,
        authorName: "",
        roleCompany: "",
        logo: "",
        quote: "",
      },
    ]);
    toast.success("New testimonial added!");
  };

  const removeTestimonialCard = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial removed");
  };

  const handleLogoFileUpload = (id: string, file: File) => {
    setClientLogos((prev) =>
      prev.map((l) => (l.id === id ? { ...l, url: file } : l)),
    );
    toast.success("Logo image updated!");
  };

  const handleBulkLogoFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      setClientLogos((prev) => [
        ...prev,
        {
          id: `logo-${Date.now()}-${Math.random()}`,
          url: file,
          alt: file.name,
        },
      ]);
    });
    toast.success("Logos added successfully!");
  };

  const removeClientLogo = (id: string) => {
    setClientLogos((prev) => prev.filter((l) => l.id !== id));
    toast.success("Client logo removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Testimonials Static Page CMS (/about/Testimonials)"
        description="Manage customer reviews, hero banner, client stories, trusted partner logos, metrics & conversion callouts. Expand any section to edit its content."
      />

      {/* 1. Hero Banner Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Powering India's Success Stories')"
          description="Manage banner title, subtitle tagline & background showcase image."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Hero Heading Line 1"
                value={heroHeadingLine1}
                onChange={(e) => setHeroHeadingLine1(e.target.value)}
                placeholder="POWERING INDIA'S"
              />
              <InputField
                label="Hero Heading Line 2"
                value={heroHeadingLine2}
                onChange={(e) => setHeroHeadingLine2(e.target.value)}
                placeholder="SUCCESS STORIES"
              />
            </div>
            <InputField
              label="Hero Subtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
            />
            <ImageUploadField
              label="Hero Banner Background Image"
              value={heroBgImage}
              onChange={(val) => setHeroBgImage(val)}
            />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingHero}
                saved={savedHero}
                onClick={handleSaveHero}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Testimonial Stories Grid */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Client Success Stories (${testimonials.length} Testimonials)`}
          description="Manage customer testimonial cards (Author name, designation, company logo & quote)."
          isOpen={isGridOpen}
          onToggle={() => setIsGridOpen(!isGridOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isGridOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-slate-100">
              <InputField
                label="Section Title"
                value={storiesTitle}
                onChange={(e) => setStoriesTitle(e.target.value)}
                placeholder="Client Success Stories"
              />
              <InputField
                label="Filter Button Label"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter by industry..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={addTestimonialCard}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Testimonial Card
              </button>
            </div>

            <div className="space-y-4">
              {testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Testimonial #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTestimonialCard(t.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Author Name"
                      value={t.authorName}
                      onChange={(e) =>
                        handleTestimonialChange(
                          t.id,
                          "authorName",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. Khushi Aggarwal"
                    />
                    <InputField
                      label="Role / Designation / Company"
                      value={t.roleCompany}
                      onChange={(e) =>
                        handleTestimonialChange(
                          t.id,
                          "roleCompany",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. Founder, Platter Me Crazy"
                    />
                  </div>
                  <TextAreaField
                    label="Full Testimonial Quote / Story"
                    value={t.quote}
                    onChange={(e) =>
                      handleTestimonialChange(t.id, "quote", e.target.value)
                    }
                    rows={5}
                  />
                  <ImageUploadField
                    label="Client Logo Image"
                    value={t.logo}
                    onChange={(val) =>
                      handleTestimonialChange(t.id, "logo", val)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingGrid}
                saved={savedGrid}
                onClick={handleSaveGrid}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Trusted Client Logos Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. Trusted Partner & Client Logos (${clientLogos.length} client logos)`}
          description="Manage scrolling brand logos shown in the 'Trusted by India's Leading Organizations' section."
          isOpen={isLogosOpen}
          onToggle={() => setIsLogosOpen(!isLogosOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isLogosOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <InputField
              label="Section Main Heading"
              value={trustedTitle}
              onChange={(e) => setTrustedTitle(e.target.value)}
              placeholder="Trusted by India's Leading Organizations"
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Trusted By Logos ({clientLogos.length} client logos)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Upload client brand logos to display in the scrolling marquee
                  banner
                </p>
              </div>
              <button
                type="button"
                onClick={() => bulkLogoInputRef.current?.click()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Logos
              </button>
            </div>

            {/* Drag & Drop Bulk Uploader Banner */}
            <div
              onClick={() => bulkLogoInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.length)
                  handleBulkLogoFiles(e.dataTransfer.files);
              }}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100/80 flex flex-col items-center justify-center p-6 lg:p-8 transition-colors cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-3 text-[#2D6FBA] group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-500 text-sm mb-1 text-center font-medium">
                <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">
                  Click to upload
                </span>{" "}
                or drag & drop client logo images
              </p>
              <p className="text-gray-400 text-xs text-center font-medium">
                PNG, JPG, SVG or WebP supported
              </p>
            </div>

            <input
              ref={bulkLogoInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) =>
                e.target.files && handleBulkLogoFiles(e.target.files)
              }
            />

            {/* List of uploaded logos */}
            <div className="space-y-2.5">
              {clientLogos.map((logo, idx) => (
                <div
                  key={logo.id}
                  className="bg-slate-50/70 border border-slate-200/70 rounded-2xl px-4 py-3 flex items-center justify-between transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {logo.url ? (
                        <img
                          src={typeof logo.url === "string" ? logo.url : URL.createObjectURL(logo.url)}
                          alt="Client Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {logo.alt || `Client Logo #${idx + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {logo.url
                          ? typeof logo.url === "string"
                            ? logo.url.startsWith("data:")
                              ? "Local File"
                              : "Cloud / Remote"
                            : "Local File"
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
                          if (file) handleLogoFileUpload(logo.id, file);
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => removeClientLogo(logo.id)}
                      className="w-8 h-8 rounded-full border border-slate-200/80 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition cursor-pointer shadow-2xs"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingLogos}
                saved={savedLogos}
                onClick={handleSaveLogos}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Statistics & CTA Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="4. Key Metrics & Bottom CTA Banner"
          description="Manage 3 metric stats (100+ Video Testimonials, etc.), CTA title & hotline phone numbers."
          isOpen={isStatsOpen}
          onToggle={() => setIsStatsOpen(!isStatsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isStatsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <InputField
                  label="Stat 1 Number"
                  value={stat1Num}
                  onChange={(e) => setStat1Num(e.target.value)}
                />
                <InputField
                  label="Stat 1 Label"
                  value={stat1Text}
                  onChange={(e) => setStat1Text(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <InputField
                  label="Stat 2 Number"
                  value={stat2Num}
                  onChange={(e) => setStat2Num(e.target.value)}
                />
                <InputField
                  label="Stat 2 Label"
                  value={stat2Text}
                  onChange={(e) => setStat2Text(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <InputField
                  label="Stat 3 Number"
                  value={stat3Num}
                  onChange={(e) => setStat3Num(e.target.value)}
                />
                <InputField
                  label="Stat 3 Label"
                  value={stat3Text}
                  onChange={(e) => setStat3Text(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100">
              <InputField
                label="Bottom CTA Title"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
              />
              <TextAreaField
                label="Bottom CTA Description"
                value={ctaDesc}
                onChange={(e) => setCtaDesc(e.target.value)}
                rows={2}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Request Consultation Button Label"
                  value={ctaBtnText}
                  onChange={(e) => setCtaBtnText(e.target.value)}
                  placeholder="Request Consultation"
                />
                <InputField
                  label="Download Brochure Button Label"
                  value={brochureBtnText}
                  onChange={(e) => setBrochureBtnText(e.target.value)}
                  placeholder="Download Brochure"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="WhatsApp Support Label"
                  value={whatsappText}
                  onChange={(e) => setWhatsappText(e.target.value)}
                  placeholder="WhatsApp Support"
                />
                <InputField
                  label="Helpline Label"
                  value={helplineLabel}
                  onChange={(e) => setHelplineLabel(e.target.value)}
                  placeholder="Helpline"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="WhatsApp Support Phone"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                />
                <InputField
                  label="Helpline Phone"
                  value={helplinePhone}
                  onChange={(e) => setHelplinePhone(e.target.value)}
                />
              </div>
              <PDFUploadField
                label="Download Brochure PDF File"
                value={brochurePdf}
                onChange={(val) => setBrochurePdf(val)}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingStats}
                saved={savedStats}
                onClick={handleSaveStats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
