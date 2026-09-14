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
  Quote,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  User,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";

export interface TestimonialCMSItem {
  id: string;
  headerText: string;
  authorName: string;
  companyName: string;
  logo: string | File;
  quote: string;
}

interface LandingTestimonialsCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function LandingTestimonialsCMS({
  saveUrl = "/api/home",
  responseKey = "testimonials",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: LandingTestimonialsCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    testimonials: TestimonialCMSItem[];
  }>({
    title: "Real Stories. Real Power.",
    subtitle:
      "Hear how our generators keep India powered — from Fortune 500 factories to city hospitals.",
    testimonials: [
      {
        id: "test-home-1",
        headerText: "TESTIMONIAL BY POOJA JAIN - SHIKHERJEE",
        authorName: "Pooja Jain",
        companyName: "Shikherjee Jewellers",
        logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1789376352/kumarpower_website/testimonials/shikherjee.png",
        quote:
          "At Vilandi, we make bespoke Polki jewellery with the finest syndicate polkis, coloured gemstones and even finer details. We are extremely conscious about quality and create pieces that will be cherished for generations. We manufacture all of our jewellery pieces in-house and cater to both B2B and B2C clients. Recently, I referred Mr. R. S. Kumar from M/S Kumar Generator House to Mr Abhishek Jain of Jainco Sphere, a real estate company developing luxury homes in Delhi NCR. They had a detailed meeting and were really impressed with the knowledge and command he had on his industry. He suggested some important changes in their existing selection of material and design of LT panels and also, some value-added services which would enrich the experience of their customers. He was so convincing and transparent with his pricing and product detailing that Mr Abhishek gave an order for 2 of his under-construction buildings for Distribution panels, LT panels and chemical earthings. Also, the execution of work at the site was carried out with thorough professionalism and in a really time-bound manner. Mr Jain was very happy to work with M/s Kumar Generator House and highly recommends his services for Best quality, Best pricing and Best services.",
      },
      {
        id: "test-home-2",
        headerText: "TESTIMONIAL BY AANCHAL SAINI, AARK WORLD",
        authorName: "Aanchal Saini",
        companyName: "AARK World Pvt. Ltd.",
        logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1789376353/kumarpower_website/testimonials/aark-world.png",
        quote:
          "RENT IT BAE is a luxury fashion rental service offering Ethnic, Western & Accessories from designer labels at a fraction of MRP. Servicing 15 cities via Website, m-site, Android & iOS apps. First to introduce Monthly Fashion Subscription in the country. The company has it's 2 Flagship Stores in New Delhi (Rajouri Garden and Greater Kailash-1). RENT IT BAE has taken the media limelight for building country's first tech driven store. We highly appreciate the fast and seamless service provided by your company. The installation of inverters for RENT IT BAE's South Delhi Flagship Store at Greater Kailash seemed a fluid task with your service. The requirement for a power back up is a must for all companies now days especially in the retail sector. You understood the requirement and delivered the apt products at a reasonable price. All was done post one phone call. No follow ups were required. The products were delivered and installed within 24 hours. We would be happy to recommend your products and service.",
      },
      {
        id: "test-home-3",
        headerText: "TESTIMONIAL BY BHARAT ANAND - BROWNGOLD",
        authorName: "Bharat Anand",
        companyName: "Browngold",
        logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1789376354/kumarpower_website/testimonials/brown-gold.png",
        quote:
          "We at BROWNGOLD are a team of young & dynamic interior designers engaged in the business of providing complete design solutions for our clients, be it individuals, architects or corporate for the last 3 decades. We have a passion of interiors which enables us in providing quality & timely delivery of our design services & products for our clients pan India. We would like to place on record our appreciation for Mr. R.S. Kumar of Kumar Generator House. We had taken their services for our 40 kva kirloskar generator & a small generator of 7 kva. We would like to take this opportunity to thank you for providing excellent advice, excellent products & excellent service. We would not hesitate to recommend Kumar Generator House to prospective clients, looking for a high level of professional service, with attention on a long term client focused relationship. We are extremely pleased & look forward to increasing our level of business with yourselves in the coming",
      },
    ],
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey ? json.data?.[responseKey] : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData({
              title: sectionData.title ?? "Real Stories. Real Power.",
              subtitle:
                sectionData.subtitle ??
                "Hear how our generators keep India powered — from Fortune 500 factories to city hospitals.",
              testimonials:
                Array.isArray(sectionData.testimonials) && sectionData.testimonials.length > 0
                  ? sectionData.testimonials
                  : formData.testimonials,
            });
            if (Array.isArray(sectionData.testimonials) && sectionData.testimonials.length > 0) {
              setExpandedCard(sectionData.testimonials[0].id);
            }
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateField = (key: "title" | "subtitle", value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateTestimonial = (
    id: string,
    key: keyof TestimonialCMSItem,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addTestimonial = () => {
    const newId = `test-${Date.now()}`;
    const newItem: TestimonialCMSItem = {
      id: newId,
      headerText: "TESTIMONIAL BY CLIENT - COMPANY",
      authorName: "Client Name",
      companyName: "Company Name",
      logo: "",
      quote: "Write customer review / testimonial here...",
    };

    setFormData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, newItem],
    }));
    setExpandedCard(newId);
    toast.success("New testimonial added");
  };

  const removeTestimonial = (id: string) => {
    if (formData.testimonials.length <= 1) {
      toast.error("You must keep at least 1 testimonial.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((item) => item.id !== id),
    }));
    toast.success("Testimonial removed");
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

      if (payload.testimonials) {
        setFormData((prev) => ({ ...prev, testimonials: payload.testimonials }));
      }

      clearCache(saveUrl);
      setSaved(true);
      toast.success("Landing Testimonials saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      toast.error(err.message || "Failed to save testimonials");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="11. Real Stories. Real Power. (Customer Testimonials)"
        description="Manage the featured customer feedback cards displayed immediately before the consultation section on the home page."
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-6 pt-1">
          {/* Section Header Controls */}
          <div className="bg-slate-50/60 p-5 rounded-xl border border-slate-200/60 space-y-4">
            <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase">
              Section Heading & Subtitle
            </h4>
            <InputField
              label="Section Main Title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Real Stories. Real Power."
            />
            <TextAreaField
              label="Section Subtitle"
              value={formData.subtitle}
              onChange={(e) => updateField("subtitle", e.target.value)}
              rows={2}
              placeholder="Hear how our generators keep India powered..."
            />
          </div>

          {/* Testimonial Cards List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                Customer Testimonials ({formData.testimonials.length})
              </h4>
              <button
                type="button"
                onClick={addTestimonial}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#2D6FBA]/10 text-[#2D6FBA] hover:bg-[#2D6FBA]/20 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Testimonial
              </button>
            </div>

            {formData.testimonials.map((item, index) => {
              const isExpanded = expandedCard === item.id;

              return (
                <div
                  key={item.id}
                  className="border border-slate-200/80 rounded-xl overflow-hidden bg-white transition hover:border-slate-300"
                >
                  {/* Card Collapsible Header */}
                  <div
                    onClick={() =>
                      setExpandedCard(isExpanded ? null : item.id)
                    }
                    className="p-4 bg-slate-50/80 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          {item.authorName || "Unnamed Client"}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {item.companyName || "No Company Specified"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTestimonial(item.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition rounded-lg hover:bg-white"
                        title="Delete testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-slate-600 transition"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Form Fields */}
                  {isExpanded && (
                    <div className="p-5 space-y-4 border-t border-slate-200/60 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label="Header Banner Label"
                          value={item.headerText}
                          onChange={(e) =>
                            updateTestimonial(
                              item.id,
                              "headerText",
                              e.target.value
                            )
                          }
                          placeholder="TESTIMONIAL BY POOJA JAIN - SHIKHERJEE"
                        />
                        <InputField
                          label="Author Name"
                          value={item.authorName}
                          onChange={(e) =>
                            updateTestimonial(
                              item.id,
                              "authorName",
                              e.target.value
                            )
                          }
                          placeholder="Pooja Jain"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label="Company / Subtitle"
                          value={item.companyName}
                          onChange={(e) =>
                            updateTestimonial(
                              item.id,
                              "companyName",
                              e.target.value
                            )
                          }
                          placeholder="Shikherjee Jewellers"
                        />
                        <ImageUploadField
                          label="Client Logo"
                          value={item.logo}
                          onChange={(val) =>
                            updateTestimonial(item.id, "logo", val)
                          }
                        />
                      </div>

                      <TextAreaField
                        label="Testimonial Quote / Content"
                        value={item.quote}
                        onChange={(e) =>
                          updateTestimonial(item.id, "quote", e.target.value)
                        }
                        rows={5}
                        placeholder="Paste the full testimonial here..."
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Row */}
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
