"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  BatteryCharging,
  ShieldAlert,
  TrendingDown,
  Zap,
  Check,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Flame,
} from "lucide-react";
import toast from "react-hot-toast";

const AVAILABLE_ICONS: Record<string, any> = {
  BatteryCharging,
  ShieldAlert,
  TrendingDown,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Flame,
};

export interface FeaturedScenarioItem {
  id: string;
  title: string;
  badge: string;
  icon: string;
  headline: string;
  description: string;
  outcomes: string[];
  components: string[];
}

const DEFAULT_SCENARIOS: FeaturedScenarioItem[] = [
  {
    id: "reduce-dg-dependence",
    title: "Reduce DG Dependence",
    badge: "Fuel & O&M Savings",
    icon: "BatteryCharging",
    headline: "Minimize Generator Hours & Diesel Expenses",
    description:
      "Combine battery energy storage (BESS), solar panels, and intelligent EMS controls to drastically lower generator runtime, carbon emissions, noise, and maintenance frequency.",
    outcomes: [
      "Up to 60% reduction in diesel consumption",
      "Eliminating low-load generator running inefficiently",
      "Instant zero-downtime microsecond battery takeover",
      "Extended genset overhaul and maintenance intervals",
    ],
    components: [
      "Battery Energy Storage (BESS)",
      "Solar Panels",
      "Smart EMS Controller",
      "Kirloskar DG Set",
    ],
  },
  {
    id: "protect-critical-operations",
    title: "Protect Critical Operations",
    badge: "Zero Downtime",
    icon: "ShieldAlert",
    headline: "Uninterrupted Power for Mission-Critical Loads",
    description:
      "Create an ultra-reliable power architecture using Kirloskar DG sets, AMF panels, BESS, transformers, and servo stabilisers.",
    outcomes: [
      "100% power availability during main grid collapse",
      "Seamless automatic transfer switch (ATS) sync",
      "Isolation from grid harmonic spikes & voltage drops",
      "Built-in redundant backup paths",
    ],
    components: [
      "Kirloskar DG Sets",
      "AMF Panels",
      "BESS Storage",
      "Transformers",
      "Servo Stabilisers",
    ],
  },
  {
    id: "lower-energy-costs",
    title: "Lower Energy Costs",
    badge: "OPEX Optimization",
    icon: "TrendingDown",
    headline: "Target & Eliminate Avoidable Energy Charges",
    description:
      "Use APFC power-factor correction, rooftop solar generation, BESS peak-shaving, and energy monitoring to reduce maximum demand penalties and utility bills.",
    outcomes: [
      "Elimination of low power factor utility penalties",
      "Peak demand charge shaving during high-rate hours",
      "Substantial daytime solar self-consumption",
      "Real-time facility load telemetry & alerts",
    ],
    components: [
      "APFC Capacitor Panel",
      "Rooftop Solar Panels",
      "Peak Shaving BESS",
      "Energy Management System",
    ],
  },
];

