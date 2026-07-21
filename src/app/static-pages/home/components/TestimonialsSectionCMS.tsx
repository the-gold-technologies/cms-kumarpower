"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Testimonial = {
  id: string;
  headerTitle: string;
  name: string;
  role: string;
  quote: string;
  logo: string;
};

export function TestimonialsSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [heading, setHeading] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/pages/home")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const t = json.data.testimonials || {};
          if (t.heading !== undefined) setHeading(t.heading);
          if (t.subtitle !== undefined) setSubtitle(t.subtitle);
          if (Array.isArray(t.items)) setItems(t.items);
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (id: string, field: keyof Testimonial, val: string) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
  };

  const addTestimonial = () => {
    const newId = `test-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      { id: newId, headerTitle: "", name: "", role: "", quote: "", logo: "" },
    ]);
    toast.success("New testimonial added!");
  };

  const removeTestimonial = (id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { heading, subtitle, items };
      const res = await fetch("/api/pages/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "testimonials", content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Testimonials section saved!");
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
        title="Testimonials Section"
        description="Manage customer testimonials, client logos, review quotes, and author details."
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
            label="Section Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="e.g. Real Stories. Real Power."
          />

          <TextAreaField
            label="Section Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
          />

          {/* Testimonial Cards */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Client Testimonials ({items.length} stories)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Featured client reviews shown in the testimonials section
                </p>
              </div>
              <button
                type="button"
                onClick={addTestimonial}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
              </button>
            </div>

            <div className="space-y-4">
              {items.map((t, idx) => (
                <div key={t.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                      Testimonial #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTestimonial(t.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <InputField
                    label="Header Banner Title"
                    value={t.headerTitle}
                    onChange={(e) => handleChange(t.id, "headerTitle", e.target.value)}
                    placeholder="e.g. TESTIMONIAL BY POOJA JAIN - SHIKHERJEE JEWELLERS"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Author Name"
                      value={t.name}
                      onChange={(e) => handleChange(t.id, "name", e.target.value)}
                      placeholder="e.g. Pooja Jain"
                    />
                    <InputField
                      label="Author Company / Role"
                      value={t.role}
                      onChange={(e) => handleChange(t.id, "role", e.target.value)}
                      placeholder="e.g. Shikherjee Jewellers"
                    />
                  </div>

                  <TextAreaField
                    label="Full Review Quote"
                    value={t.quote}
                    onChange={(e) => handleChange(t.id, "quote", e.target.value)}
                    rows={4}
                  />

                  <ImageUploadField
                    label="Client Company Logo"
                    value={t.logo}
                    onChange={(val) => handleChange(t.id, "logo", val)}
                  />
                </div>
              ))}
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
