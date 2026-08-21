"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  Compass,
  PackageCheck,
  Wrench,
  ShieldAlert,
  Zap,
  Cpu,
  Settings,
  Layers,
  Activity,
  CheckCircle2,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

const AVAILABLE_ICONS: Record<string, any> = {
  Compass,
  PackageCheck,
  Wrench,
  ShieldAlert,
  Zap,
  Cpu,
  Settings,
  Layers,
  Activity,
  CheckCircle2,
};

const DEFAULT_CAPABILITIES = [
  {
    id: "cap-1",
    icon: "Compass",
    title: "Design and Engineering",
    description:
      "Load assessment, system planning, equipment selection and technical coordination.",
  },
  {
    id: "cap-2",
    icon: "PackageCheck",
    title: "Supply",
    description:
      "Reliable equipment sourced from established manufacturers and technology partners.",
  },
  {
    id: "cap-3",
    icon: "Wrench",
    title: "Execution",
    description:
      "Installation, cabling, integration, testing and commissioning.",
  },
  {
    id: "cap-4",
    icon: "ShieldAlert",
    title: "Lifecycle Support",
    description:
      "Preventive maintenance, breakdown support, upgrades and system optimisation.",
  },
];

interface CapabilityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface PositioningStatementCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function PositioningStatementCMS({
  saveUrl = "/api/home",
  responseKey = "positioningStatement",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: PositioningStatementCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<{
    badge: string;
    heading: string;
    description: string;
    capabilities: CapabilityItem[];
  }>({
    badge: "Integrated Electrical Solution",
    heading: "One Partner. Every Stage of Your Electrical Infrastructure.",
    description:
      "Kumar Power delivers integrated electrical solutions for commercial, industrial, institutional and infrastructure customers. We bring together power generators, transformers, distribution pannels, protection, power quality, renewable energy and battery storage under one coordinated solution.",
    capabilities: DEFAULT_CAPABILITIES,
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
              heading: sectionData.heading ?? prev.heading,
              description: sectionData.description ?? prev.description,
              capabilities:
                Array.isArray(sectionData.capabilities) && sectionData.capabilities.length > 0
                  ? sectionData.capabilities
                  : prev.capabilities,
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateCapability = (id: string, key: keyof CapabilityItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addCapability = () => {
    const newId = `cap-${Date.now()}`;
    setFormData((prev) => ({
      ...prev,
      capabilities: [
        ...prev.capabilities,
        {
          id: newId,
          icon: "Zap",
          title: "New Capability",
          description: "Description of the capability...",
        },
      ],
    }));
  };

  const removeCapability = (id: string) => {
    if (formData.capabilities.length <= 1) {
      toast.error("You must keep at least 1 capability item.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.filter((item) => item.id !== id),
    }));
    toast.success("Capability item removed");
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
      toast.success("Positioning Statement section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save positioning statement");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="2. Positioning Statement Section"
        description="Manage the integrated electrical solution positioning badge, main statement heading, overview paragraph, and capability cards."
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
          {/* Header Block Content */}
          <div className="space-y-4">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
              Header & Statement Text
            </p>

            <InputField
              label="Badge / Tagline"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. Integrated Electrical Solution"
            />

            <InputField
              label="Main Section Title"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="e.g. One Partner. Every Stage of Your Electrical Infrastructure."
            />

            <TextAreaField
              label="Description Paragraph"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter the main positioning description..."
              rows={3}
            />
          </div>

          {/* Capabilities Cards */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Capabilities & Solution Stages ({formData.capabilities.length} cards)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure the 4 core capability cards (Design, Supply, Execution, Support).
                </p>
              </div>
              <button
                type="button"
                onClick={addCapability}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Capability
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.capabilities.map((cap, idx) => {
                const CurrentIcon = AVAILABLE_ICONS[cap.icon] || Zap;
                return (
                  <div
                    key={cap.id}
                    className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 relative group hover:border-[#1A6AA2]/40 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1A6AA2] shrink-0 shadow-2xs">
                          <CurrentIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Card #{idx + 1}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800">
                            {cap.title || "Untitled Card"}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Icon Select Dropdown */}
                        <select
                          value={cap.icon}
                          onChange={(e) => updateCapability(cap.id, "icon", e.target.value)}
                          aria-label="Select icon"
                          className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none focus:border-[#1A6AA2]"
                        >
                          {Object.keys(AVAILABLE_ICONS).map((iconKey) => (
                            <option key={iconKey} value={iconKey}>
                              {iconKey}
                            </option>
                          ))}
                        </select>

                        {formData.capabilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCapability(cap.id)}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                            title="Remove card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <InputField
                      label="Capability Title"
                      value={cap.title}
                      onChange={(e) => updateCapability(cap.id, "title", e.target.value)}
                      placeholder="e.g. Design and Engineering"
                    />

                    <TextAreaField
                      label="Short Description"
                      value={cap.description}
                      onChange={(e) => updateCapability(cap.id, "description", e.target.value)}
                      placeholder="e.g. Load assessment, system planning..."
                      rows={2}
                    />
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