interface FeaturedSolutionsCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FeaturedSolutionsCMS({
  saveUrl = "/api/home",
  responseKey = "featuredSolutions",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: FeaturedSolutionsCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedScenario, setExpandedScenario] = useState<string | null>("reduce-dg-dependence");
  const [newOutcomeText, setNewOutcomeText] = useState<Record<string, string>>({});
  const [newComponentText, setNewComponentText] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<{
    badge: string;
    title: string;
    description: string;
    ctaButtonLabel: string;
    scenarios: FeaturedScenarioItem[];
  }>({
    badge: "Featured Operating Scenarios",
    title: "Solutions Built Around Real Operating Challenges",
    description:
      "Switch between real-world operational challenges to see how Kumar Power integrates multiple technologies into a cohesive solution.",
    ctaButtonLabel: "Request Custom Sizing For This Scenario",
    scenarios: DEFAULT_SCENARIOS,
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
              ctaButtonLabel: sectionData.ctaButtonLabel ?? prev.ctaButtonLabel,
              scenarios:
                Array.isArray(sectionData.scenarios) && sectionData.scenarios.length > 0
                  ? sectionData.scenarios
                  : prev.scenarios,
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateScenarioField = (
    id: string,
    key: keyof FeaturedScenarioItem,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((sc) =>
        sc.id === id ? { ...sc, [key]: value } : sc
      ),
    }));
  };

  const addOutcomeTag = (scId: string) => {
    const text = newOutcomeText[scId]?.trim();
    if (!text) return;

    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((sc) =>
        sc.id === scId ? { ...sc, outcomes: [...(sc.outcomes || []), text] } : sc
      ),
    }));
    setNewOutcomeText((prev) => ({ ...prev, [scId]: "" }));
  };

  const removeOutcomeTag = (scId: string, idx: number) => {
    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((sc) =>
        sc.id === scId
          ? { ...sc, outcomes: sc.outcomes.filter((_, i) => i !== idx) }
          : sc
      ),
    }));
  };

  const addComponentTag = (scId: string) => {
    const text = newComponentText[scId]?.trim();
    if (!text) return;

    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((sc) =>
        sc.id === scId
          ? { ...sc, components: [...(sc.components || []), text] }
          : sc
      ),
    }));
    setNewComponentText((prev) => ({ ...prev, [scId]: "" }));
  };

  const removeComponentTag = (scId: string, idx: number) => {
    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((sc) =>
        sc.id === scId
          ? { ...sc, components: sc.components.filter((_, i) => i !== idx) }
          : sc
      ),
    }));
  };

  const addScenario = () => {
    const newId = `scenario-${Date.now()}`;
    const newScenario: FeaturedScenarioItem = {
      id: newId,
      title: "New Operating Scenario",
      badge: "Efficiency Target",
      icon: "Zap",
      headline: "Scenario Headline Describing Solution",
      description: "Explain the multi-equipment combination addressing this challenge...",
      outcomes: ["Outcome result 1", "Outcome result 2"],
      components: ["Equipment 1", "Equipment 2"],
    };

    setFormData((prev) => ({
      ...prev,
      scenarios: [...prev.scenarios, newScenario],
    }));
    setExpandedScenario(newId);
    toast.success("New scenario added");
  };

  const removeScenario = (id: string) => {
    if (formData.scenarios.length <= 1) {
      toast.error("You must keep at least 1 scenario.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.filter((sc) => sc.id !== id),
    }));
    toast.success("Scenario removed");
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
      toast.success("Featured Solutions section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save featured solutions");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="5. Featured Solutions (Operating Scenarios)"
        description="Manage the interactive tabbed scenarios (Reduce DG Dependence, Protect Critical Operations, Lower Energy Costs) with target outcomes, integrated stack equipment, and CTA."
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
              Header Block & CTA
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Badge Tagline"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Featured Operating Scenarios"
              />
              <InputField
                label="Section Heading"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Solutions Built Around Real Operating Challenges"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextAreaField
                label="Description Overview"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Overview description..."
                rows={2}
              />
              <InputField
                label="Consultation Button Label"
                value={formData.ctaButtonLabel}
                onChange={(e) => setFormData({ ...formData, ctaButtonLabel: e.target.value })}
                placeholder="e.g. Request Custom Sizing For This Scenario"
              />
            </div>
          </div>

          {/* Scenarios Manager */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Operating Scenarios ({formData.scenarios.length} tabs)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure challenge scenarios with target outcomes & integrated equipment stack.
                </p>
              </div>
              <button
                type="button"
                onClick={addScenario}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Scenario
              </button>
            </div>

            <div className="space-y-3">
              {formData.scenarios.map((sc, idx) => {
                const isExpanded = expandedScenario === sc.id;
                const CurrentIcon = AVAILABLE_ICONS[sc.icon] || Zap;

                return (
                  <div
                    key={sc.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-colors"
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => setExpandedScenario(isExpanded ? null : sc.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1A6AA2] font-bold shrink-0 shadow-2xs">
                          <CurrentIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#1A6AA2]/10 text-[#1A6AA2] border border-[#1A6AA2]/20">
                              TAB #{idx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {sc.title}
                            </h4>
                            <span className="text-[10px] text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full font-medium">
                              {sc.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {sc.headline || "No headline set"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {formData.scenarios.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeScenario(sc.id);
                            }}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                            title="Remove scenario"
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

                    {/* Scenario Details Form */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-200 bg-white space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <InputField
                            label="Tab Title"
                            value={sc.title}
                            onChange={(e) => updateScenarioField(sc.id, "title", e.target.value)}
                            placeholder="e.g. Reduce DG Dependence"
                          />
                          <InputField
                            label="Outcome Badge"
                            value={sc.badge}
                            onChange={(e) => updateScenarioField(sc.id, "badge", e.target.value)}
                            placeholder="e.g. Fuel & O&M Savings"
                          />
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Tab Icon
                            </label>
                            <select
                              value={sc.icon}
                              onChange={(e) => updateScenarioField(sc.id, "icon", e.target.value)}
                              aria-label="Select Tab Icon"
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
                          label="Main Scenario Headline"
                          value={sc.headline}
                          onChange={(e) => updateScenarioField(sc.id, "headline", e.target.value)}
                          placeholder="e.g. Minimize Generator Hours & Diesel Expenses"
                        />

                        <TextAreaField
                          label="Detailed Problem & Solution Description"
                          value={sc.description}
                          onChange={(e) => updateScenarioField(sc.id, "description", e.target.value)}
                          placeholder="Explain how Kumar Power integrates multiple technologies..."
                          rows={2}
                        />

                        {/* Target Outcomes & Integrated Components (2 Columns) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                          {/* Target Outcomes */}
                          <div className="space-y-3">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                              Target Outcomes ({sc.outcomes?.length || 0})
                            </label>

                            <div className="space-y-1.5">
                              {(sc.outcomes || []).map((outc, outcIdx) => (
                                <div
                                  key={outcIdx}
                                  className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/60 text-xs font-medium text-emerald-900"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span className="truncate">{outc}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeOutcomeTag(sc.id, outcIdx)}
                                    className="text-slate-400 hover:text-rose-600 transition ml-2 shrink-0"
                                  >
                                    &times;
                                  </button>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newOutcomeText[sc.id] || ""}
                                onChange={(e) =>
                                  setNewOutcomeText({
                                    ...newOutcomeText,
                                    [sc.id]: e.target.value,
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addOutcomeTag(sc.id);
                                  }
                                }}
                                placeholder="Add target outcome..."
                                className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#1A6AA2] focus:bg-white transition"
                              />
                              <button
                                type="button"
                                onClick={() => addOutcomeTag(sc.id)}
                                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                              >
                                Add
                              </button>
                            </div>
                          </div>

                          {/* Integrated Solution Stack */}
                          <div className="space-y-3">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                              Integrated Stack Equipment ({sc.components?.length || 0})
                            </label>

                            <div className="space-y-1.5">
                              {(sc.components || []).map((comp, compIdx) => (
                                <div
                                  key={compIdx}
                                  className="flex items-center justify-between p-2 rounded-lg bg-blue-50/60 border border-blue-200/60 text-xs font-medium text-slate-800"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A6AA2]" />
                                    <span className="truncate">{comp}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeComponentTag(sc.id, compIdx)}
                                    className="text-slate-400 hover:text-rose-600 transition ml-2 shrink-0"
                                  >
                                    &times;
                                  </button>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newComponentText[sc.id] || ""}
                                onChange={(e) =>
                                  setNewComponentText({
                                    ...newComponentText,
                                    [sc.id]: e.target.value,
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addComponentTag(sc.id);
                                  }
                                }}
                                placeholder="Add equipment to stack..."
                                className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#1A6AA2] focus:bg-white transition"
                              />
                              <button
                                type="button"
                                onClick={() => addComponentTag(sc.id)}
                                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                              >
                                Add
                              </button>
                            </div>
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
