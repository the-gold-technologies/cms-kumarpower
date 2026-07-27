"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { uploadFilesDeep } from "@/lib/uploadHelpers";

type SolutionProduct = {
  id: string;
  category: string;
  title: string;
  desc: string;
  specs: string; // comma or newline separated
  img: string | File;
  brochureUrl: string | File;
};

type AssociationLogo = { id: string; url: string | File; alt: string };

const CATEGORIES = [
  "CPCB4+ Diesel Generator",
  "Optiprime Generators",
  "Gas Generators",
  "Portable Generators",
  "Electrical Panels",
  "Servo Stabilizers",
  "Transformers",
];

interface PowerSolutionsSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function PowerSolutionsSectionCMS({
  saveUrl = "/api/home",
  responseKey = "power-solutions",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: PowerSolutionsSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [topBannerImg, setTopBannerImg] = useState<string | File>("");
  const [sectionTitle, setSectionTitle] = useState("");

  const [assocTitle, setAssocTitle] = useState("");
  const [assocSubtitle, setAssocSubtitle] = useState("");
  const [assocFooterText, setAssocFooterText] = useState("");
  const [assocLogos, setAssocLogos] = useState<AssociationLogo[]>([]);

  // Power in Action section
  const [actionTitle, setActionTitle] = useState("");

  // Products
  const [products, setProducts] = useState<SolutionProduct[]>([]);

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const ps = responseKey ? json.data?.[responseKey] : json.data;
          if (ps) {
            if (ps.topBannerImg !== undefined) setTopBannerImg(ps.topBannerImg);
            if (ps.sectionTitle !== undefined) setSectionTitle(ps.sectionTitle);
            if (ps.assocTitle !== undefined) setAssocTitle(ps.assocTitle);
            if (ps.assocSubtitle !== undefined) setAssocSubtitle(ps.assocSubtitle);
            if (ps.assocFooterText !== undefined) setAssocFooterText(ps.assocFooterText);
            if (Array.isArray(ps.assocLogos)) setAssocLogos(ps.assocLogos);
            if (ps.actionTitle !== undefined) setActionTitle(ps.actionTitle);
            if (Array.isArray(ps.products)) setProducts(ps.products);
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const handleProductChange = (id: string, field: keyof SolutionProduct, val: string | File) => {
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

  const handleLogoChange = (id: string, val: string | File) => {
    setAssocLogos((prev) => prev.map((l) => (l.id === id ? { ...l, url: val } : l)));
  };

  const addLogo = () => {
    const newId = `assoc-${Date.now()}`;
    setAssocLogos((prev) => [...prev, { id: newId, url: "", alt: "" }]);
  };

  const removeLogo = (id: string) => {
    setAssocLogos((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const rawPayload = {
        topBannerImg,
        sectionTitle,
        assocTitle,
        assocSubtitle,
        assocFooterText,
        assocLogos,
        actionTitle,
        products,
      };
      const payload = await uploadFilesDeep(rawPayload);

      if (payload.topBannerImg && typeof payload.topBannerImg === "string") {
        setTopBannerImg(payload.topBannerImg);
      }
      if (payload.assocLogos) setAssocLogos(payload.assocLogos);
      if (payload.products) setProducts(payload.products);

      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("Power Solutions section saved!");
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
            <InputField
              label="Association Section Footer Text"
              value={assocFooterText}
              onChange={(e) => setAssocFooterText(e.target.value)}
              placeholder="e.g. Our commitment to quality and excellence is recognized by industry-leading organizations"
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
