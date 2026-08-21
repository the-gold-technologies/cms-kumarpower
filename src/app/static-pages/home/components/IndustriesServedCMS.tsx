"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { uploadFilesDeep } from "@/lib/uploadHelpers";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  Factory,
  Hotel,
  HeartPulse,
  Server,
  Building,
  Truck,
  Plane,
  Landmark,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

const AVAILABLE_ICONS: Record<string, any> = {
  Factory,
  Plane,
  HeartPulse,
  Server,
  Hotel,
  Landmark,
  Truck,
  Building,
  Cpu,
  Layers,
  Sparkles,
  Zap,
};

export interface IndustryCardItem {
  id: string;
  name: string;
  icon: string;
  problem: string;
  image: string | File;
}

interface IndustriesServedCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function IndustriesServedCMS({
  saveUrl = "/api/home",
  responseKey = "industriesServed",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: IndustriesServedCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    badge: string;
    title: string;
    description: string;
    industries: IndustryCardItem[];
  }>({
    badge: "",
    title: "",
    description: "",
    industries: [],
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey ? json.data?.[responseKey] : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData({
              badge: sectionData.badge ?? "",
              title: sectionData.title ?? "",
              description: sectionData.description ?? "",
              industries: Array.isArray(sectionData.industries)
                ? sectionData.industries
                : [],
            });
            if (Array.isArray(sectionData.industries) && sectionData.industries.length > 0) {
              setExpandedCard(sectionData.industries[0].id);
            }
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateIndustryField = (
    id: string,
    key: keyof IndustryCardItem,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addIndustry = () => {
    const newId = `ind-${Date.now()}`;
    const newIndustry: IndustryCardItem = {
      id: newId,
      name: "New Industry Sector",
      icon: "Building",
      problem: "Specific operational power requirement and solution description...",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    };

    setFormData((prev) => ({
      ...prev,
      industries: [...prev.industries, newIndustry],
    }));
    setExpandedCard(newId);
    toast.success("New industry sector card added");
  };

  const removeIndustry = (id: string) => {
    if (formData.industries.length <= 1) {
      toast.error("You must keep at least 1 industry card.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.filter((item) => item.id !== id),
    }));
    toast.success("Industry card removed");
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

      if (payload.industries) {
        setFormData((prev) => ({ ...prev, industries: payload.industries }));
      }

      clearCache(saveUrl);
      setSaved(true);
      toast.success("Industries Served section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save industries served");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="6. Industries Served Section"
        description="Manage the 8 sector-specific cards (Manufacturing, Aviation, Healthcare, Data Centres, Hospitality, Infrastructure, Cold Storage, Commercial Towers) with background images, icons, and sector challenge descriptions."
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
                label="Badge Tagline"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Sector-Specific Solutions"
              />
              <InputField
                label="Section Heading"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Solutions Designed for Your Industry"
              />
            </div>

            <TextAreaField
              label="Overview Subtitle"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. We tailor electrical architecture to meet the specific operational..."
              rows={2}
            />
          </div>

          {/* Industry Cards Manager */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Industry Cards ({formData.industries.length} sectors)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure sector name, icon, operational problem text, and background photo.
                </p>
              </div>
              <button
                type="button"
                onClick={addIndustry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Sector
              </button>
            </div>

            <div className="space-y-3">
              {formData.industries.map((ind, idx) => {
                const isExpanded = expandedCard === ind.id;
                const CurrentIcon = AVAILABLE_ICONS[ind.icon] || Building;

                return (
                  <div
                    key={ind.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-colors"
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => setExpandedCard(isExpanded ? null : ind.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#1A6AA2] font-bold shrink-0 shadow-2xs overflow-hidden">
                          {ind.image ? (
                            <img
                              src={
                                typeof ind.image === "string"
                                  ? ind.image
                                  : URL.createObjectURL(ind.image)
                              }
                              alt={ind.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <CurrentIcon className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                              SECTOR #{idx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {ind.name}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {ind.problem || "No description"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {formData.industries.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeIndustry(ind.id);
                            }}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                            title="Remove sector"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sector Content Form */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-200 bg-white space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField
                            label="Industry / Sector Name"
                            value={ind.name}
                            onChange={(e) =>
                              updateIndustryField(ind.id, "name", e.target.value)
                            }
                            placeholder="e.g. Manufacturing"
                          />

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Sector Icon
                            </label>
                            <select
                              value={ind.icon}
                              onChange={(e) =>
                                updateIndustryField(ind.id, "icon", e.target.value)
                              }
                              aria-label="Select Sector Icon"
                              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2.5 font-medium outline-none focus:border-[#1A6AA2] focus:bg-white transition"
                            >
                              {Object.keys(AVAILABLE_ICONS).map((k) => (
                                <option key={k} value={k}>
                                  {k}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <TextAreaField
                          label="Sector Challenge & Operational Demands"
                          value={ind.problem}
                          onChange={(e) =>
                            updateIndustryField(ind.id, "problem", e.target.value)
                          }
                          placeholder="e.g. Stable heavy power distribution, zero harmonic trips..."
                          rows={2}
                        />

                        {/* Background Photo */}
                        <div className="pt-2 border-t border-slate-100">
                          <ImageUploadField
                            label="Sector Card Visual Image (Background Photo)"
                            value={ind.image}
                            onChange={(val) => updateIndustryField(ind.id, "image", val)}
                            tooltip="Upload photo displayed with dark contrast overlay behind the sector title"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
