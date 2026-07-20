"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function TestimonialsSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "What Our Clients Say",
    subtitle: "Trusted by leading corporations and government enterprises across India",
    client1Name: "Vikram Malhotra",
    client1Role: "GM Operations, GMR Infrastructure",
    client1Quote: "Kumar Power delivered 2 units of 250 kVA Kirloskar DG sets with flawless installation. Their emergency response team is outstanding.",
    client2Name: "Sunita Sharma",
    client2Role: "Facility Head, Apollo Hospitals",
    client2Quote: "The AMC service provided by Kumar Power keeps our backup generators in 100% top condition 24 hours a day.",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Testimonials section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Client Testimonials Section"
        description="Manage client reviews and corporate testimonials."
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
            label="Section Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <TextAreaField
            label="Section Subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            rows={2}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Testimonial 1</span>
              <InputField
                label="Client Name"
                value={formData.client1Name}
                onChange={(e) => setFormData({ ...formData, client1Name: e.target.value })}
              />
              <InputField
                label="Designation / Company"
                value={formData.client1Role}
                onChange={(e) => setFormData({ ...formData, client1Role: e.target.value })}
              />
              <TextAreaField
                label="Review Quote"
                value={formData.client1Quote}
                onChange={(e) => setFormData({ ...formData, client1Quote: e.target.value })}
                rows={3}
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#a0004f] uppercase">Testimonial 2</span>
              <InputField
                label="Client Name"
                value={formData.client2Name}
                onChange={(e) => setFormData({ ...formData, client2Name: e.target.value })}
              />
              <InputField
                label="Designation / Company"
                value={formData.client2Role}
                onChange={(e) => setFormData({ ...formData, client2Role: e.target.value })}
              />
              <TextAreaField
                label="Review Quote"
                value={formData.client2Quote}
                onChange={(e) => setFormData({ ...formData, client2Quote: e.target.value })}
                rows={3}
              />
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
