"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  Award,
  ShieldCheck,
  Zap,
  Globe2,
  Trophy,
  Clock,
  Users,
  Building,
  Activity,
  Plus,
  Trash2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const AVAILABLE_ICONS: Record<string, any> = {
  Award,
  ShieldCheck,
  Zap,
  Globe2,
  Trophy,
  Clock,
  Users,
  Building,
  Activity,
  TrendingUp,
  Sparkles,
};

export interface StatItem {
  id: string;
  icon: string;
  value: string;
  unit: string;
  label: string;
  subtext: string;
}

interface NumbersCredibilityCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function NumbersCredibilityCMS({
  saveUrl = "/api/home",
  responseKey = "numbersCredibility",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: NumbersCredibilityCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<{
    stats: StatItem[];
  }>({
    stats: [],
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey ? json.data?.[responseKey] : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData({
              stats: Array.isArray(sectionData.stats) ? sectionData.stats : [],
            });
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateStatField = (
    id: string,
    key: keyof StatItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.map((st) =>
        st.id === id ? { ...st, [key]: value } : st
      ),
    }));
  };

  const addStat = () => {
    const newId = `stat-${Date.now()}`;
    const newStat: StatItem = {
      id: newId,
      icon: "Trophy",
      value: "100+",
      unit: "Metric",
      label: "Metric Description",
      subtext: "Additional credibility context...",
    };

    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, newStat],
    }));
    toast.success("New stat counter added");
  };

  const removeStat = (id: string) => {
    if (formData.stats.length <= 1) {
      toast.error("You must keep at least 1 stat counter.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((st) => st.id !== id),
    }));
    toast.success("Stat counter removed");
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
      toast.success("Numbers & Credibility section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save numbers & credibility section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="8. Numbers & Credibility Section (High-Impact Stat Band)"
        description="Manage the 4 high-impact credibility stat counters (30+ Years Experience, 5,000+ Projects, 250+ MW Portfolio, Pan-India Reach) displayed on the deep navy stat band."
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
          {/* Stats List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Stat Counter Cards ({formData.stats.length} metrics)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure numerical achievements, metric units, labels, and descriptive subtexts.
                </p>
              </div>
              <button
                type="button"
                onClick={addStat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Metric
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.stats.map((st, idx) => {
                const CurrentIcon = AVAILABLE_ICONS[st.icon] || Award;

                return (
                  <div
                    key={st.id}
                    className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-5 space-y-4 relative group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                          <CurrentIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                            METRIC #{idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white">
                            {st.value} — {st.label || "Untitled"}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={st.icon}
                          onChange={(e) => updateStatField(st.id, "icon", e.target.value)}
                          aria-label="Select Stat Icon"
                          className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none focus:border-blue-400"
                        >
                          {Object.keys(AVAILABLE_ICONS).map((iconKey) => (
                            <option key={iconKey} value={iconKey}>
                              {iconKey}
                            </option>
                          ))}
                        </select>

                        {formData.stats.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStat(st.id)}
                            className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-rose-400 transition cursor-pointer"
                            title="Remove stat"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Value / Counter
                        </label>
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => updateStatField(st.id, "value", e.target.value)}
                          placeholder="e.g. 30+"
                          className="w-full bg-slate-800/80 border border-slate-700 text-white font-bold text-sm rounded-xl px-3 py-2 outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Unit / Tag
                        </label>
                        <input
                          type="text"
                          value={st.unit}
                          onChange={(e) => updateStatField(st.id, "unit", e.target.value)}
                          placeholder="e.g. Years / MW"
                          className="w-full bg-slate-800/80 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                        Stat Label / Title
                      </label>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => updateStatField(st.id, "label", e.target.value)}
                        placeholder="e.g. Years of Experience"
                        className="w-full bg-slate-800/80 border border-slate-700 text-white font-medium text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Subtext / Context
                      </label>
                      <textarea
                        value={st.subtext}
                        onChange={(e) => updateStatField(st.id, "subtext", e.target.value)}
                        placeholder="e.g. Delivering reliable electrical infrastructure since 1985."
                        rows={2}
                        className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-400 resize-none"
                      />
                    </div>
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
