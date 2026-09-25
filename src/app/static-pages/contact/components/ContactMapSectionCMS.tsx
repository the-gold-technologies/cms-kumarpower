"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";

interface ContactMapSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function ContactMapSectionCMS({
  saveUrl = "/api/contact",
  responseKey = "map",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: ContactMapSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    embedUrl: "",
    cardTitle: "",
    address: "",
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const map = responseKey ? json.data?.[responseKey] : json.data;
          if (map && typeof map === "object") {
            setFormData({
              embedUrl: map.embedUrl ?? "",
              cardTitle: map.cardTitle ?? "",
              address: map.address ?? "",
            });
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

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
      toast.success("Office map section saved!");
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
        title="4. Office Location & Map Section"
        description="Manage the Google Maps embed URL, overlay card title, and displayed office address."
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
            label="Overlay Card Title"
            value={formData.cardTitle}
            onChange={(e) => setFormData({ ...formData, cardTitle: e.target.value })}
            placeholder="e.g. Our Office"
          />

          <TextAreaField
            label="Displayed Office Address (Overlay Card)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter office address (supports multiple lines)..."
            rows={2}
          />

          <TextAreaField
            label="Google Maps Embed URL (iframe src)"
            value={formData.embedUrl}
            onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
            placeholder="https://www.google.com/maps/embed?pb=..."
            rows={3}
          />

          {formData.embedUrl && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#2D6FBA]" />
                <span>Live Map Preview</span>
              </div>
              <div className="h-48 w-full rounded-lg overflow-hidden border border-slate-200 bg-white">
                <iframe
                  src={formData.embedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Map Preview"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
