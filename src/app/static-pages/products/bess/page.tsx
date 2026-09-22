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

type BESSCard = {
  id: string;
  name: string;
  range: string;
  powerRating: string;
  capacityRange: string;
  chemistry: string;
  voltage: string;
  cooling: string;
  phase: string;
  rating?: number;
  ratingCount?: number;
  image: string | File;
  description: string;
  technicalSpecs: string;
  applications: string;
  brochurePdf?: string | File;
};

const API_ENDPOINT = "/api/bess";
const SECTION_TYPE = "bess";

export default function BESSCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingSection, setSavingSection] = useState(false);
  const [savedSection, setSavedSection] = useState(false);
  const [savingProducts, setSavingProducts] = useState(false);
  const [savedProducts, setSavedProducts] = useState(false);
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const [savingExtra, setSavingExtra] = useState(false);
  const [savedExtra, setSavedExtra] = useState(false);

  // Why Choose Section
  const [whyChooseTitle, setWhyChooseTitle] = useState("Why Choose Kumar Power BESS?");
  const [whyChooseCard1Title, setWhyChooseCard1Title] = useState("Tier-1 LFP Chemistry");
  const [whyChooseCard1Desc, setWhyChooseCard1Desc] = useState("High safety Lithium Iron Phosphate (LiFePO4) cells with 6,000+ lifecycle and zero thermal runaway risk.");
  const [whyChooseCard2Title, setWhyChooseCard2Title] = useState("Instant Zero-Break Switchover");
  const [whyChooseCard2Desc, setWhyChooseCard2Desc] = useState("Sub-20 millisecond automatic grid failover eliminates downtime for critical mission loads and IT servers.");
  const [whyChooseCard3Title, setWhyChooseCard3Title] = useState("Peak Shaving & Cost Reduction");
  const [whyChooseCard3Desc, setWhyChooseCard3Desc] = useState("Stores power during off-peak hours and discharges during peak tariff periods to drastically cut electricity bills.");
  const [whyChooseCard4Title, setWhyChooseCard4Title] = useState("Solar & DG Synchronization");
  const [whyChooseCard4Desc, setWhyChooseCard4Desc] = useState("Seamlessly integrates with on-grid/off-grid solar inverters and diesel gensets to optimize fuel consumption.");
  const [whyChooseCard5Title, setWhyChooseCard5Title] = useState("Intelligent Cloud BMS");
  const [whyChooseCard5Desc, setWhyChooseCard5Desc] = useState("Real-time cell level temperature and voltage telemetry with cloud analytics and predictive diagnostics.");
  const [whyChooseCard6Title, setWhyChooseCard6Title] = useState("Modular Scalability");
  const [whyChooseCard6Desc, setWhyChooseCard6Desc] = useState("Easily expandable from 20 kWh commercial systems up to multi-megawatt utility installations.");

  // Certifications Section
  const [certTitle, setCertTitle] = useState("Certified Excellence");
  const [cert1Title, setCert1Title] = useState("ISO 9001:2015");
  const [cert2Title, setCert2Title] = useState("CE & IEC 62619");
  const [cert3Title, setCert3Title] = useState("UL 9540A Tested");

  // Help Section
  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnText, setHelpBtnText] = useState("Talk to an Expert");

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Battery Energy");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Storage Systems (BESS)");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState(
    "Next-generation Lithium Iron Phosphate (LiFePO4) energy storage solutions engineered for commercial, industrial, and renewable synchronization."
  );
  const [heroBg, setHeroBg] = useState<string | File>("");

  // Section Header
  const [sectionTitle, setSectionTitle] = useState("Battery Energy Storage Range");
  const [sectionDesc, setSectionDesc] = useState(
    "High-efficiency, zero-emission BESS units engineered for seamless backup, peak demand shaving, DG synchronization, and solar hybridization."
  );

  // BESS Products List
  const [products, setProducts] = useState<BESSCard[]>([]);

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
          // Why Choose
          if (data.whyChooseTitle !== undefined) setWhyChooseTitle(data.whyChooseTitle);
          if (data.whyChooseCard1Title !== undefined) setWhyChooseCard1Title(data.whyChooseCard1Title);
          if (data.whyChooseCard1Desc !== undefined) setWhyChooseCard1Desc(data.whyChooseCard1Desc);
          if (data.whyChooseCard2Title !== undefined) setWhyChooseCard2Title(data.whyChooseCard2Title);
          if (data.whyChooseCard2Desc !== undefined) setWhyChooseCard2Desc(data.whyChooseCard2Desc);
          if (data.whyChooseCard3Title !== undefined) setWhyChooseCard3Title(data.whyChooseCard3Title);
          if (data.whyChooseCard3Desc !== undefined) setWhyChooseCard3Desc(data.whyChooseCard3Desc);
          if (data.whyChooseCard4Title !== undefined) setWhyChooseCard4Title(data.whyChooseCard4Title);
          if (data.whyChooseCard4Desc !== undefined) setWhyChooseCard4Desc(data.whyChooseCard4Desc);
          if (data.whyChooseCard5Title !== undefined) setWhyChooseCard5Title(data.whyChooseCard5Title);
          if (data.whyChooseCard5Desc !== undefined) setWhyChooseCard5Desc(data.whyChooseCard5Desc);
          if (data.whyChooseCard6Title !== undefined) setWhyChooseCard6Title(data.whyChooseCard6Title);
          if (data.whyChooseCard6Desc !== undefined) setWhyChooseCard6Desc(data.whyChooseCard6Desc);
          // Certifications
          if (data.certTitle !== undefined) setCertTitle(data.certTitle);
          if (data.cert1Title !== undefined) setCert1Title(data.cert1Title);
          if (data.cert2Title !== undefined) setCert2Title(data.cert2Title);
          if (data.cert3Title !== undefined) setCert3Title(data.cert3Title);
          // Help
          if (data.helpTitle !== undefined) setHelpTitle(data.helpTitle);
          if (data.helpSub !== undefined) setHelpSub(data.helpSub);
          if (data.helpBtnText !== undefined) setHelpBtnText(data.helpBtnText);
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
      whyChooseTitle,
      whyChooseCard1Title,
      whyChooseCard1Desc,
      whyChooseCard2Title,
      whyChooseCard2Desc,
      whyChooseCard3Title,
      whyChooseCard3Desc,
      whyChooseCard4Title,
      whyChooseCard4Desc,
      whyChooseCard5Title,
      whyChooseCard5Desc,
      whyChooseCard6Title,
      whyChooseCard6Desc,
      certTitle,
      cert1Title,
      cert2Title,
      cert3Title,
      helpTitle,
      helpSub,
      helpBtnText,
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
      toast.success("BESS page updated successfully!");
    } else {
      toast.error("Failed to save BESS page");
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

  const handleSaveExtra = async () => {
    setSavingExtra(true);
    await saveAllToDB();
    setSavingExtra(false);
    setSavedExtra(true);
    setTimeout(() => setSavedExtra(false), 2000);
  };

  const handleProductChange = (id: string, field: keyof BESSCard, val: any) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: `bess-${Date.now()}`,
        name: "",
        range: "50 kW",
        powerRating: "50 kW",
        capacityRange: "100 kWh",
        chemistry: "LFP (LiFePO4)",
        voltage: "400V Three Phase",
        cooling: "Liquid Cooled",
        phase: "Three Phase",
        rating: 4.9,
        ratingCount: 150,
        image: "",
        description: "",
        technicalSpecs: "",
        applications: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New BESS model added!");
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("BESS model removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Battery Energy Storage Systems (BESS) CMS (/products/bess)"
        description="Manage BESS banner text, product models, capacities, technical parameters & brochures."
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
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="Battery Energy" />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="Storage Systems (BESS)" />
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
            <InputField label="Section Title" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} placeholder="Battery Energy Storage Range" />
            <TextAreaField label="Section Description" value={sectionDesc} onChange={(e) => setSectionDesc(e.target.value)} rows={2} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingSection} saved={savedSection} onClick={handleSaveSection} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. BESS Products List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. BESS Models (${products.length} Models)`}
          description="Manage BESS product models, ratings, power ranges, cooling, specs & images."
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
                <Plus className="w-4 h-4" /> Add BESS Model
              </button>
            </div>

            <div className="space-y-4">
              {products.map((p, idx) => (
                <div key={p.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      BESS Model #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeProduct(p.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Model Name" value={p.name} onChange={(e) => handleProductChange(p.id, "name", e.target.value)} placeholder="e.g. 20 kW Industrial BESS" />
                    <InputField label="Power Rating (e.g. 20 kW)" value={p.powerRating || p.range} onChange={(e) => { handleProductChange(p.id, "powerRating", e.target.value); handleProductChange(p.id, "range", e.target.value); }} placeholder="20 kW" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InputField label="Capacity (kWh)" value={p.capacityRange} onChange={(e) => handleProductChange(p.id, "capacityRange", e.target.value)} placeholder="40 - 80 kWh" />
                    <InputField label="Chemistry" value={p.chemistry} onChange={(e) => handleProductChange(p.id, "chemistry", e.target.value)} placeholder="LFP (LiFePO4)" />
                    <InputField label="Voltage Range" value={p.voltage} onChange={(e) => handleProductChange(p.id, "voltage", e.target.value)} placeholder="400V - 600V" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Cooling System" value={p.cooling} onChange={(e) => handleProductChange(p.id, "cooling", e.target.value)} placeholder="Liquid Cooled / Air Cooled" />
                    <InputField label="Phase" value={p.phase} onChange={(e) => handleProductChange(p.id, "phase", e.target.value)} placeholder="Three Phase" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField label="Model Image Graphic" value={p.image} onChange={(val) => handleProductChange(p.id, "image", val)} />
                    <PDFUploadField label="Brochure PDF Document" value={p.brochurePdf || ""} onChange={(val) => handleProductChange(p.id, "brochurePdf", val)} />
                  </div>

                  <TextAreaField label="Description" value={p.description} onChange={(e) => handleProductChange(p.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Technical Specifications Detail" value={p.technicalSpecs} onChange={(e) => handleProductChange(p.id, "technicalSpecs", e.target.value)} rows={4} />
                  <InputField label="Recommended Applications" value={p.applications || ""} onChange={(e) => handleProductChange(p.id, "applications", e.target.value)} placeholder="Hotels, Campuses, Hospitals, Manufacturing" />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingProducts} saved={savedProducts} onClick={handleSaveProducts} />
            </div>
          </div>
        </div>
      </div>
      {/* 4. Why Choose, Certifications & Help Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="4. Why Choose, Certifications & Help Section"
          description="Manage Why Choose Us benefits, certification badges, and consultation helpline text."
          isOpen={isExtraOpen}
          onToggle={() => setIsExtraOpen(!isExtraOpen)}
        />
        <div className={`grid transition-all duration-300 ${isExtraOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <InputField
              label="Why Choose Section Title"
              value={whyChooseTitle}
              onChange={(e) => setWhyChooseTitle(e.target.value)}
              placeholder="Why Choose Kumar Power BESS?"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 1 Title" value={whyChooseCard1Title} onChange={(e) => setWhyChooseCard1Title(e.target.value)} />
                <TextAreaField label="Card 1 Description" value={whyChooseCard1Desc} onChange={(e) => setWhyChooseCard1Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 2 Title" value={whyChooseCard2Title} onChange={(e) => setWhyChooseCard2Title(e.target.value)} />
                <TextAreaField label="Card 2 Description" value={whyChooseCard2Desc} onChange={(e) => setWhyChooseCard2Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 3 Title" value={whyChooseCard3Title} onChange={(e) => setWhyChooseCard3Title(e.target.value)} />
                <TextAreaField label="Card 3 Description" value={whyChooseCard3Desc} onChange={(e) => setWhyChooseCard3Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 4 Title" value={whyChooseCard4Title} onChange={(e) => setWhyChooseCard4Title(e.target.value)} />
                <TextAreaField label="Card 4 Description" value={whyChooseCard4Desc} onChange={(e) => setWhyChooseCard4Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 5 Title" value={whyChooseCard5Title} onChange={(e) => setWhyChooseCard5Title(e.target.value)} />
                <TextAreaField label="Card 5 Description" value={whyChooseCard5Desc} onChange={(e) => setWhyChooseCard5Desc(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <InputField label="Card 6 Title" value={whyChooseCard6Title} onChange={(e) => setWhyChooseCard6Title(e.target.value)} />
                <TextAreaField label="Card 6 Description" value={whyChooseCard6Desc} onChange={(e) => setWhyChooseCard6Desc(e.target.value)} rows={2} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <InputField
                label="Certifications Section Title"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                placeholder="Certified Excellence"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                <InputField label="Badge 1 Label" value={cert1Title} onChange={(e) => setCert1Title(e.target.value)} />
                <InputField label="Badge 2 Label" value={cert2Title} onChange={(e) => setCert2Title(e.target.value)} />
                <InputField label="Badge 3 Label" value={cert3Title} onChange={(e) => setCert3Title(e.target.value)} />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <InputField
                label="Help Section Title"
                value={helpTitle}
                onChange={(e) => setHelpTitle(e.target.value)}
                placeholder="Need Help Choosing the Right Electrical Solution?"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextAreaField
                  label="Help Section Description"
                  value={helpSub}
                  onChange={(e) => setHelpSub(e.target.value)}
                  rows={2}
                />
                <InputField
                  label="Help Button Label"
                  value={helpBtnText}
                  onChange={(e) => setHelpBtnText(e.target.value)}
                  placeholder="Talk to an Expert"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingExtra} saved={savedExtra} onClick={handleSaveExtra} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
