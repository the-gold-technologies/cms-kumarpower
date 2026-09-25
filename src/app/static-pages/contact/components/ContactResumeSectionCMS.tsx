"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, Shield, TrendingUp, Sliders } from "lucide-react";
import toast from "react-hot-toast";

interface ContactResumeSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface PerkItem {
  id?: string;
  title: string;
  description: string;
}

const PERK_ICONS = [Shield, TrendingUp, Sliders];

export function ContactResumeSectionCMS({
  saveUrl = "/api/contact",
  responseKey = "resume",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: ContactResumeSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else
      setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<{
    resumeTitle: string;
    resumeSubtitle: string;
    perks: PerkItem[];
  }>({
    resumeTitle: "",
    resumeSubtitle: "",
    perks: [],
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const resume = responseKey ? json.data?.[responseKey] : json.data;
          if (resume && typeof resume === "object") {
            setFormData({
              resumeTitle: resume.resumeTitle ?? "",
              resumeSubtitle: resume.resumeSubtitle ?? "",
              perks: Array.isArray(resume.perks) ? resume.perks : [],
            });
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updatePerk = (
    index: number,
    field: "title" | "description",
    val: string,
  ) => {
    const updated = [...formData.perks];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, perks: updated });
  };

  const addPerk = () => {
    setFormData({
      ...formData,
      perks: [
        ...formData.perks,
        { id: `perk-${Date.now()}`, title: "", description: "" },
      ],
    });
  };

  const removePerk = (index: number) => {
    setFormData({
      ...formData,
      perks: formData.perks.filter((_, i) => i !== index),
    });
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
      toast.success("Resume & benefits section saved!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="3. Resume Drop & Career Perks Section"
        description="Manage the recruitment headline, description, and the company benefits/perks cards shown beside the resume form."
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
          <InputField
            label="Resume Section Title"
            value={formData.resumeTitle}
            onChange={(e) =>
              setFormData({ ...formData, resumeTitle: e.target.value })
            }
            placeholder="e.g. Drop Your Resume"
          />
          <TextAreaField
            label="Resume Section Description"
            value={formData.resumeSubtitle}
            onChange={(e) =>
              setFormData({ ...formData, resumeSubtitle: e.target.value })
            }
            placeholder="Enter introduction text for candidates..."
            rows={2}
          />

          {/* Perks / Benefits Section */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Career Highlights & Benefits (Left Column Cards)
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  These feature items appear with round icons next to the resume
                  application form.
                </p>
              </div>
              <button
                type="button"
                onClick={addPerk}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-[#2D6FBA] hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {formData.perks.map((perk, idx) => {
                const IconComponent = PERK_ICONS[idx % PERK_ICONS.length];
                return (
                  <div
                    key={perk.id || idx}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#2D6FBA]/10 flex items-center justify-center">
                          <IconComponent className="w-3.5 h-3.5 text-[#2D6FBA]" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          Benefit Item {idx + 1}
                        </span>
                      </div>
                      {formData.perks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePerk(idx)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputField
                        label="Title"
                        value={perk.title}
                        onChange={(e) =>
                          updatePerk(idx, "title", e.target.value)
                        }
                        placeholder="e.g. Industry Leading Company"
                      />
                      <InputField
                        label="Subtitle / Description"
                        value={perk.description}
                        onChange={(e) =>
                          updatePerk(idx, "description", e.target.value)
                        }
                        placeholder="e.g. One of India's most respected power generation brands"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton
              isSaving={isSaving}
              saved={saved}
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
