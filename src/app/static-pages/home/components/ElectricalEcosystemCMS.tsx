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
  Zap,
  Cpu,
  ShieldCheck,
  Gauge,
  BatteryCharging,
  Factory,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Check,
  Layers,
  Activity,
  Workflow,
  Settings,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const AVAILABLE_ICONS: Record<string, any> = {
  Zap,
  Cpu,
  ShieldCheck,
  Gauge,
  BatteryCharging,
  Factory,
  Layers,
  Activity,
  Workflow,
  Settings,
  Sparkles,
};

export interface EcosystemStage {
  id: string;
  step: string;
  name: string;
  icon: string;
  image: string | File;
  headline: string;
  description: string;
  equipment: string[];
}

const DEFAULT_STAGES: EcosystemStage[] = [
  {
    id: "generation",
    step: "01",
    name: "Power Sources",
    icon: "Zap",
    image: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703672/kumarpower_website/egvye1xjbviosybczmy5.jpg",
    headline: "Grid Entry, Solar Panels, Gensets & BESS",
    description:
      "Accepts high-voltage grid supply, integrates rooftop solar panels, Kirloskar CPCB IV+ diesel gensets, and battery energy storage (BESS).",
    equipment: [
      "CPCB IV+ Gensets",
      "Rooftop Solar Panels",
      "Battery Energy Storage (BESS)",
      "High-Voltage Substation",
    ],
  },
  {
    id: "distribution-trans",
    step: "02",
    name: "Distribution",
    icon: "Cpu",
    image: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703674/kumarpower_website/vo2ekpdop7dovku0rc8n.jpg",
    headline: "Step-Up / Step-Down Transformers",
    description:
      "Steps high transmission voltages up or down to operational facility voltage levels with custom dry-type and oil-filled transformers.",
    equipment: [
      "Distribution Transformers",
      "Isolation Transformers",
      "Dry-Type Cast Resin",
      "Step-down Transformers",
    ],
  },
  {
    id: "panels",
    step: "03",
    name: "HT/LT Panels",
    icon: "ShieldCheck",
    image: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703675/kumarpower_website/gbtxkuml1jukdiu4wlyh.jpg",
    headline: "Distribution Panels, AMF & Changeover",
    description:
      "Routes power safely across main LT Panels, HT breaker panels, PCC/MCC motor controls, AMF & ATS Panels.",
    equipment: [
      "Main LT Switchgear",
      "HT Breaker Panels",
      "AMF & ATS Panels",
      "PCC & MCC Panels",
    ],
  },
  {
    id: "power-quality",
    step: "04",
    name: "Power Quality & Protection",
    icon: "Gauge",
    image: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703677/kumarpower_website/xs3x2tpwjztqwrmhb3py.png",
    headline: "Voltage Regulation & Harmonics",
    description:
      "Stabilizes fluctuating grid voltages, maintains high power factor via APFC capacitor banks, and filters active harmonic distortion.",
    equipment: [
      "Servo Stabilisers",
      "APFC Capacitor Banks",
      "Active Harmonic Filters",
      "Surge Arrestors",
    ],
  },
  {
    id: "sub-distribution",
    step: "05",
    name: "Sub-Distribution",
    icon: "BatteryCharging",
    image: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703679/kumarpower_website/gjm6k7mwcmvnsewffrsc.jpg",
    headline: "Bus Ducts & Feeder Pillars",
    description:
      "Transfers clean, protected electrical power through riser busbars, sub-distribution boards, and smart energy monitoring meters.",
    equipment: [
      "Busbar Trunking Systems",
      "Floor Distribution Boards",
      "Feeder Pillars",
      "Smart Meters",
    ],
  },
  {
    id: "final-load",
    step: "06",
    name: "Final Facility Load",
    icon: "Factory",
    image: "https://res.cloudinary.com/dpa93copz/image/upload/v1784703681/kumarpower_website/qvwibw8fuw4gmlkk9n4c.png",
    headline: "Industrial, Commercial & Critical Facilities",
    description:
      "Delivers continuous, highly stable electrical energy to critical infrastructure, manufacturing plants, commercial complexes, data centres, healthcare facilities, and residential buildings.",
    equipment: [
      "Industrial Machinery",
      "Data Centre Servers",
      "Central HVAC Chillers",
      "Residential Equipment",
    ],
  },
];

