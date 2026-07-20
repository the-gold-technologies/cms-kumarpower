"use client";

import { useState } from "react";
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

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    headerTitle: "TESTIMONIAL BY POOJA JAIN - SHIKHERJEE JEWELLERS",
    name: "Pooja Jain",
    role: "Shikherjee Jewellers",
    quote:
      "At Vilandl, we make bespoke Polki jewellery with the finest syndicate polkis, coloured gemstones and even finer details. We are extremely conscious about quality and create pieces that will be cherished for generations. We manufacture all of our jewellery pieces in-house and cater to both B2B and B2C clients. Recently, I referred Mr. R. S. Kumar from M/S Kumar Generator House to Mr Abhishek Jain of Jainco Sphere, a real estate company developing luxury homes in Delhi NCR. They had a detailed meeting and were really impressed with the knowledge and command he had on his industry. He suggested some important changes in their existing selection of material and design of LT panels and also, some value-added services which would enrich the experience of their customers. He was so convincing and transparent with his pricing and product detailing that Mr Abhishek gave an order for 2 of his under-construction buildings for Distribution panels, LT panels and chemical earthings. Also, the execution of work at the site was carried out with thorough professionalism and in a really time-bound manner. Mr Jain was very happy to work with M/s Kumar Generator House and highly recommends his services for Best quality, Best pricing and Best services.",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903094/Screenshot_2025-10-31_145916_tf6wvg.png",
  },
  {
    id: "test-2",
    headerTitle: "TESTIMONIAL BY AANCHAL SAINI, AARK WORLD PVT. LTD.",
    name: "Aanchal Saini",
    role: "AARK World Pvt. Ltd.",
    quote:
      "RENT IT BAE is a luxury fashion rental service offering Ethnic, Western & Accessories from designer labels at a fraction of MRP. Servicing 15 cities via Website, m-site, Android & iOS apps. First to introduce Monthly Fashion Subscription in the country. The company has it's 2 Flagship Stores in New Delhi (Rajouri Garden and Greater Kailash-1). RENT IT BAE has taken the media limelight for building country's first tech driven store. We highly appreciate the fast and seamless service provided by your company. The installation of inverters for RENT IT BAE's South Delhi Flagship Store at Greater Kailash seemed a fluid task with your service. The requirement for a power back up is a must for all companies now days especially in the retail sector. You understood the requirement and delivered the apt products at a reasonable price. All was done post one phone call. No follow ups were required. The products were delivered and installed within 24 hours. We would be happy to recommend your products and service.",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761903093/download_v9kdua.png",
  },
  {
    id: "test-3",
    headerTitle: "TESTIMONIAL BY BHARAT ANAND - BROWN GOLD",
    name: "Bharat Anand",
    role: "BROWNGOLD",
    quote:
      "We at BROWNGOLD are a team of young & dynamic interior designers engaged in the business of providing complete design solutions for our clients, be it individuals, architects or corporate for the last 3 decades. We have a passion of interiors which enables us in providing quality & timely delivery of our design services & products for our clients pan India. We would like to place on record our appreciation for Mr. R.S. Kumar of Kumar Generator House. We had taken their services for our 40 kva kirloskar generator & a small generator of 7 kva. We would like to take this opportunity to thank you for providing excellent advice, excellent products & excellent service. We would not hesitate to recommend Kumar Generator House to prospective clients, looking for a high level of professional service, with attention on a long term client focused relationship. We are extremely pleased & look forward to increasing our level of business with yourselves in the coming",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902474/Gemini_Generated_Image_1je1r11je1r11je1_ksybnh.png",
  },
];

export function TestimonialsSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [heading, setHeading] = useState("Real Stories. Real Power.");
  const [subtitle, setSubtitle] = useState(
    "Hear how our generators keep India powered — from Fortune 500 factories to city hospitals."
  );
  const [items, setItems] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

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
