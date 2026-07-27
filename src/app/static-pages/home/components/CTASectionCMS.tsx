"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { uploadFilesDeep } from "@/lib/uploadHelpers";
import { InputField } from "@/components/InputField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

interface CTASectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function CTASectionCMS({
  saveUrl = "/api/home",
  responseKey = "cta",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: CTASectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    primaryBtnLabel: string;
    primaryBtnUrl: string;
    whatsappBtnLabel: string;
    whatsappNumber: string;
    backgroundImage: string | File;
  }>({
    title: "",
    primaryBtnLabel: "",
    primaryBtnUrl: "",
    whatsappBtnLabel: "",
    whatsappNumber: "",
    backgroundImage: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const cta = responseKey ? json.data?.[responseKey] : json.data;
          if (cta && typeof cta === "object") {
            setFormData((prev) => ({
              ...prev,
              ...Object.fromEntries(Object.entries(cta).filter(([k]) => k in prev)),
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = await uploadFilesDeep(formData);
      if (payload.backgroundImage && typeof payload.backgroundImage === "string") {
        setFormData(prev => ({ ...prev, backgroundImage: payload.backgroundImage }));
      }

      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("CTA section saved!");
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
        title="CTA Assistance Section"
        description="Configure the mid-page 'Need Expert Assistance?' banner, buttons, WhatsApp number & background image."
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
            label="Banner Headline"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Need Expert Assistance?"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Primary Button Label"
              value={formData.primaryBtnLabel}
              onChange={(e) => setFormData({ ...formData, primaryBtnLabel: e.target.value })}
              placeholder="e.g. Talk to an Expert"
            />
            <InputField
              label="Primary Button URL"
              value={formData.primaryBtnUrl}
              onChange={(e) => setFormData({ ...formData, primaryBtnUrl: e.target.value })}
              placeholder="e.g. /contact"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="WhatsApp Button Label"
              value={formData.whatsappBtnLabel}
              onChange={(e) => setFormData({ ...formData, whatsappBtnLabel: e.target.value })}
              placeholder="e.g. Connect on WhatsApp"
            />
            <InputField
              label="WhatsApp Number (with country code)"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="e.g. 919773851767"
              tooltip="Phone number formatted without + symbol (e.g. 919773851767)"
            />
          </div>

          <ImageUploadField
            label="Banner Background Image"
            value={formData.backgroundImage}
            onChange={(val) => setFormData({ ...formData, backgroundImage: val })}
          />

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
