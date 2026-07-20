"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

type SolutionProduct = {
  id: string;
  category: string;
  title: string;
  desc: string;
  specs: string; // comma or newline separated
  img: string;
  brochureUrl: string;
};

type AssociationLogo = { id: string; url: string; alt: string };

const CATEGORIES = [
  "CPCB4+ Diesel Generator",
  "Optiprime Generators",
  "Gas Generators",
  "Portable Generators",
  "Electrical Panels",
  "Servo Stabilizers",
  "Transformers",
];

const INITIAL_PRODUCTS: SolutionProduct[] = [
  {
    id: "ps-1",
    category: "CPCB4+ Diesel Generator",
    title: "CPCB4+ Diesel Generators( 7.5 kVA - 20 kVA)",
    desc: "Compact CPCB4+ compliant diesel generators designed for small businesses and commercial setups.",
    specs: "Range: 7.5 kVA - 20 kVA, CPCB Norm: CPCB4+ Emission Compliance, Fuel: Diesel, Cooling: Liquid, Phase: Three Phase",
    img: "",
    brochureUrl: "",
  },
  {
    id: "ps-2",
    category: "CPCB4+ Diesel Generator",
    title: "CPCB4+ Diesel Generators(25 kVA - 58.5 kVA)",
    desc: "Reliable CPCB4+ emission compliant diesel generators with advanced liquid cooling for efficient performance.",
    specs: "Range: 25 kVA - 58.5 kVA, CPCB Norm: CPCB4+ Emission Compliance, Fuel: Diesel, Cooling: Liquid, Phase: Three Phase",
    img: "",
    brochureUrl: "",
  },
  {
    id: "ps-3",
    category: "Optiprime Generators",
    title: "Kirloskar Optiprime Generator",
    desc: "Advanced diesel generators with CPCB4+ compliance, offering superior fuel efficiency and eco-friendly operations.",
    specs: "125 kva - 6600 kva, CPCB4+ Compliant, 3 Phase Output, Fuel: Diesel",
    img: "",
    brochureUrl: "",
  },
  {
    id: "ps-4",
    category: "Gas Generators",
    title: "Gas Generators",
    desc: "Eco-friendly natural gas and LPG generators with lower emissions and operational costs for sustainable power generation.",
    specs: "15 kVA - 250 kVA, Low Emissions, Quiet Operation, Fuel: Natural Gas LPG",
    img: "",
    brochureUrl: "",
  },
  {
    id: "ps-5",
    category: "Electrical Panels",
    title: "AMF Panels",
    desc: "Automatic Mains Failure panels for seamless switching between mains and backup power supply, ensuring uninterrupted operation.",
    specs: "Auto/Manual Operation, Engine Protection, Programmable Logic Control, Current Rating: 100-630A",
    img: "",
    brochureUrl: "",
  },
];

