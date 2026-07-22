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
} from "lucide-react";
import toast from "react-hot-toast";

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
};

export default function OurClientsStaticPageCMS() {
  const bulkLogoInputRef = useRef<HTMLInputElement>(null);

  // Accordion states
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
      { id: `c-${Date.now()}`, name: "", category: "Industries" },
    ]);
    toast.success("New client entry added!");
  };

  const removeClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    toast.success("Client entry removed");
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
          title={`3. Prestigious Clients Industry Directory (${clients.length} Entries)`}
          description="Manage client names & industry sector categories (Builders, Petrol Pump, Healthcare, Embassies, etc.)."
          isOpen={isClientsOpen}
          onToggle={() => setIsClientsOpen(!isClientsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isClientsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addClient}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Client Entry
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map((c, idx) => (
                <div
                  key={c.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Client Entry #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeClient(c.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
              ))}
            </div>

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
