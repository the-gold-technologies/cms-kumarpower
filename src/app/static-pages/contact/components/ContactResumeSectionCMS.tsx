"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function ContactResumeSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    resumeTitle: "",
    resumeSubtitle: "",
  });

  useEffect(() => {
    fetch("/api/pages/contact")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const resume = json.data.resume || {};
          setFormData((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(resume).filter(([k]) => k in prev)),
          }));
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/pages/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "resume", content: formData }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Resume callout saved!");
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
        title="3. Resume Drop Section"
        description="Manage resume callout headline and recruitment introduction text."
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
            onChange={(e) => setFormData({ ...formData, resumeTitle: e.target.value })}
          />
          <TextAreaField
            label="Resume Section Description"
            value={formData.resumeSubtitle}
            onChange={(e) => setFormData({ ...formData, resumeSubtitle: e.target.value })}
            rows={2}
          />

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
