"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

interface DGCalculatorCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function DGCalculatorCMS({
  saveUrl = "/api/home",
  responseKey = "dgCalculator",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: DGCalculatorCMSProps) {
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

  const [formData, setFormData] = useState({
    badge: "",
    heading: "",
    subheading: "",
    inputLabel: "",
    inputSubtext: "",
    presets: "",
    powerFactor: 0.8,
    surgeMarginPercent: 30,
    complianceBadge: "",
    availableRatings: "",
    ctaButtonText: "",
    specsButtonText: "",
    specsButtonUrl: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey
            ? json.data?.[responseKey]
            : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData({
              badge: sectionData.badge ?? "",
              heading: sectionData.heading ?? "",
              subheading: sectionData.subheading ?? "",
              inputLabel: sectionData.inputLabel ?? "",
              inputSubtext: sectionData.inputSubtext ?? "",
              presets: Array.isArray(sectionData.presets)
                ? sectionData.presets.join(", ")
                : (sectionData.presets ?? ""),
              powerFactor: Number(sectionData.powerFactor ?? 0.8),
              surgeMarginPercent: Number(sectionData.surgeMarginPercent ?? 30),
              complianceBadge: sectionData.complianceBadge ?? "",
              availableRatings: Array.isArray(sectionData.availableRatings)
                ? sectionData.availableRatings.join(", ")
                : (sectionData.availableRatings ?? ""),
              ctaButtonText: sectionData.ctaButtonText ?? "",
              specsButtonText: sectionData.specsButtonText ?? "",
              specsButtonUrl: sectionData.specsButtonUrl ?? "",
            });
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payloadContent = {
        ...formData,
        presets: formData.presets
          .split(",")
          .map((s) => parseFloat(s.trim()))
          .filter((n) => !isNaN(n)),
        availableRatings: formData.availableRatings
          .split(",")
          .map((s) => parseFloat(s.trim()))
          .filter((n) => !isNaN(n)),
      };

      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payloadContent }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("DG Calculator settings saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save DG Calculator settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="4. DG Sizing Calculator Section"
        description="Manage the DG load sizing calculator copy, presets, calculation parameters, and available generator ratings."
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
              Section Header & Titles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Badge"
                value={formData.badge}
                onChange={(e) =>
                  setFormData({ ...formData, badge: e.target.value })
                }
                placeholder="e.g. DG Sizing Calculator"
              />
              <InputField
                label="Section Heading"
                value={formData.heading}
                onChange={(e) =>
                  setFormData({ ...formData, heading: e.target.value })
                }
                placeholder="e.g. Calculate Your Ideal DG Capacity"
              />
            </div>
            <TextAreaField
              label="Subheading Description"
              value={formData.subheading}
              onChange={(e) =>
                setFormData({ ...formData, subheading: e.target.value })
              }
              placeholder="e.g. Enter your facility connected load..."
              rows={2}
            />
          </div>

          {/* Calculator Parameters */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
              Calculator Input & Parameters
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Input Label"
                value={formData.inputLabel}
                onChange={(e) =>
                  setFormData({ ...formData, inputLabel: e.target.value })
                }
                placeholder="e.g. Total Load (kW)"
              />
              <InputField
                label="Input Subtext / Hint"
                value={formData.inputSubtext}
                onChange={(e) =>
                  setFormData({ ...formData, inputSubtext: e.target.value })
                }
                placeholder="e.g. Including any jerk load, if any"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Power Factor (PF)"
                type="number"
                step="0.05"
                value={formData.powerFactor.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    powerFactor: parseFloat(e.target.value) || 0.8,
                  })
                }
                placeholder="0.8"
              />
              <InputField
                label="Surge / Safety Margin (%)"
                type="number"
                step="1"
                value={formData.surgeMarginPercent.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    surgeMarginPercent: parseFloat(e.target.value) || 30,
                  })
                }
                placeholder="30"
              />
            </div>

            <InputField
              label="Quick Presets (kW, comma-separated)"
              value={formData.presets}
              onChange={(e) =>
                setFormData({ ...formData, presets: e.target.value })
              }
              placeholder="10, 25, 50, 100, 150, 250, 500"
            />
          </div>

          {/* Product Range & CTAs */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
              Available Product Ratings & CTAs
            </p>
            <InputField
              label="Available Kirloskar Ratings (kVA, comma-separated)"
              value={formData.availableRatings}
              onChange={(e) =>
                setFormData({ ...formData, availableRatings: e.target.value })
              }
              placeholder="7.5, 10, 12.5, 15, 20, 25, 30, 35, 40, 45, 50, 62.5, 75, 82.5, 100, 125, 160, 200, 250, 320, 380, 400, 500, 600, 625, 750, 1010, 1250, 1500, 2000"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Compliance Badge"
                value={formData.complianceBadge}
                onChange={(e) =>
                  setFormData({ ...formData, complianceBadge: e.target.value })
                }
                placeholder="Kirloskar CPCB IV+ Compliant DG Set"
              />
              <InputField
                label="Quote CTA Text ({kva} is replaced)"
                value={formData.ctaButtonText}
                onChange={(e) =>
                  setFormData({ ...formData, ctaButtonText: e.target.value })
                }
                placeholder="Get Instant Quote for {kva} kVA"
              />
              <InputField
                label="Specs Button Text"
                value={formData.specsButtonText}
                onChange={(e) =>
                  setFormData({ ...formData, specsButtonText: e.target.value })
                }
                placeholder="View Specs"
              />
            </div>

            <InputField
              label="Specs Button URL"
              value={formData.specsButtonUrl}
              onChange={(e) =>
                setFormData({ ...formData, specsButtonUrl: e.target.value })
              }
              placeholder="/products/kirloskar-diesel-generator"
            />
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
