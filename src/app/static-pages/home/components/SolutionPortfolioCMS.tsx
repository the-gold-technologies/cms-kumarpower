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
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

export interface PortfolioCategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string | File;
  features: string[];
  link: string;
}

interface SolutionPortfolioCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function SolutionPortfolioCMS({
  saveUrl = "/api/home",
  responseKey = "solutionPortfolio",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: SolutionPortfolioCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [newFeatureText, setNewFeatureText] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<{
    badge: string;
    title: string;
    description: string;
    categories: PortfolioCategoryItem[];
  }>({
    badge: "",
    title: "",
    description: "",
    categories: [],
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
              categories: Array.isArray(sectionData.categories)
                ? sectionData.categories
                : [],
            });
            if (Array.isArray(sectionData.categories) && sectionData.categories.length > 0) {
              setExpandedCard(sectionData.categories[0].id);
            }
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateCategoryField = (
    id: string,
    key: keyof PortfolioCategoryItem,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === id ? { ...cat, [key]: value } : cat
      ),
    }));
  };

  const addFeatureTag = (catId: string) => {
    const text = newFeatureText[catId]?.trim();
    if (!text) return;

    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === catId
          ? { ...cat, features: [...(cat.features || []), text] }
          : cat
      ),
    }));
    setNewFeatureText((prev) => ({ ...prev, [catId]: "" }));
  };

  const removeFeatureTag = (catId: string, featureIdx: number) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === catId
          ? {
              ...cat,
              features: cat.features.filter((_, idx) => idx !== featureIdx),
            }
          : cat
      ),
    }));
  };

  const addCategory = () => {
    const newId = `cat-${Date.now()}`;
    const newCategory: PortfolioCategoryItem = {
      id: newId,
      title: "New Solution Category",
      subtitle: "Short category subtitle describing operational benefit.",
      image: "",
      features: ["Feature 1", "Feature 2"],
      link: "/products",
    };

    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }));
    setExpandedCard(newId);
    toast.success("New solution category added");
  };

  const removeCategory = (id: string) => {
    if (formData.categories.length <= 1) {
      toast.error("You must keep at least 1 category card.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat.id !== id),
    }));
    toast.success("Category card removed");
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

      if (payload.categories) {
        setFormData((prev) => ({ ...prev, categories: payload.categories }));
      }

      clearCache(saveUrl);
      setSaved(true);
      toast.success("Solution Portfolio section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save solution portfolio");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="4. Solution Portfolio Section (Core Solutions)"
        description="Manage the comprehensive capability solution cards (Uninterrupted Power, Distribution, Renewable, Power Quality, Turnkey Projects) with images, subtitles, features, and links."
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
                placeholder="e.g. Comprehensive Capabilities"
              />
              <InputField
                label="Main Section Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. What Power Challenge Are You Solving?"
              />
            </div>

            <TextAreaField
              label="Description Overview"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. We structure complete electrical power systems around your specific operational challenge..."
              rows={2}
            />
          </div>

          {/* Categories Manager */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Solution Categories ({formData.categories.length} cards)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure the solution cards with image banner, subtitle, bullet features, and target link.
                </p>
              </div>
              <button
                type="button"
                onClick={addCategory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Category
              </button>
            </div>

            <div className="space-y-3">
              {formData.categories.map((cat, idx) => {
                const isExpanded = expandedCard === cat.id;

                return (
                  <div
                    key={cat.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-colors"
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => setExpandedCard(isExpanded ? null : cat.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1A6AA2] font-bold shrink-0 shadow-2xs overflow-hidden">
                          {cat.image ? (
                            <img
                              src={
                                typeof cat.image === "string"
                                  ? cat.image
                                  : URL.createObjectURL(cat.image)
                              }
                              alt={cat.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Layers className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                              CARD #{idx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {cat.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {cat.subtitle || "No subtitle"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {formData.categories.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCategory(cat.id);
                            }}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                            title="Remove category"
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

                    {/* Card Content Form */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-200 bg-white space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField
                            label="Card Title"
                            value={cat.title}
                            onChange={(e) =>
                              updateCategoryField(cat.id, "title", e.target.value)
                            }
                            placeholder="e.g. Uninterrupted Power"
                          />
                          <InputField
                            label="Target Link URL"
                            value={cat.link}
                            onChange={(e) =>
                              updateCategoryField(cat.id, "link", e.target.value)
                            }
                            placeholder="e.g. /products/kirloskar-diesel-generator"
                          />
                        </div>

                        <TextAreaField
                          label="Subtitle / Problem Statement"
                          value={cat.subtitle}
                          onChange={(e) =>
                            updateCategoryField(cat.id, "subtitle", e.target.value)
                          }
                          placeholder="e.g. For facilities where downtime causes massive financial loss."
                          rows={2}
                        />

                        {/* Image Banner */}
                        <div className="pt-2 border-t border-slate-100">
                          <ImageUploadField
                            label="Card Banner Visual Image"
                            value={cat.image}
                            onChange={(val) => updateCategoryField(cat.id, "image", val)}
                            tooltip="Upload photo displayed at the top of the card"
                          />
                        </div>

                        {/* Features Bullet List */}
                        <div className="space-y-3 pt-2 border-t border-slate-100">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Key Equipment / Bullet Points ({cat.features?.length || 0} items)
                          </label>

                          <div className="flex flex-wrap gap-2">
                            {(cat.features || []).map((feat, featIdx) => (
                              <div
                                key={featIdx}
                                className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6AA2]" />
                                <span>{feat}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFeatureTag(cat.id, featIdx)}
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
                              value={newFeatureText[cat.id] || ""}
                              onChange={(e) =>
                                setNewFeatureText({
                                  ...newFeatureText,
                                  [cat.id]: e.target.value,
                                })
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addFeatureTag(cat.id);
                                }
                              }}
                              placeholder="Add feature (e.g. CPCB IV+ Gensets)"
                              className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-[#1A6AA2] focus:bg-white transition"
                            />
                            <button
                              type="button"
                              onClick={() => addFeatureTag(cat.id)}
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