const INITIAL_ASSOCIATION_LOGOS: AssociationLogo[] = [
  { id: "assoc-1", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121853_okz8x7.png", alt: "Association Member 1" },
  { id: "assoc-2", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121836_ayhhxd.png", alt: "Association Member 2" },
  { id: "assoc-3", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121914_yztxrf.png", alt: "Association Member 3" },
  { id: "assoc-4", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762843802/Screenshot_2025-11-11_121748_ihrukv.png", alt: "Association Member 4" },
];

export function PowerSolutionsSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [topBannerImg, setTopBannerImg] = useState("");
  const [sectionTitle, setSectionTitle] = useState("Power Solutions");

  // Members of Associations fields
  const [assocTitle, setAssocTitle] = useState("Members of Associations");
  const [assocSubtitle, setAssocSubtitle] = useState(
    "Certified and recognized by leading industry organizations for quality and excellence"
  );
  const [assocLogos, setAssocLogos] = useState<AssociationLogo[]>(INITIAL_ASSOCIATION_LOGOS);

  // Power in Action section
  const [actionTitle, setActionTitle] = useState("Power in Action");

  // Products
  const [products, setProducts] = useState<SolutionProduct[]>(INITIAL_PRODUCTS);

  const handleProductChange = (id: string, field: keyof SolutionProduct, val: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const addProduct = () => {
    const newId = `ps-${Date.now()}`;
    setProducts((prev) => [
      ...prev,
      {
        id: newId,
        category: "CPCB4+ Diesel Generator",
        title: "",
        desc: "",
        specs: "",
        img: "",
        brochureUrl: "",
      },
    ]);
    toast.success("New product added!");
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product removed");
  };

  const handleLogoChange = (id: string, val: string) => {
    setAssocLogos((prev) => prev.map((l) => (l.id === id ? { ...l, url: val } : l)));
  };

  const addLogo = () => {
    const newId = `assoc-${Date.now()}`;
    setAssocLogos((prev) => [...prev, { id: newId, url: "", alt: "" }]);
  };

  const removeLogo = (id: string) => {
    setAssocLogos((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Power Solutions section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Power Solutions Section"
        description="Manage top banner, category tab products, brochure PDFs, specs, association logos, and Power in Action header."
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
          {/* Top Banner & Title */}
          <div className="space-y-4">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Header & Banner</p>
            <InputField
              label="Section Main Title"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g. Power Solutions"
            />
            <ImageUploadField
              label="All Products Top Banner Image"
              value={topBannerImg}
              onChange={(val) => setTopBannerImg(val)}
            />
          </div>

          {/* Category Products */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Power Solutions Category Products ({products.length} items)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Products sorted into category tabs (CPCB4+, Optiprime, Gas, Portable, Panels, Servo, Transformers)
                </p>
              </div>
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="space-y-3">
              {products.map((p, idx) => (
                <div key={p.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Item #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProduct(p.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Product Title"
                      value={p.title}
                      onChange={(e) => handleProductChange(p.id, "title", e.target.value)}
                      placeholder="e.g. CPCB4+ Diesel Generators (7.5 kVA - 20 kVA)"
                    />
                    <div className="flex flex-col gap-2.5 px-0.5">
                      <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">
                        Category Tab
                      </label>
                      <select
                        value={p.category}
                        onChange={(e) => handleProductChange(p.id, "category", e.target.value)}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2D6FBA]/30 focus:border-[#2D6FBA] outline-none transition-all"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <TextAreaField
                    label="Description"
                    value={p.desc}
                    onChange={(e) => handleProductChange(p.id, "desc", e.target.value)}
                    rows={2}
                  />

                  <TextAreaField
                    label="Specifications (comma or newline separated)"
                    value={p.specs}
                    onChange={(e) => handleProductChange(p.id, "specs", e.target.value)}
                    rows={2}
                    placeholder="e.g. 7.5 kVA - 20 kVA, CPCB4+ Compliant, 3 Phase, Diesel"
                  />

                  <ImageUploadField
                    label="Product Showcase Image"
                    value={p.img}
                    onChange={(val) => handleProductChange(p.id, "img", val)}
                  />

                  <PDFUploadField
                    label="Brochure PDF Document"
                    value={p.brochureUrl}
                    onChange={(val) => handleProductChange(p.id, "brochureUrl", val)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Members of Associations Section */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              Members of Associations Section
            </p>
            <InputField
              label="Association Section Title"
              value={assocTitle}
              onChange={(e) => setAssocTitle(e.target.value)}
              placeholder="e.g. Members of Associations"
            />
            <TextAreaField
              label="Association Section Subtitle"
              value={assocSubtitle}
              onChange={(e) => setAssocSubtitle(e.target.value)}
              rows={2}
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-700">Association Logos ({assocLogos.length} logos)</span>
              <button
                type="button"
                onClick={addLogo}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D6FBA]/10 text-[#2D6FBA] text-xs font-bold rounded-xl hover:bg-[#2D6FBA]/20 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Association Logo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assocLogos.map((logo, idx) => (
                <div key={logo.id} className="border border-slate-200 rounded-2xl p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                      Association #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLogo(logo.id)}
                      className="text-slate-300 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <ImageUploadField
                    value={logo.url}
                    onChange={(val) => handleLogoChange(logo.id, val)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Power in Action Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Power in Action Section</p>
            <InputField
              label="Section Title"
              value={actionTitle}
              onChange={(e) => setActionTitle(e.target.value)}
              placeholder="e.g. Power in Action"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
