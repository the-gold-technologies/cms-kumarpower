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

export default function ProductsStaticPageCMS() {
  // Section Open states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isCatsOpen, setIsCatsOpen] = useState(false);

  // Saving states
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingGrid, setSavingGrid] = useState(false);
  const [savedGrid, setSavedGrid] = useState(false);
  const [savingCats, setSavingCats] = useState(false);
  const [savedCats, setSavedCats] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Powering Progress,");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("One Generator at a Time");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState("");
  const [btn1Text, setBtn1Text] = useState("Request a Quote");
  const [btn1Url, setBtn1Url] = useState("/contact");
  const [btn2Text, setBtn2Text] = useState("Download Product Catalogue");
  const [btn2Url, setBtn2Url] = useState("");

  // Grid Header Section
  const [sectionTitle, setSectionTitle] = useState("ALL Products");
  const [sectionDesc, setSectionDesc] = useState("");

  // Certifications & Help Section Text
  const [certTitle, setCertTitle] = useState("Certified Excellence");
  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnText, setHelpBtnText] = useState("Talk to an Expert");
  const [whyChooseTitle, setWhyChooseTitle] = useState("Why Choose Kirloskar Generators?");

  // Product Categories
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    fetchWithCache("/api/products")
      .then((json) => {
        if (json.success && json.data) {
          const prods = json.data.products || json.data["products"] || json.data;
          if (prods.heroHeadingPart1 !== undefined) setHeroHeadingPart1(prods.heroHeadingPart1);
          if (prods.heroHeadingPart2 !== undefined) setHeroHeadingPart2(prods.heroHeadingPart2);
          if (prods.heroHeading !== undefined) setHeroHeading(prods.heroHeading);
          if (prods.heroSub !== undefined) setHeroSub(prods.heroSub);
          if (prods.heroBg !== undefined) setHeroBg(prods.heroBg);
          if (prods.btn1Text !== undefined) setBtn1Text(prods.btn1Text);
          if (prods.btn1Url !== undefined) setBtn1Url(prods.btn1Url);
          if (prods.btn2Text !== undefined) setBtn2Text(prods.btn2Text);
          if (prods.btn2Url !== undefined) setBtn2Url(prods.btn2Url);
          if (prods.sectionTitle !== undefined) setSectionTitle(prods.sectionTitle);
          if (prods.sectionDesc !== undefined) setSectionDesc(prods.sectionDesc);
          if (prods.certTitle !== undefined) setCertTitle(prods.certTitle);
          if (prods.helpTitle !== undefined) setHelpTitle(prods.helpTitle);
          if (prods.helpSub !== undefined) setHelpSub(prods.helpSub);
          if (prods.helpBtnText !== undefined) setHelpBtnText(prods.helpBtnText);
          if (prods.whyChooseTitle !== undefined) setWhyChooseTitle(prods.whyChooseTitle);
          if (Array.isArray(prods.categories)) setCategories(prods.categories);
        }
      })
      .catch(console.error);
  }, []);

  const saveAllToDB = async () => {
    const payload = {
      heroHeadingPart1,
      heroHeadingPart2,
      heroHeading: `${heroHeadingPart1} ${heroHeadingPart2}`.trim() || heroHeading,
      heroSub,
      heroBg,
      btn1Text,
      btn1Url,
      btn2Text,
      btn2Url,
      sectionTitle,
      sectionDesc,
      certTitle,
      helpTitle,
      helpSub,
      helpBtnText,
      whyChooseTitle,
      categories,
    };

    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "products", content: payload }),
    });

    if (res.ok) {
      clearCache("/api/products");
      toast.success("Products page updated successfully!");
    } else {
      toast.error("Failed to save products page");
    }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    await saveAllToDB();
    setSavingHero(false);
    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 2000);
  };

  const handleSaveGrid = async () => {
    setSavingGrid(true);
    await saveAllToDB();
    setSavingGrid(false);
    setSavedGrid(true);
    setTimeout(() => setSavedGrid(false), 2000);
  };

  const handleSaveCats = async () => {
    setSavingCats(true);
    await saveAllToDB();
    setSavingCats(false);
    setSavedCats(true);
    setTimeout(() => setSavedCats(false), 2000);
  };

  const handleCategoryChange = (id: string, field: keyof ProductCategory, val: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        id: `cat-${Date.now()}`,
        name: "",
        range: "",
        fuelType: "Diesel",
        cooling: "Liquid",
        phase: "Three Phase",
        image: "",
        description: "",
        productLink: "/products",
      },
    ]);
    toast.success("New product category added!");
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Product category removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Products Landing Page CMS (/products)"
        description="Manage hero banner text, CTAs, ALL Products section header, and all generator category cards."
      />

      {/* 1. Hero Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section"
          description="Manage main title (regular & colored parts), subtitle description, action buttons & brochure link."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="Powering Progress," />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="One Generator at a Time" />
            </div>
            <TextAreaField label="Hero Subtitle Tagline" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Background Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Button 1 Text" value={btn1Text} onChange={(e) => setBtn1Text(e.target.value)} />
              <InputField label="Button 1 Link" value={btn1Url} onChange={(e) => setBtn1Url(e.target.value)} />
              <InputField label="Button 2 Text" value={btn2Text} onChange={(e) => setBtn2Text(e.target.value)} />
              <PDFUploadField label="Catalogue PDF Link" value={btn2Url} onChange={(val) => setBtn2Url(val)} />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. ALL Products Header Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="2. Grid Section Header"
          description="Manage main section title & overview description text."
          isOpen={isGridOpen}
          onToggle={() => setIsGridOpen(!isGridOpen)}
        />
        <div className={`grid transition-all duration-300 ${isGridOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InputField label="Section Title" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} placeholder="ALL Products" />
              <TextAreaField label="Section Description" value={sectionDesc} onChange={(e) => setSectionDesc(e.target.value)} rows={2} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InputField label="Certifications Title" value={certTitle} onChange={(e) => setCertTitle(e.target.value)} placeholder="Certified Excellence" />
              <InputField label="Help Section Title" value={helpTitle} onChange={(e) => setHelpTitle(e.target.value)} placeholder="Need Help Choosing the Right Electrical Solution?" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextAreaField label="Help Section Description" value={helpSub} onChange={(e) => setHelpSub(e.target.value)} rows={2} />
              <InputField label="Help Section Button Text" value={helpBtnText} onChange={(e) => setHelpBtnText(e.target.value)} placeholder="Talk to an Expert" />
            </div>
            <InputField label="Why Choose Section Title" value={whyChooseTitle} onChange={(e) => setWhyChooseTitle(e.target.value)} placeholder="Why Choose Kirloskar Generators?" />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingGrid} saved={savedGrid} onClick={handleSaveGrid} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Categories List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. Product Category Cards (${categories.length} Categories)`}
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
                    <InputField label="Target Link URL" value={cat.productLink} onChange={(e) => handleCategoryChange(cat.id, "productLink", e.target.value)} placeholder="/products/kirloskar-diesel-generator" />
                    <ImageUploadField label="Category Image" value={cat.image} onChange={(val) => handleCategoryChange(cat.id, "image", val)} />
                  </div>
                  <TextAreaField label="Description" value={cat.description} onChange={(e) => handleCategoryChange(cat.id, "description", e.target.value)} rows={2} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingCats} saved={savedCats} onClick={handleSaveCats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
