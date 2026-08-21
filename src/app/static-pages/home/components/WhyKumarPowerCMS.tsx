"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  ShieldCheck,
  Award,
  Cpu,
  Wrench,
  Headset,
  Sun,
  UserCheck,
  Plus,
  Trash2,
  Zap,
  Layers,
  Settings,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const AVAILABLE_ICONS: Record<string, any> = {
  ShieldCheck,
  Award,
  Cpu,
  Wrench,
  Headset,
  Sun,
  Zap,
  Layers,
  Settings,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
};

export interface WhyReasonItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

const DEFAULT_REASONS: WhyReasonItem[] = [
  {
    id: "reason-1",
    icon: "ShieldCheck",
    title: "Single-Point Responsibility",
    desc: "One engineering team coordinating generation, transformation, distribution, storage & turnkey execution.",
  },
  {
    id: "reason-2",
    icon: "Award",
    title: "Established 30+ Year Track Record",
    desc: "Decades of proven power sector experience executing 5,000+ complex industrial and commercial projects.",
  },
  {
    id: "reason-3",
    icon: "Cpu",
    title: "Authorised Kirloskar Partnership",
    desc: "Direct factory OEM warranty, certified engineers, and genuine spare parts supply pipeline.",
  },
  {
    id: "reason-4",
    icon: "Wrench",
    title: "Solution-Based Sizing",
    desc: "Equipment customized to your real load profile & duty cycle—not pushed off-the-shelf inventory.",
  },
  {
    id: "reason-5",
    icon: "Headset",
    title: "Lifecycle Support & AMC",
    desc: "Dedicated emergency response team, routine maintenance, testing & statutory commissioning.",
  },
  {
    id: "reason-6",
    icon: "Sun",
    title: "Conventional & Hybrid Renewable",
    desc: "Seamless integration of traditional DG power with rooftop solar panels and battery storage (BESS).",
  },
];