interface ElectricalEcosystemCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function ElectricalEcosystemCMS({
  saveUrl = "/api/home",
  responseKey = "electricalEcosystem",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: ElectricalEcosystemCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedStage, setExpandedStage] = useState<string | null>("generation");
  const [newEquipmentText, setNewEquipmentText] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<{
    badge: string;
    title: string;
    description: string;
    stages: EcosystemStage[];
  }>({
    badge: "Interactive System Flow",
    title: "From Incoming Power to Final Load",
    description:
      "Automated power progression across all 6 electrical system stages. Click any stage to inspect equipment details.",
    stages: DEFAULT_STAGES,
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey ? json.data?.[responseKey] : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData((prev) => ({
              ...prev,
              badge: sectionData.badge ?? prev.badge,
              title: sectionData.title ?? prev.title,
              description: sectionData.description ?? prev.description,
              stages:
                Array.isArray(sectionData.stages) && sectionData.stages.length > 0
                  ? sectionData.stages
                  : prev.stages,
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateStageField = (
    id: string,
    key: keyof EcosystemStage,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.map((st) =>
        st.id === id ? { ...st, [key]: value } : st
      ),
    }));
  };

  const addEquipmentTag = (stageId: string) => {
    const text = newEquipmentText[stageId]?.trim();
    if (!text) return;

    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.map((st) =>
        st.id === stageId
          ? { ...st, equipment: [...(st.equipment || []), text] }
          : st
      ),
    }));
    setNewEquipmentText((prev) => ({ ...prev, [stageId]: "" }));
  };

  const removeEquipmentTag = (stageId: string, itemIdx: number) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.map((st) =>
        st.id === stageId
          ? {
              ...st,
              equipment: st.equipment.filter((_, idx) => idx !== itemIdx),
            }
          : st
      ),
    }));
  };

  const addStage = () => {
    const newIdx = formData.stages.length + 1;
    const stepNumber = newIdx < 10 ? `0${newIdx}` : `${newIdx}`;
    const newId = `stage-${Date.now()}`;
    const newStage: EcosystemStage = {
      id: newId,
      step: stepNumber,
      name: `Stage ${stepNumber}`,
      icon: "Zap",
      image: "",
      headline: `Stage ${stepNumber} System Headline`,
      description: "Stage description...",
      equipment: ["Equipment Item 1", "Equipment Item 2"],
    };

    setFormData((prev) => ({
      ...prev,
      stages: [...prev.stages, newStage],
    }));
    setExpandedStage(newId);
    toast.success(`Stage ${stepNumber} added`);
  };

  const removeStage = (id: string) => {
    if (formData.stages.length <= 1) {
      toast.error("You must keep at least 1 ecosystem stage.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.filter((st) => st.id !== id),
    }));
    toast.success("Stage removed");
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

      if (payload.stages) {
        setFormData((prev) => ({ ...prev, stages: payload.stages }));
      }

      clearCache(saveUrl);
      setSaved(true);
      toast.success("Electrical Ecosystem section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save electrical ecosystem");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="3. Complete Electrical Ecosystem (System Flow)"
        description="Manage the interactive 6-stage power flow (Power Sources, Transformers, HT/LT Panels, Power Quality, Sub-Distribution, Final Load) with visual photos, headlines, and equipment items."
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
                placeholder="e.g. Interactive System Flow"
              />
              <InputField
                label="Section Heading"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. From Incoming Power to Final Load"
              />
            </div>

            <TextAreaField
              label="Overview Subtitle"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Automated power progression across all 6 electrical system stages..."
              rows={2}
            />
          </div>

          {/* Stages List */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Ecosystem Stages ({formData.stages.length} stages)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Expand any stage to customize its visual image, headline, and integrated equipment list.
                </p>
              </div>
              <button
                type="button"
                onClick={addStage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Stage
              </button>
            </div>

            <div className="space-y-3">
              {formData.stages.map((stage, idx) => {
                const isExpanded = expandedStage === stage.id;
                const CurrentIcon = AVAILABLE_ICONS[stage.icon] || Zap;

                return (
                  <div
                    key={stage.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-colors"
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1A6AA2] font-bold shrink-0 shadow-2xs">
                          <CurrentIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-[#1A6AA2]/10 text-[#1A6AA2] border border-[#1A6AA2]/20">
                              STAGE {stage.step}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {stage.name}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {stage.headline || "No headline set"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {formData.stages.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeStage(stage.id);
                            }}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                            title="Remove stage"
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

                    {/* Stage Details Form */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-200 bg-white space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <InputField
                            label="Stage Number (e.g. 01, 02)"
                            value={stage.step}
                            onChange={(e) => updateStageField(stage.id, "step", e.target.value)}
                            placeholder="01"
                          />
                          <InputField
                            label="Stage Title / Short Name"
                            value={stage.name}
                            onChange={(e) => updateStageField(stage.id, "name", e.target.value)}
                            placeholder="e.g. Power Sources"
                          />
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Stage Icon
                            </label>
                            <select
                              value={stage.icon}
                              onChange={(e) => updateStageField(stage.id, "icon", e.target.value)}
                              aria-label="Select Stage Icon"
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

                        <InputField
                          label="Main Stage Headline"
                          value={stage.headline}
                          onChange={(e) => updateStageField(stage.id, "headline", e.target.value)}
                          placeholder="e.g. Grid Entry, Solar Panels, Gensets & BESS"
                        />

                        <TextAreaField
                          label="Detailed Description"
                          value={stage.description}
                          onChange={(e) => updateStageField(stage.id, "description", e.target.value)}
                          placeholder="Explain what happens at this stage..."
                          rows={2}
                        />

                        {/* Stage Photo / Visual Image */}
                        <div className="pt-2 border-t border-slate-100">
                          <ImageUploadField
                            label={`Stage ${stage.step} Visual Photo / Image`}
                            value={stage.image}
                            onChange={(val) => updateStageField(stage.id, "image", val)}
                            tooltip="Upload photo or image representing this stage in the ecosystem display"
                          />
                        </div>

                        {/* Integrated Stage Technologies / Equipment */}
                        <div className="space-y-3 pt-2 border-t border-slate-100">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Integrated Stage Technologies / Equipment ({stage.equipment?.length || 0} items)
                          </label>

                          <div className="flex flex-wrap gap-2">
                            {(stage.equipment || []).map((eq, eqIdx) => (
                              <div
                                key={eqIdx}
                                className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800"
                              >
                                <Check className="w-3.5 h-3.5 text-[#1A6AA2]" />
                                <span>{eq}</span>
                                <button
                                  type="button"
                                  onClick={() => removeEquipmentTag(stage.id, eqIdx)}
                                  className="ml-1 text-slate-400 hover:text-rose-600 transition"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 max-w-md">
                            <input
                              type="text"
                              value={newEquipmentText[stage.id] || ""}
                              onChange={(e) =>
                                setNewEquipmentText({
                                  ...newEquipmentText,
                                  [stage.id]: e.target.value,
                                })
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addEquipmentTag(stage.id);
                                }
                              }}
                              placeholder="Add equipment (e.g. CPCB IV+ Gensets)"
                              className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#1A6AA2] focus:bg-white transition"
                            />
                            <button
                              type="button"
                              onClick={() => addEquipmentTag(stage.id)}
                              className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
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
