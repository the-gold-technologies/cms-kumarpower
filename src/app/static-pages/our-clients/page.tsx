"use client";

import { useState, useEffect, useRef } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  Plus,
  Trash2,
  Upload,
  UploadCloud,
  X,
  Image as ImageIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { uploadFile } from "@/lib/uploadHelpers";

type ClientLogo = {
  id: string;
  url: string;
  alt: string;
  category?: string;
};

type ClientItem = {
  id: string;
  name: string;
  category: string;
  logo?: string;
};

export default function OurClientsStaticPageCMS() {
  const bulkLogoInputRef = useRef<HTMLInputElement>(null);
  const bulkClientLogoRef = useRef<HTMLInputElement>(null);

  // Section 3 Search, Filter & Pagination states
  const [clientSearch, setClientSearch] = useState("");
  const [clientCategoryFilter, setClientCategoryFilter] = useState("ALL");
  const [clientPage, setClientPage] = useState(1);
  const [uploadingClientId, setUploadingClientId] = useState<string | null>(null);
  const [isBulkUploadingClients, setIsBulkUploadingClients] = useState(false);
  const itemsPerPage = 20;

  // Accordion states
  const [isHeroOpen, setIsHeroOpen] = useState(true);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isLogosOpen, setIsLogosOpen] = useState(false);
  const [isClientsOpen, setIsClientsOpen] = useState(false);

  // Section saving states
  const [savingStats, setSavingStats] = useState(false);
  const [savedStats, setSavedStats] = useState(false);

  const [savingLogos, setSavingLogos] = useState(false);
  const [savedLogos, setSavedLogos] = useState(false);

  const [savingClients, setSavingClients] = useState(false);
  const [savedClients, setSavedClients] = useState(false);

  // Stats Metrics
  const [stat1Num, setStat1Num] = useState("");
  const [stat1Text, setStat1Text] = useState("");
  const [stat2Num, setStat2Num] = useState("");
  const [stat2Text, setStat2Text] = useState("");
  const [stat3Num, setStat3Num] = useState("");
  const [stat3Text, setStat3Text] = useState("");

  // Hero & Section Titles
  const [heroHeading, setHeroHeading] = useState("");
  const [heroDesc, setHeroDesc] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  const [esteemedTitle, setEsteemedTitle] = useState("");
  const [prestigiousTitle, setPrestigiousTitle] = useState("");
  const [prestigiousDesc, setPrestigiousDesc] = useState("");

  // Client Logos & Portfolio
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [clients, setClients] = useState<ClientItem[]>([]);

  useEffect(() => {
    fetchWithCache("/api/our-clients")
      .then((json) => {
        if (json.success && json.data) {
          const data = json.data["our-clients"] || json.data;
          if (data.stat1Num !== undefined) setStat1Num(data.stat1Num);
          if (data.stat1Text !== undefined) setStat1Text(data.stat1Text);
          if (data.stat2Num !== undefined) setStat2Num(data.stat2Num);
          if (data.stat2Text !== undefined) setStat2Text(data.stat2Text);
          if (data.stat3Num !== undefined) setStat3Num(data.stat3Num);
          if (data.stat3Text !== undefined) setStat3Text(data.stat3Text);
          
          if (data.heroHeading !== undefined) setHeroHeading(data.heroHeading);
          if (data.heroDesc !== undefined) setHeroDesc(data.heroDesc);
          if (data.heroImage !== undefined) setHeroImage(data.heroImage);
          if (data.heroCtaText !== undefined) setHeroCtaText(data.heroCtaText);
          if (data.esteemedTitle !== undefined) setEsteemedTitle(data.esteemedTitle);
          if (data.prestigiousTitle !== undefined) setPrestigiousTitle(data.prestigiousTitle);
          if (data.prestigiousDesc !== undefined) setPrestigiousDesc(data.prestigiousDesc);

          if (Array.isArray(data.logos)) setLogos(data.logos);
          if (Array.isArray(data.clients)) setClients(data.clients);
        }
      })
      .catch(console.error);
  }, []);

  const saveAllToDB = async () => {
    const payload = {
      stat1Num,
      stat1Text,
      stat2Num,
      stat2Text,
      stat3Num,
      stat3Text,
      heroHeading,
      heroDesc,
      heroImage,
      heroCtaText,
      esteemedTitle,
      prestigiousTitle,
      prestigiousDesc,
      logos,
      clients,
    };
    const res = await fetch("/api/our-clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "our-clients", content: payload }),
    });
    if (!res.ok) throw new Error("Save failed");
    clearCache("/api/our-clients");
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setHeroImage(event.target?.result as string);
      toast.success("Hero image selected! Don't forget to save.");
    };
    reader.readAsDataURL(file);
  };

  const handleBulkLogoFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogos((prev) => [
          ...prev,
          {
            id: `logo-${Date.now()}-${Math.random()}`,
            url: result,
            alt: file.name,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
    toast.success("Client logos added successfully!");
  };

  const handleLogoFileUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogos((prev) =>
        prev.map((l) => (l.id === id ? { ...l, url: result } : l)),
      );
      toast.success("Logo image updated!");
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = (id: string) => {
    setLogos((prev) => prev.filter((l) => l.id !== id));
    toast.success("Logo removed");
  };

  const handleClientChange = (
    id: string,
    field: keyof ClientItem,
    val: string,
  ) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c)),
    );
  };

  const addClient = () => {
    setClients((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, name: "", category: "Industries", logo: "" },
    ]);
    toast.success("New client entry added!");
  };

  const removeClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    toast.success("Client entry removed");
  };

  const handleClientLogoUpload = async (id: string, file: File) => {
    setUploadingClientId(id);
    try {
      const url = await uploadFile(file);
      if (url) {
        handleClientChange(id, "logo", url);
        toast.success("Client logo uploaded! Remember to save.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload logo");
    } finally {
      setUploadingClientId(null);
    }
  };

  const handleBulkClientLogos = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileArray.length === 0) return;

    setIsBulkUploadingClients(true);
    let matched = 0;
    try {
      for (const file of fileArray) {
        const baseName = file.name.replace(/\.[^/.]+$/, "").trim().toLowerCase();
        // find matching client by company name
        const found = clients.find((c) => {
          const cn = c.name.toLowerCase();
          return cn.includes(baseName) || baseName.includes(cn.split(" ")[0].toLowerCase());
        });

        if (found) {
          const url = await uploadFile(file);
          if (url) {
            handleClientChange(found.id, "logo", url);
            matched++;
          }
        }
      }
      if (matched > 0) {
        toast.success(`Matched and uploaded ${matched} client logo(s)! Don't forget to save.`);
      } else {
        toast.error("No client names matched the uploaded filenames.");
      }
    } catch (err: any) {
      toast.error("Bulk upload error: " + err.message);
    } finally {
      setIsBulkUploadingClients(false);
    }
  };

  const handleSaveStats = async () => {
    setSavingStats(true);
    try {
      await saveAllToDB();
      setSavedStats(true);
      toast.success("Stats saved!");
      setTimeout(() => setSavedStats(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setSavingStats(false);
    }
  };

  const handleSaveLogos = async () => {
    setSavingLogos(true);
    try {
      await saveAllToDB();
      setSavedLogos(true);
      toast.success("Logos saved!");
      setTimeout(() => setSavedLogos(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setSavingLogos(false);
    }
  };

  const handleSaveClients = async () => {
    setSavingClients(true);
    try {
      await saveAllToDB();
      setSavedClients(true);
      toast.success("Clients saved!");
      setTimeout(() => setSavedClients(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setSavingClients(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Our Clients Static Page CMS (/about/OurClients)"
        description="Manage 500+ enterprise client portfolio logos, industry categories & achievement counter stats. Expand any section to edit its content."
      />

      {/* 0. Hero Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="0. Hero Section"
          description="Manage the main Hero text on the Our Clients page."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Hero Heading"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              placeholder="Powering India's Elite Enterprises"
            />
            <InputField
              label="Hero CTA Button Text"
              value={heroCtaText}
              onChange={(e) => setHeroCtaText(e.target.value)}
              placeholder="Explore our client portfolio"
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hero Description</label>
              <textarea
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-gray-900"
                rows={3}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                placeholder="For over three decades..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hero Background Image</label>
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-2xl px-4 py-3 flex items-center justify-between transition hover:bg-slate-50">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-20 h-14 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    {heroImage ? (
                      <img src={heroImage} alt="Hero Background" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">Hero Background</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {heroImage ? (heroImage.startsWith("data:") ? "Local File" : "Cloud / Remote") : "No file uploaded"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <label className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#2D6FBA] hover:border-[#2D6FBA]/40 rounded-xl text-xs font-semibold cursor-pointer transition shadow-2xs">
                    {heroImage ? "Replace" : "Upload"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleHeroImageUpload} />
                  </label>

                  <button
                    type="button"
                    onClick={() => { setHeroImage(""); toast.success("Image removed. Don't forget to save!"); }}
                    className="w-8 h-8 rounded-full border border-slate-200/80 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition cursor-pointer shadow-2xs"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
              <SaveButton
                onClick={handleSaveStats}
                isSaving={savingStats}
                saved={savedStats}
                label="Save Hero Section"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 1. Achievement Counter Metrics */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Achievement Counter Stats"
          description="Manage headline counter numbers (500+ Enterprise Clients, 30+ Years, 10000+ Installations)."
          isOpen={isStatsOpen}
          onToggle={() => setIsStatsOpen(!isStatsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isStatsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
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

      {/* 2. Client Brand Logos Grid (Matching Homepage HeroSectionCMS design format) */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Esteemed Client Brand Logos (${logos.length} client logos)`}
          description="Upload client logos to display in the main Esteemed Clients Grid."
          isOpen={isLogosOpen}
          onToggle={() => setIsLogosOpen(!isLogosOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isLogosOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <InputField
              label="Esteemed Clients Section Title"
              value={esteemedTitle}
              onChange={(e) => setEsteemedTitle(e.target.value)}
              placeholder="Our Esteemed Clients"
            />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Client Logos ({logos.length} logos)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Upload client brand logos to display in the grid
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
                or drag & drop client logos
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

            {/* List of logos */}
            <div className="space-y-2.5">
              {logos.map((logo, idx) => (
                <div
                  key={logo.id}
                  className="bg-slate-50/70 border border-slate-200/70 rounded-2xl px-4 py-3 flex items-center justify-between transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {logo.url ? (
                        <img
                          src={logo.url}
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
                          if (file) handleLogoFileUpload(logo.id, file);
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

      {/* 3. Prestigious Clients Industry List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. Prestigious Clients Industry Directory (${clients.length} Entries · ${clients.filter((c) => !!c.logo).length} with Logos)`}
          description="Manage client logos, names & industry sector categories. Logos replace company names when available; company names remain when logos are missing."
          isOpen={isClientsOpen}
          onToggle={() => setIsClientsOpen(!isClientsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isClientsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Prestigious Clients Section Title"
                value={prestigiousTitle}
                onChange={(e) => setPrestigiousTitle(e.target.value)}
                placeholder="Our Prestigious Clients"
              />
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Section Description</label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-gray-900"
                  rows={2}
                  value={prestigiousDesc}
                  onChange={(e) => setPrestigiousDesc(e.target.value)}
                  placeholder="We are proud to partner with industry leaders..."
                />
              </div>
            </div>

            {/* Filter, Search & Bulk Actions Bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={clientSearch}
                      onChange={(e) => {
                        setClientSearch(e.target.value);
                        setClientPage(1);
                      }}
                      placeholder="Search company or industry..."
                      className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2D6FBA] text-slate-800"
                    />
                    {clientSearch && (
                      <button
                        type="button"
                        onClick={() => setClientSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Dropdown */}
                  <div className="relative w-full sm:w-60">
                    <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={clientCategoryFilter}
                      onChange={(e) => {
                        setClientCategoryFilter(e.target.value);
                        setClientPage(1);
                      }}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2D6FBA] text-slate-800 cursor-pointer"
                    >
                      <option value="ALL">All Categories ({clients.length})</option>
                      {Array.from(new Set(clients.map((c) => c.category).filter(Boolean))).map((cat) => {
                        const count = clients.filter((c) => c.category === cat).length;
                        return (
                          <option key={cat} value={cat}>
                            {cat} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Bulk Logo Upload Button */}
                  <input
                    ref={bulkClientLogoRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        handleBulkClientLogos(e.target.files);
                      }
                    }}
                  />
                  <button
                    type="button"
                    disabled={isBulkUploadingClients}
                    onClick={() => bulkClientLogoRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-[#2D6FBA]/50 text-slate-700 text-xs font-semibold rounded-xl transition shadow-2xs cursor-pointer disabled:opacity-50"
                    title="Upload multiple logos named after companies"
                  >
                    {isBulkUploadingClients ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2D6FBA]" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5 text-[#2D6FBA]" />
                    )}
                    Bulk Match Logos
                  </button>

                  {/* Add Single Client Entry */}
                  <button
                    type="button"
                    onClick={addClient}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Client Entry
                  </button>
                </div>
              </div>

              {/* Status & Results Counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span>
                    Showing{" "}
                    <strong className="text-slate-700">
                      {Math.min(
                        (clientPage - 1) * itemsPerPage + 1,
                        clients.filter((c) => {
                          const matchesSearch =
                            !clientSearch ||
                            c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                            c.category.toLowerCase().includes(clientSearch.toLowerCase());
                          const matchesCat =
                            clientCategoryFilter === "ALL" || c.category === clientCategoryFilter;
                          return matchesSearch && matchesCat;
                        }).length
                      )}
                      -
                      {Math.min(
                        clientPage * itemsPerPage,
                        clients.filter((c) => {
                          const matchesSearch =
                            !clientSearch ||
                            c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                            c.category.toLowerCase().includes(clientSearch.toLowerCase());
                          const matchesCat =
                            clientCategoryFilter === "ALL" || c.category === clientCategoryFilter;
                          return matchesSearch && matchesCat;
                        }).length
                      )}
                    </strong>{" "}
                    of{" "}
                    <strong className="text-slate-700">
                      {
                        clients.filter((c) => {
                          const matchesSearch =
                            !clientSearch ||
                            c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                            c.category.toLowerCase().includes(clientSearch.toLowerCase());
                          const matchesCat =
                            clientCategoryFilter === "ALL" || c.category === clientCategoryFilter;
                          return matchesSearch && matchesCat;
                        }).length
                      }
                    </strong>{" "}
                    filtered entries
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {clients.filter((c) => !!c.logo).length} with Logos
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-md font-medium text-[11px]">
                    <AlertCircle className="w-3 h-3 text-slate-400" />
                    {clients.filter((c) => !c.logo).length} Name Only
                  </span>
                </div>
              </div>
            </div>

            {/* Client Cards Grid (Paginated) */}
            {(() => {
              const filtered = clients.filter((c) => {
                const matchesSearch =
                  !clientSearch ||
                  c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                  c.category.toLowerCase().includes(clientSearch.toLowerCase());
                const matchesCat =
                  clientCategoryFilter === "ALL" || c.category === clientCategoryFilter;
                return matchesSearch && matchesCat;
              });

              const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
              const paginated = filtered.slice(
                (clientPage - 1) * itemsPerPage,
                clientPage * itemsPerPage
              );

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginated.map((c) => {
                      const realIndex = clients.findIndex((item) => item.id === c.id);
                      const isUploading = uploadingClientId === c.id;

                      return (
                        <div
                          key={c.id}
                          className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative hover:border-[#2D6FBA]/40 transition"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                                Client Entry #{realIndex + 1}
                              </span>
                              {c.logo ? (
                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Logo Active
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md">
                                  Name Only
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeClient(c.id)}
                              className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Company Logo Management Area */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                              Company Logo (Replaces name when provided)
                            </label>
                            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2">
                              <div className="w-16 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 p-1">
                                {c.logo ? (
                                  <img
                                    src={c.logo}
                                    alt={c.name || "Client logo"}
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <ImageIcon className="w-5 h-5 text-slate-300" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-slate-500 truncate font-mono">
                                  {c.logo ? c.logo : "No logo uploaded (displays company name)"}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <label className="px-2.5 py-1 bg-blue-50 text-[#2D6FBA] hover:bg-blue-100 rounded-lg text-[11px] font-bold cursor-pointer transition flex items-center gap-1">
                                    {isUploading ? (
                                      <>
                                        <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                                      </>
                                    ) : (
                                      <>
                                        <Upload className="w-3 h-3" />
                                        {c.logo ? "Replace Logo" : "Upload Logo"}
                                      </>
                                    )}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      disabled={isUploading}
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleClientLogoUpload(c.id, file);
                                      }}
                                    />
                                  </label>

                                  {c.logo && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleClientChange(c.id, "logo", "");
                                        toast.success("Logo removed. Company name will display.");
                                      }}
                                      className="px-2 py-1 text-slate-500 hover:text-red-500 rounded-lg text-[11px] font-medium transition cursor-pointer"
                                    >
                                      Remove Logo
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <InputField
                            label="Client / Organization Name"
                            value={c.name}
                            onChange={(e) =>
                              handleClientChange(c.id, "name", e.target.value)
                            }
                            placeholder="e.g. Air India"
                          />
                          <InputField
                            label="Industry Sector / Tab Category"
                            value={c.category}
                            onChange={(e) =>
                              handleClientChange(c.id, "category", e.target.value)
                            }
                            placeholder="e.g. Aviation & Logistics"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 px-2">
                      <p className="text-xs text-slate-500">
                        Page <strong className="text-slate-800">{clientPage}</strong> of{" "}
                        <strong className="text-slate-800">{totalPages}</strong>
                      </p>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={clientPage <= 1}
                          onClick={() => setClientPage((p) => Math.max(p - 1, 1))}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer flex items-center gap-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" /> Prev
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum = clientPage;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (clientPage <= 3) {
                              pageNum = i + 1;
                            } else if (clientPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = clientPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                type="button"
                                onClick={() => setClientPage(pageNum)}
                                className={`w-8 h-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                                  clientPage === pageNum
                                    ? "bg-[#2D6FBA] text-white"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          disabled={clientPage >= totalPages}
                          onClick={() => setClientPage((p) => Math.min(p + 1, totalPages))}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer flex items-center gap-1"
                        >
                          Next <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingClients}
                saved={savedClients}
                onClick={handleSaveClients}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
