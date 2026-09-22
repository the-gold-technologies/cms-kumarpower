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

type PanelCard = {
  id: string;
  name: string;
  range: string;
  image: string | File;
  description: string;
  technicalSpecs: string;
  brochurePdf: string | File;
};

const API_ENDPOINT = "/api/panels";
const SECTION_TYPE = "panels";

export default function ElectricalPanelsCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isPanelsOpen, setIsPanelsOpen] = useState(false);
  const [isExtraOpen, setIsExtraOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [savingPanels, setSavingPanels] = useState(false);
  const [savedPanels, setSavedPanels] = useState(false);
  const [savingExtra, setSavingExtra] = useState(false);
  const [savedExtra, setSavedExtra] = useState(false);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("Electrical");
  const [heroHeadingPart2, setHeroHeadingPart2] = useState("Panels");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState<string | File>("");

  // Panels List
  const [panels, setPanels] = useState<PanelCard[]>([]);

  // Why Choose Section
  const [whyChooseTitle, setWhyChooseTitle] = useState("Why Choose Kumar Power Electrical Panels?");
  const [whyChooseCard1Title, setWhyChooseCard1Title] = useState("CPRI Certified & Tested");
  const [whyChooseCard1Desc, setWhyChooseCard1Desc] = useState("Fully compliant with IEC 61439 and IS standards with verified fault current withstand ratings.");
  const [whyChooseCard2Title, setWhyChooseCard2Title] = useState("High Fault Tolerance");
  const [whyChooseCard2Desc, setWhyChooseCard2Desc] = useState("Engineered with premium busbars and Type-2 coordination to prevent short circuits and arcing.");
  const [whyChooseCard3Title, setWhyChooseCard3Title] = useState("Seamless Automation");
  const [whyChooseCard3Desc, setWhyChooseCard3Desc] = useState("Smart AMF and PLC-based auto-synchronization ensures micro-second changeover without manual intervention.");
  const [whyChooseCard4Title, setWhyChooseCard4Title] = useState("IP54 / IP55 Protection");
  const [whyChooseCard4Desc, setWhyChooseCard4Desc] = useState("Heavy-duty powder coated enclosures built to withstand harsh industrial and outdoor environments.");
  const [whyChooseCard5Title, setWhyChooseCard5Title] = useState("Modular & Expandable");
  const [whyChooseCard5Desc, setWhyChooseCard5Desc] = useState("Standardized cubicle compartments allow easy future load expansion and quick component replacement.");
  const [whyChooseCard6Title, setWhyChooseCard6Title] = useState("IoT & SCADA Integration");
  const [whyChooseCard6Desc, setWhyChooseCard6Desc] = useState("Integrated digital multifunction meters with RS485 / Modbus for real-time monitoring and analytics.");

  // Certifications Section
  const [certTitle, setCertTitle] = useState("Certified Excellence");
  const [cert1Title, setCert1Title] = useState("ISO 9001:2015");
  const [cert2Title, setCert2Title] = useState("CPRI Tested");
  const [cert3Title, setCert3Title] = useState("IEC 61439");

  // Help Section
  const [helpTitle, setHelpTitle] = useState("Need Help Choosing the Right Electrical Solution?");
  const [helpSub, setHelpSub] = useState("Our team of experts will help you select the perfect solution based on your industry and budget.");
  const [helpBtnText, setHelpBtnText] = useState("Talk to an Expert");

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
          if (Array.isArray(data.panels)) setPanels(data.panels);
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
      sectionTitle: "Electrical Panels",
      sectionDesc: "Browse our range of AMF panels, synchronization panels, and custom power distribution boards.",
      panels,
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
    if (payload.panels) setPanels(payload.panels);

    const res = await fetch(API_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: SECTION_TYPE, content: payload }),
    });

    if (res.ok) {
      clearCache(API_ENDPOINT);
      toast.success("Electrical Panels page updated!");
    } else {
      toast.error("Failed to save Electrical Panels page");
    }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    await saveAllToDB();
    setSavingHero(false);
    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 2000);
  };

  const handleSavePanels = async () => {
    setSavingPanels(true);
    await saveAllToDB();
    setSavingPanels(false);
    setSavedPanels(true);
    setTimeout(() => setSavedPanels(false), 2000);
  };

  const handleSaveExtra = async () => {
    setSavingExtra(true);
    await saveAllToDB();
    setSavingExtra(false);
    setSavedExtra(true);
    setTimeout(() => setSavedExtra(false), 2000);
  };

  const handlePanelChange = (id: string, field: keyof PanelCard, val: string | File) => {
    setPanels((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const addPanel = () => {
    setPanels((prev) => [
      ...prev,
      {
        id: `panel-${Date.now()}`,
        name: "",
        range: "Various",
        image: "",
        description: "",
        technicalSpecs: "",
        brochurePdf: "",
      },
    ]);
    toast.success("New Electrical Panel model added!");
  };

  const removePanel = (id: string) => {
    setPanels((prev) => prev.filter((p) => p.id !== id));
    toast.success("Electrical Panel model removed");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Electrical Panels CMS (/products/panels)"
        description="Manage banner text, AMF panels, synchronization panels, distribution boards, why choose benefits, certification badges, and consultation helpline text."
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
              <InputField label="Hero Heading (Regular Part)" value={heroHeadingPart1} onChange={(e) => setHeroHeadingPart1(e.target.value)} placeholder="Electrical" />
              <InputField label="Hero Heading (Colored Part)" value={heroHeadingPart2} onChange={(e) => setHeroHeadingPart2(e.target.value)} placeholder="Panels" />
            </div>
            <TextAreaField label="Hero Tagline Subtitle" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Hero Banner Image Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Panels List */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Electrical Panel Types (${panels.length} Panel Models)`}
          description="Manage electrical panel types, technical specs & brochure downloads."
          isOpen={isPanelsOpen}
          onToggle={() => setIsPanelsOpen(!isPanelsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isPanelsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addPanel}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Panel Model
              </button>
            </div>

            <div className="space-y-4">
              {panels.map((p, idx) => (
                <div key={p.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Panel #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removePanel(p.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Name" value={p.name} onChange={(e) => handlePanelChange(p.id, "name", e.target.value)} placeholder="e.g. AMF Panels" />
                    <InputField label="Rating / Capacity Range" value={p.range} onChange={(e) => handlePanelChange(p.id, "range", e.target.value)} placeholder="Various" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploadField label="Panel Graphic Image" value={p.image} onChange={(val) => handlePanelChange(p.id, "image", val)} />
                    <PDFUploadField label="Brochure PDF Document" value={p.brochurePdf} onChange={(val) => handlePanelChange(p.id, "brochurePdf", val)} />
                  </div>
                  <TextAreaField label="Description" value={p.description} onChange={(e) => handlePanelChange(p.id, "description", e.target.value)} rows={2} />
                  <TextAreaField label="Technical Specifications Detail" value={p.technicalSpecs} onChange={(e) => handlePanelChange(p.id, "technicalSpecs", e.target.value)} rows={4} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingPanels} saved={savedPanels} onClick={handleSavePanels} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Why Choose, Certifications & Help Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Why Choose, Certifications & Help Section"
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
              placeholder="Why Choose Kumar Power Electrical Panels?"
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