interface WhyKumarPowerCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function WhyKumarPowerCMS({
  saveUrl = "/api/home",
  responseKey = "whyKumarPower",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: WhyKumarPowerCMSProps) {
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
    title: string;
    description: string;
    leadershipButtonLabel: string;
    modalBadge: string;
    modalTitle: string;
    modalDescription: string;
    modalOfficeTitle: string;
    modalOfficeDescription: string;
    reasons: WhyReasonItem[];
  }>({
    badge: "Engineered Trust",
    title: "Why Businesses Choose Kumar Power",
    description:
      "We structure complete electrical power systems around your specific operational challenge rather than displaying generic equipment inventory.",
    leadershipButtonLabel: "Meet Leadership & Heritage",
    modalBadge: "Leadership & Heritage",
    modalTitle: "Behind Kumar Power",
    modalDescription:
      "Founded over three decades ago, Kumar Power has evolved from a pioneering generator dealership into an integrated electrical power systems engineering enterprise. Under veteran leadership, our team combines senior electrical engineers, certified technicians, and project managers committed to zero-downtime client infrastructure.",
    modalOfficeTitle: "Head Office & Regional Reach",
    modalOfficeDescription: "Delhi NCR • Pan-India Project Execution & Service Support",
    reasons: DEFAULT_REASONS,
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
              leadershipButtonLabel: sectionData.leadershipButtonLabel ?? prev.leadershipButtonLabel,
              modalBadge: sectionData.modalBadge ?? prev.modalBadge,
              modalTitle: sectionData.modalTitle ?? prev.modalTitle,
              modalDescription: sectionData.modalDescription ?? prev.modalDescription,
              modalOfficeTitle: sectionData.modalOfficeTitle ?? prev.modalOfficeTitle,
              modalOfficeDescription: sectionData.modalOfficeDescription ?? prev.modalOfficeDescription,
              reasons:
                Array.isArray(sectionData.reasons) && sectionData.reasons.length > 0
                  ? sectionData.reasons
                  : prev.reasons,
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateReasonField = (
    id: string,
    key: keyof WhyReasonItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      reasons: prev.reasons.map((r) =>
        r.id === id ? { ...r, [key]: value } : r
      ),
    }));
  };

  const addReason = () => {
    const newId = `reason-${Date.now()}`;
    const newReason: WhyReasonItem = {
      id: newId,
      icon: "ShieldCheck",
      title: "New Value Proposition",
      desc: "Describe the key advantage and impact for clients...",
    };

    setFormData((prev) => ({
      ...prev,
      reasons: [...prev.reasons, newReason],
    }));
    toast.success("New reason card added");
  };

  const removeReason = (id: string) => {
    if (formData.reasons.length <= 1) {
      toast.error("You must keep at least 1 reason card.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      reasons: prev.reasons.filter((r) => r.id !== id),
    }));
    toast.success("Reason card removed");
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
      toast.success("Why Kumar Power section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save Why Kumar Power section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="7. Why Kumar Power Section"
        description="Manage the 6 value proposition cards (Single-Point Responsibility, 30+ Year Track Record, Kirloskar Partnership, Solution Sizing, Lifecycle Support, Hybrid Renewables) and Leadership modal content."
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
              Header Block & Action
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Badge Tagline"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Engineered Trust"
              />
              <InputField
                label="Section Heading"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Why Businesses Choose Kumar Power"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextAreaField
                label="Overview Subtitle"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Overview description..."
                rows={2}
              />
              <InputField
                label="Modal Trigger Button Label"
                value={formData.leadershipButtonLabel}
                onChange={(e) =>
                  setFormData({ ...formData, leadershipButtonLabel: e.target.value })
                }
                placeholder="e.g. Meet Leadership & Heritage"
              />
            </div>
          </div>

          {/* Leadership & Heritage Modal Content */}
          <div className="space-y-4 pt-2 border-t border-slate-100 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-[#1A6AA2]" />
              <span>Leadership & Heritage Modal Content</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Modal Badge"
                value={formData.modalBadge}
                onChange={(e) => setFormData({ ...formData, modalBadge: e.target.value })}
                placeholder="e.g. Leadership & Heritage"
              />
              <InputField
                label="Modal Title"
                value={formData.modalTitle}
                onChange={(e) => setFormData({ ...formData, modalTitle: e.target.value })}
                placeholder="e.g. Behind Kumar Power"
              />
            </div>

            <TextAreaField
              label="Modal Story / Heritage Paragraph"
              value={formData.modalDescription}
              onChange={(e) =>
                setFormData({ ...formData, modalDescription: e.target.value })
              }
              placeholder="Founded over three decades ago, Kumar Power..."
              rows={3}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Office Card Title"
                value={formData.modalOfficeTitle}
                onChange={(e) =>
                  setFormData({ ...formData, modalOfficeTitle: e.target.value })
                }
                placeholder="e.g. Head Office & Regional Reach"
              />
              <InputField
                label="Office Location / Reach"
                value={formData.modalOfficeDescription}
                onChange={(e) =>
                  setFormData({ ...formData, modalOfficeDescription: e.target.value })
                }
                placeholder="e.g. Delhi NCR • Pan-India Project Execution & Service Support"
              />
            </div>
          </div>

          {/* Reasons / Value Proposition Cards */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Value Proposition Cards ({formData.reasons.length} cards)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure the 6 key trust reasons displayed to prospects.
                </p>
              </div>
              <button
                type="button"
                onClick={addReason}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Reason Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.reasons.map((r, idx) => {
                const CurrentIcon = AVAILABLE_ICONS[r.icon] || ShieldCheck;

                return (
                  <div
                    key={r.id}
                    className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3 relative group hover:border-[#1A6AA2]/40 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1A6AA2] shrink-0 shadow-2xs">
                          <CurrentIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Card #{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={r.icon}
                          onChange={(e) => updateReasonField(r.id, "icon", e.target.value)}
                          aria-label="Select Reason Icon"
                          className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none focus:border-[#1A6AA2]"
                        >
                          {Object.keys(AVAILABLE_ICONS).map((iconKey) => (
                            <option key={iconKey} value={iconKey}>
                              {iconKey}
                            </option>
                          ))}
                        </select>

                        {formData.reasons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeReason(r.id)}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                            title="Remove card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <InputField
                      label="Card Title"
                      value={r.title}
                      onChange={(e) => updateReasonField(r.id, "title", e.target.value)}
                      placeholder="e.g. Single-Point Responsibility"
                    />

                    <TextAreaField
                      label="Description"
                      value={r.desc}
                      onChange={(e) => updateReasonField(r.id, "desc", e.target.value)}
                      placeholder="e.g. One engineering team coordinating..."
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
