"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { uploadFilesDeep } from "@/lib/uploadHelpers";

type SolarCard = {
  id: string;
  name: string;
  powerRating: string;
  efficiency: string;
  cellType: string;
  technology: string;
  warranty: string;
  rating?: number;
  ratingCount?: number;
  image: string | File;
  description: string;
  technicalSpecs: string;
  applications: string;
  brochurePdf?: string | File;
};

const API_ENDPOINT = "/api/solar";
const SECTION_TYPE = "solar";

export default function SolarCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingSection, setSavingSection] = useState(false);
  const [savedSection, setSavedSection] = useState(false);
  const [savingProducts, setSavingProducts] = useState(false);
  const [savedProducts, setSavedProducts] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("High-Efficiency");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Solar Panels & Systems");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState(
    "Tier-1 Mono PERC and TOPCon Bifacial solar photovoltaic panels engineered for commercial, industrial, and residential rooftop clean energy generation."
  );
  const [heroBg, setHeroBg] = useState<string | File>("");

  // Section Header
  const [sectionTitle, setSectionTitle] = useState("Solar Photovoltaic Panel Range");
  const [sectionDesc, setSectionDesc] = useState(
    "Harness clean solar energy with Tier-1 high-efficiency panels engineered for maximum yield, DG synchronization, and seamless integration with Kumar Power BESS."
  );

  // Solar Products List
  const [products, setProducts] = useState<SolarCard[]>([]);

  useEffect(() => {
    fetchWithCache(API_ENDPOINT)
      .then((json) => {
        if (json.success && json.data) {
          const data = json.data[SECTION_TYPE] || json.data.products || json.data;
          if (data.heroHeadingPart1 !== undefined) setHeroHeadingPart1(data.heroHeadingPart1);
          if (data.heroHeadingPart2 !== undefined) setHeroHeadingPart2(data.heroHeadingPart2);
          if (data.heroHeading !== undefined) setHeroHeading(data.heroHeading);
          if (data.heroSub !== undefined) setHeroSub(data.heroSub);
          if (data.heroBg !== undefined) setHeroBg(data.heroBg);
          if (data.sectionTitle !== undefined) setSectionTitle(data.sectionTitle);
          if (data.sectionDesc !== undefined) setSectionDesc(data.sectionDesc);
          if (Array.isArray(data.products)) setProducts(data.products);
        }
      })
      .catch(console.error);
  }, []);

  const saveAllToDB = async () => {
    const rawPayload = {
      heroHeadingPart1,
      heroHeadingPart2,
      heroHeading: `${heroHeadingPart1} ${heroHeadingPart2}`.trim() || heroHeading,
      heroSub,
      heroBg,
      sectionTitle,
      sectionDesc,
      products,
    };

    const payload = await uploadFilesDeep(rawPayload);

    if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
    if (payload.products) setProducts(payload.products);

    const res = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: SECTION_TYPE, content: payload }),
    });

    if (res.ok) {
      clearCache(API_ENDPOINT);
      toast.success("Solar page updated successfully!");
    } else {
      toast.error("Failed to save Solar page");
    }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    await saveAllToDB();
    setSavingHero(false);
    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 2000);
  };

  const handleSaveSection = async () => {
    setSavingSection(true);
    await saveAllToDB();
    setSavingSection(false);
    setSavedSection(true);
    setTimeout(() => setSavedSection(false), 2000);
  };

  const handleSaveProducts = async () => {
    setSavingProducts(true);
    await saveAllToDB();
    setSavingProducts(false);
    setSavedProducts(true);
    setTimeout(() => setSavedProducts(false), 2000);
  };

  const handleProductChange = (id: string, field: keyof SolarCard, val: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const addProduct = () => {
    const newId = `solar-${Date.now()}`;
    setProducts((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        powerRating: "550 Watt",
        efficiency: "21.5%",
        cellType: "Mono PERC",
        technology: "Half-Cut Cells",
        warranty: "25 Yrs Performance",
        rating: 4.9,
        ratingCount: 150,
        image: "",
        description: "",
        technicalSpecs: "",
        applications: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New Solar model added!");
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Solar model removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Solar Panels & Systems CMS (/products/solar)"
        description="Manage Solar banner text, product models, efficiency, technical parameters & brochures."
      />

      {/* 1. Hero Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section"
          description="Manage page headline (regular and colored parts) & tagline description."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="High-Efficiency" />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="Solar Panels & Systems" />
            </div>
            <TextAreaField label="Hero Tagline Subtitle" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Image Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Section Heading */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="2. Product Section Titles"
          description="Manage main section title and description above the product cards."
          isOpen={isSectionOpen}
          onToggle={() => setIsSectionOpen(!isSectionOpen)}
        />
        <div className={`grid transition-all duration-300 ${isSectionOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Section Title" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} placeholder="Solar Photovoltaic Panel Range" />
            <TextAreaField label="Section Description" value={sectionDesc} onChange={(e) => setSectionDesc(e.target.value)} rows={2} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingSection} saved={savedSection} onClick={handleSaveSection} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Solar Products List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. Solar Models (${products.length} Models)`}
          description="Manage solar product models, efficiency, cell types, specs & images."
          isOpen={isProductsOpen}
          onToggle={() => setIsProductsOpen(!isProductsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isProductsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Solar Model
              </button>
            </div>

            <div className="space-y-4">
              {products.map((p, idx) => (
                <div key={p.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Solar Model #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeProduct(p.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Model Name" value={p.name} onChange={(e) => handleProductChange(p.id, "name", e.target.value)} placeholder="e.g. 550W Tier-1 Mono PERC Solar Panel" />
                    <InputField label="Power Rating (e.g. 550 Watt)" value={p.powerRating} onChange={(e) => handleProductChange(p.id, "powerRating", e.target.value)} placeholder="550 Watt" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InputField label="Efficiency (%)" value={p.efficiency} onChange={(e) => handleProductChange(p.id, "efficiency", e.target.value)} placeholder="21.3%" />
                    <InputField label="Cell Type" value={p.cellType} onChange={(e) => handleProductChange(p.id, "cellType", e.target.value)} placeholder="Mono PERC 182mm" />
                    <InputField label="Technology" value={p.technology} onChange={(e) => handleProductChange(p.id, "technology", e.target.value)} placeholder="144 Half-Cut Cells" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Warranty" value={p.warranty} onChange={(e) => handleProductChange(p.id, "warranty", e.target.value)} placeholder="25 Yrs Performance" />
                    <InputField label="Recommended Applications" value={p.applications || ""} onChange={(e) => handleProductChange(p.id, "applications", e.target.value)} placeholder="Commercial Complexes, Sheds, Warehouses" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField label="Model Image Graphic" value={p.image} onChange={(val) => handleProductChange(p.id, "image", val)} />
                    <PDFUploadField label="Brochure PDF Document" value={p.brochurePdf || ""} onChange={(val) => handleProductChange(p.id, "brochurePdf", val)} />
                  </div>

                  <TextAreaField label="Description" value={p.description} onChange={(e) => handleProductChange(p.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Technical Specifications Detail" value={p.technicalSpecs} onChange={(e) => handleProductChange(p.id, "technicalSpecs", e.target.value)} rows={4} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingProducts} saved={savedProducts} onClick={handleSaveProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
