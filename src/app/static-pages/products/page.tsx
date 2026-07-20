"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type ProductCategory = {
  id: string;
  name: string;
  range: string;
  fuelType: string;
  cooling: string;
  phase: string;
  image: string;
  description: string;
  productLink: string;
};

type FeatureCard = {
  id: string;
  title: string;
  description: string;
};

const INITIAL_CATEGORIES: ProductCategory[] = [
  {
    id: "cat-1",
    name: "Kirloskar Diesel Generators",
    range: "7.5 kVA to 20 kVA",
    fuelType: "Diesel",
    cooling: "Liquid",
    phase: "Three Phase",
    image: "",
    description: "Our range of diesel generators are designed for maximum performance and reliability. Meets latest CPCB-IV+ norms.",
    productLink: "/products/kirloskar-diesel-generator",
  },
  {
    id: "cat-2",
    name: "Kirloskar Gas Generators",
    range: "15 kVA to 250 kVA",
    fuelType: "Natural Gas/CNG",
    cooling: "Liquid",
    phase: "Single/Three Phase",
    image: "",
    description: "Eco-friendly and efficient gas generators providing clean power with lower emissions and reduced operating costs.",
    productLink: "/products/kirloskar-gas-generator",
  },
  {
    id: "cat-3",
    name: "Kirloskar Portable Generators",
    range: "2.1 kVA to 5 kVA",
    fuelType: "Gasoline",
    cooling: "Air",
    phase: "Single Phase",
    image: "",
    description: "Compact and versatile generators perfect for homes, small businesses, construction sites, and outdoor events.",
    productLink: "/products/kirloskar-portable-generator",
  },
  {
    id: "cat-4",
    name: "Kirloskar Optiprime Generator",
    range: "100 kVA",
    fuelType: "Diesel",
    cooling: "Liquid",
    phase: "Three Phase",
    image: "",
    description: "Advanced generators offering superior fuel efficiency and smart monitoring for optimized performance.",
    productLink: "/products/optiprime",
  },
  {
    id: "cat-5",
    name: "AMF Panels",
    range: "Various",
    fuelType: "N/A",
    cooling: "Fan/Natural",
    phase: "Three Phase",
    image: "",
    description: "High-quality electrical panels for power distribution, control, and protection of your electrical systems.",
    productLink: "/products/panels",
  },
  {
    id: "cat-6",
    name: "Oil Cooled Servo Stabilizers",
    range: "5-100 kVA",
    fuelType: "N/A",
    cooling: "Air/Oil",
    phase: "Single Phase",
    image: "",
    description: "Reliable servo stabilizers to protect your equipment from voltage fluctuations and ensure consistent power supply.",
    productLink: "/products/servo-stabilizer",
  },
  {
    id: "cat-7",
    name: "Distribution Transformers",
    range: "100-2500 kVA",
    fuelType: "N/A",
    cooling: "Oil/Dry",
    phase: "Three Phase",
    image: "",
    description: "Durable and efficient transformers designed for various industrial and commercial applications.",
    productLink: "/products/transformers",
  },
];

const INITIAL_FEATURES: FeatureCard[] = [
  { id: "feat-1", title: "Unmatched Reliability", description: "Engineered for 24/7 operation with redundant systems and fail-safe mechanisms." },
  { id: "feat-2", title: "Fuel Efficiency", description: "Advanced engine technology delivers optimal fuel consumption and lower operating costs." },
  { id: "feat-3", title: "Rapid Response", description: "Quick start capability ensures minimal downtime during power outages." },
  { id: "feat-4", title: "Low Noise Operation", description: "Acoustic engineering reduces noise levels for urban and sensitive environments." },
  { id: "feat-5", title: "Easy Maintenance", description: "Modular design with accessible components simplifies service and maintenance." },
  { id: "feat-6", title: "Smart Controls", description: "Advanced digital interfaces with remote monitoring and diagnostic capabilities." },
];

