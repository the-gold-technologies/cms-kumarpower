"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function AboutHeroSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Know About Kumar Power",
    subtitle: "–Trusted Name in Power Solutions Industry",
    image: "",
    paragraph1:
      "Kumar Power is a premier Kirloskar-certified power partner with over 30+ years of excellence in providing comprehensive power solutions across India. Established in 1995, we have grown to become one of the most trusted names in power generation equipment and services.",
    paragraph2:
      "Our expertise spans across sales, installation, commissioning, and maintenance of diesel generators, ensuring uninterrupted power supply for critical operations, our expertise spans across SITC (Supply, Installation, Testing & Commissioning) and end-to-end power solutions.",
    paragraph3:
      "As an authorized dealer and service provider for Kirloskar Green generators, we bring the reliability and efficiency of world-class power solutions to our clients. Our team of certified engineers and technicians ensures that every installation meets the highest standards of performance and safety.",
    paragraph4:
      "With a customer-first approach and commitment to excellence, Kumar Power has successfully delivered over 10000+ power solutions across the country, building lasting relationships with our clients through exceptional service and support.",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="1. Hero Intro Section ('Know About Kumar Power')"
        description="Manage the top overview title, subtitle, facility showcase image, and introductory paragraphs."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Main Heading"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <InputField
              label="Subtitle Tagline"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <ImageUploadField
            label="Facility Showcase Image"
            value={formData.image}
            onChange={(val) => setFormData({ ...formData, image: val })}
          />

          <TextAreaField
            label="Paragraph 1 (Establishment & Background)"
            value={formData.paragraph1}
            onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
            rows={3}
          />
          <TextAreaField
            label="Paragraph 2 (SITC & Power Solutions)"
            value={formData.paragraph2}
            onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
            rows={3}
          />
          <TextAreaField
            label="Paragraph 3 (Authorized Dealer & Service)"
            value={formData.paragraph3}
            onChange={(e) => setFormData({ ...formData, paragraph3: e.target.value })}
            rows={3}
          />
          <TextAreaField
            label="Paragraph 4 (Delivery & Customer Approach)"
            value={formData.paragraph4}
            onChange={(e) => setFormData({ ...formData, paragraph4: e.target.value })}
            rows={3}
          />

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