export default function ProductsStaticPageCMS() {
  // Section Open states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isCatsOpen, setIsCatsOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isFeatOpen, setIsFeatOpen] = useState(false);
  const [isCtaOpen, setIsCtaOpen] = useState(false);

  // Saving states per section
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingCats, setSavingCats] = useState(false);
  const [savedCats, setSavedCats] = useState(false);

  const [savingPdf, setSavingPdf] = useState(false);
  const [savedPdf, setSavedPdf] = useState(false);

  const [savingFeat, setSavingFeat] = useState(false);
  const [savedFeat, setSavedFeat] = useState(false);

  const [savingCta, setSavingCta] = useState(false);
  const [savedCta, setSavedCta] = useState(false);

  // Hero Section
  const [heroHeading, setHeroHeading] = useState("Powering Progress, One Generator at a Time");
  const [heroSub, setHeroSub] = useState("Explore our full range of Kirloskar-certified diesel generators, trusted across India's most demanding industries.");
  const [heroBg, setHeroBg] = useState("");
  const [heroCataloguePdf, setHeroCataloguePdf] = useState("");
  const [heroPrimaryCtaLabel, setHeroPrimaryCtaLabel] = useState("Request a Quote");
  const [heroPrimaryCtaUrl, setHeroPrimaryCtaUrl] = useState("/contact");

  // Product Categories
  const [categories, setCategories] = useState<ProductCategory[]>(INITIAL_CATEGORIES);

  // Compliance PDFs
  const [bharatPdf, setBharatPdf] = useState("");
  const [direction76Pdf, setDirection76Pdf] = useState("");

  // Why Choose Features
  const [features, setFeatures] = useState<FeatureCard[]>(INITIAL_FEATURES);

  // Bottom CTA Section
  const [ctaTitle, setCtaTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [ctaDesc, setCtaDesc] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [ctaPrimaryBtnLabel, setCtaPrimaryBtnLabel] = useState("Talk to an Expert");
  const [ctaPrimaryBtnUrl, setCtaPrimaryBtnUrl] = useState("/contact");
  const [ctaSecondaryBtnLabel, setCtaSecondaryBtnLabel] = useState("Request Quote");
  const [ctaSecondaryBtnUrl, setCtaSecondaryBtnUrl] = useState("/contact");
  const [ctaPhoneHotline, setCtaPhoneHotline] = useState("+919773877796");

  const handleCategoryChange = (id: string, field: keyof ProductCategory, val: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      { id: `cat-${Date.now()}`, name: "", range: "", fuelType: "Diesel", cooling: "Liquid", phase: "Three Phase", image: "", description: "", productLink: "/products" },
    ]);
    toast.success("New product category added!");
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Product category removed");
  };

  const handleFeatureChange = (id: string, field: keyof FeatureCard, val: string) => {
    setFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: val } : f)));
  };

  const handleSaveHero = () => {
    setSavingHero(true);
    setTimeout(() => {
      setSavingHero(false);
      setSavedHero(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSavedHero(false), 2000);
    }, 400);
  };

  const handleSaveCats = () => {
    setSavingCats(true);
    setTimeout(() => {
      setSavingCats(false);
      setSavedCats(true);
      toast.success("Product categories saved!");
      setTimeout(() => setSavedCats(false), 2000);
    }, 400);
  };

  const handleSavePdf = () => {
    setSavingPdf(true);
    setTimeout(() => {
      setSavingPdf(false);
      setSavedPdf(true);
      toast.success("Compliance PDFs saved!");
      setTimeout(() => setSavedPdf(false), 2000);
    }, 400);
  };

  const handleSaveFeat = () => {
    setSavingFeat(true);
    setTimeout(() => {
      setSavingFeat(false);
      setSavedFeat(true);
      toast.success("Why Choose Kirloskar features saved!");
      setTimeout(() => setSavedFeat(false), 2000);
    }, 400);
  };

  const handleSaveCta = () => {
    setSavingCta(true);
    setTimeout(() => {
      setSavingCta(false);
      setSavedCta(true);
      toast.success("CTA Assistance section saved!");
      setTimeout(() => setSavedCta(false), 2000);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Products Landing Page CMS (/products)"
        description="Manage product showcase categories, hero banner, compliance PDF downloads (Bharat Rajpat, Direction 76), features & CTA consultation banner. Expand any section to edit."
      />

      {/* 1. Hero Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Powering Progress')"
          description="Manage main heading, tagline description, CTA button & product catalogue PDF."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Hero Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <TextAreaField label="Hero Subtitle Tagline" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Background Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Primary CTA Button Label" value={heroPrimaryCtaLabel} onChange={(e) => setHeroPrimaryCtaLabel(e.target.value)} />
              <InputField label="Primary CTA Button Target Link" value={heroPrimaryCtaUrl} onChange={(e) => setHeroPrimaryCtaUrl(e.target.value)} />
            </div>
            <PDFUploadField label="Product Catalogue PDF Document" value={heroCataloguePdf} onChange={(val) => setHeroCataloguePdf(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Product Categories List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. All Product Categories (${categories.length} Categories)`}
          description="Manage generator ranges (Diesel, Gas, Portable, Optiprime, AMF Panels, Servo Stabilizers, Transformers)."
          isOpen={isCatsOpen}
          onToggle={() => setIsCatsOpen(!isCatsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isCatsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addCategory}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Product Category
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((cat, idx) => (
                <div key={cat.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Category #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeCategory(cat.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Category Name" value={cat.name} onChange={(e) => handleCategoryChange(cat.id, "name", e.target.value)} placeholder="e.g. Kirloskar Diesel Generators" />
                    <InputField label="Power Range" value={cat.range} onChange={(e) => handleCategoryChange(cat.id, "range", e.target.value)} placeholder="e.g. 7.5 kVA to 20 kVA" />
                    <InputField label="Fuel Type" value={cat.fuelType} onChange={(e) => handleCategoryChange(cat.id, "fuelType", e.target.value)} placeholder="e.g. Diesel / CNG" />
                    <InputField label="Target Link URL" value={cat.productLink} onChange={(e) => handleCategoryChange(cat.id, "productLink", e.target.value)} placeholder="e.g. /products/kirloskar-diesel-generator" />
                  </div>
                  <TextAreaField label="Category Description" value={cat.description} onChange={(e) => handleCategoryChange(cat.id, "description", e.target.value)} rows={2} />
                  <ImageUploadField label="Category Product Image" value={cat.image} onChange={(val) => handleCategoryChange(cat.id, "image", val)} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingCats} saved={savedCats} onClick={handleSaveCats} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Government Compliance PDFs */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Government Compliance PDF Documents"
          description="Manage downloadable compliance files (Bharat Rajpat PDF & Direction 76 PDF)."
          isOpen={isPdfOpen}
          onToggle={() => setIsPdfOpen(!isPdfOpen)}
        />
        <div className={`grid transition-all duration-300 ${isPdfOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <PDFUploadField label="Bharat Rajpat Compliance PDF Document" value={bharatPdf} onChange={(val) => setBharatPdf(val)} />
            <PDFUploadField label="Direction 76 PDF Document" value={direction76Pdf} onChange={(val) => setDirection76Pdf(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingPdf} saved={savedPdf} onClick={handleSavePdf} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Why Choose Kirloskar Generators */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`4. 'Why Choose Kirloskar Generators' Feature Cards (${features.length} Features)`}
          description="Manage 6 key product benefits (Unmatched Reliability, Fuel Efficiency, Rapid Response, Low Noise, etc.)."
          isOpen={isFeatOpen}
          onToggle={() => setIsFeatOpen(!isFeatOpen)}
        />
        <div className={`grid transition-all duration-300 ${isFeatOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((f, idx) => (
                <div key={f.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                    Feature #{idx + 1}
                  </span>
                  <InputField label="Feature Title" value={f.title} onChange={(e) => handleFeatureChange(f.id, "title", e.target.value)} />
                  <TextAreaField label="Description" value={f.description} onChange={(e) => handleFeatureChange(f.id, "description", e.target.value)} rows={3} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingFeat} saved={savedFeat} onClick={handleSaveFeat} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. CTA Assistance Banner & Buttons Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="5. CTA Assistance Banner & Action Buttons Section ('Need Help Choosing...?')"
          description="Manage headline, description copy, CTA buttons (Talk to an Expert, Request Quote) & hotline phone number."
          isOpen={isCtaOpen}
          onToggle={() => setIsCtaOpen(!isCtaOpen)}
        />
        <div className={`grid transition-all duration-300 ${isCtaOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="CTA Section Headline Title" value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} />
            <TextAreaField label="CTA Description Subtitle Copy" value={ctaDesc} onChange={(e) => setCtaDesc(e.target.value)} rows={2} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Primary CTA Button Label ('Talk to an Expert')" value={ctaPrimaryBtnLabel} onChange={(e) => setCtaPrimaryBtnLabel(e.target.value)} />
              <InputField label="Primary CTA Button Link URL" value={ctaPrimaryBtnUrl} onChange={(e) => setCtaPrimaryBtnUrl(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Secondary CTA Button Label ('Request Quote')" value={ctaSecondaryBtnLabel} onChange={(e) => setCtaSecondaryBtnLabel(e.target.value)} />
              <InputField label="Secondary CTA Button Link URL" value={ctaSecondaryBtnUrl} onChange={(e) => setCtaSecondaryBtnUrl(e.target.value)} />
            </div>

            <InputField label="Support Hotline Phone Number" value={ctaPhoneHotline} onChange={(e) => setCtaPhoneHotline(e.target.value)} placeholder="e.g. +919773877796" />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingCta} saved={savedCta} onClick={handleSaveCta} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
