"use client";

import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";

import { uploadFilesDeep } from "@/lib/uploadHelpers";

type ProcessStepCard = {
  id: string;
  stepNum: string;
  title: string;
  description: string;
  bullet1: string;
  bullet2: string;
};

type PortfolioItem = {
  id: string;
  name: string;
  category: "Commercial" | "Residential" | "Industrial";
  imageUrl: string | File;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type BenefitCard = {
  id: string;
  title: string;
  description: string;
};

export default function InstallationServicesCMSPage() {
  // Section Toggle states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isStepsOpen, setIsStepsOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isFaqsOpen, setIsFaqsOpen] = useState(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);

  // Saving states
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingIntro, setSavingIntro] = useState(false);
  const [savedIntro, setSavedIntro] = useState(false);

  const [savingSteps, setSavingSteps] = useState(false);
  const [savedSteps, setSavedSteps] = useState(false);

  const [savingPortfolio, setSavingPortfolio] = useState(false);
  const [savedPortfolio, setSavedPortfolio] = useState(false);

  const [savingFaqs, setSavingFaqs] = useState(false);
  const [savedFaqs, setSavedFaqs] = useState(false);

  const [savingBenefits, setSavingBenefits] = useState(false);
  const [savedBenefits, setSavedBenefits] = useState(false);

  // Hero Section State
  const [heroBadge, setHeroBadge] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState<string | File>("");
  const [heroCtaLabel, setHeroCtaLabel] = useState("");

  // Intro Section State
  const [introTagline, setIntroTagline] = useState("");
  const [introHeading, setIntroHeading] = useState("");
  const [introP1, setIntroP1] = useState("");
  const [introP2, setIntroP2] = useState("");
  const [introImage, setIntroImage] = useState<string | File>("");

  // Process Steps & Header State
  const [processTagline, setProcessTagline] = useState("");
  const [processHeading, setProcessHeading] = useState("");
  const [processDesc, setProcessDesc] = useState("");
  const [steps, setSteps] = useState<ProcessStepCard[]>([]);

  // Portfolio Gallery & Header State
  const [portfolioTagline, setPortfolioTagline] = useState("");
  const [portfolioHeading, setPortfolioHeading] = useState("");
  const [portfolioDesc, setPortfolioDesc] = useState("");
  const [portfolioCtaLabel, setPortfolioCtaLabel] = useState("");
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  // FAQs & Header State
  const [faqTagline, setFaqTagline] = useState("");
  const [faqHeading, setFaqHeading] = useState("");
  const [faqDesc, setFaqDesc] = useState("");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // Benefits State
  const [benefits, setBenefits] = useState<BenefitCard[]>([]);

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        const res = await fetch("/api/installation");
        const json = await res.json();
        if (json.success && json.data) {
          const content = json.data.services || json.data.installation;
          if (content) {
            setHeroBadge(content.heroBadge || "");
            setHeroHeading(content.heroHeading || "");
            setHeroSub(content.heroSub || "");
            setHeroBg(content.heroBg || "");
            setHeroCtaLabel(content.heroCtaLabel || "");

            setIntroTagline(content.introTagline || "");
            setIntroHeading(content.introHeading || "");
            setIntroP1(content.introP1 || "");
            setIntroP2(content.introP2 || "");
            setIntroImage(content.introImage || "");

            setProcessTagline(content.processTagline || "");
            setProcessHeading(content.processHeading || "");
            setProcessDesc(content.processDesc || "");
            setSteps(content.steps || []);

            setPortfolioTagline(content.portfolioTagline || "");
            setPortfolioHeading(content.portfolioHeading || "");
            setPortfolioDesc(content.portfolioDesc || "");
            setPortfolioCtaLabel(content.portfolioCtaLabel || "");
            setPortfolio(content.portfolio || []);

            setFaqTagline(content.faqTagline || "");
            setFaqHeading(content.faqHeading || "");
            setFaqDesc(content.faqDesc || "");
            setFaqs(content.faqs || []);

            setBenefits(content.benefits || []);
          }
        }
      } catch (err) {
        console.error("Failed to load installation CMS data:", err);
      }
    };
    fetchCMSData();
  }, []);

  // Step Handlers
  const handleStepChange = (
    id: string,
    field: keyof ProcessStepCard,
    val: string,
  ) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    );
  };

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        id: `step-${Date.now()}`,
        stepNum: `${steps.length + 1}`,
        title: "",
        description: "",
        bullet1: "",
        bullet2: "",
      },
    ]);
    toast.success("New Installation Process Step added!");
  };

  const removeStep = (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
    toast.success("Step removed");
  };

  // Portfolio Bulk Upload Handlers
  const handleBulkUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems: PortfolioItem[] = Array.from(files).map((file, i) => ({
      id: `p-${Date.now()}-${i}`,
      name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      category: "Commercial",
      imageUrl: file,
    }));
    setPortfolio((prev) => [...prev, ...newItems]);
    toast.success(`${newItems.length} installation portfolio images added!`);
  };

  const removePortfolioItem = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    toast.success("Portfolio item removed");
  };

  // FAQ Handlers
  const handleFaqChange = (id: string, field: keyof FaqItem, val: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: val } : f)),
    );
  };

  const addFaq = () => {
    setFaqs((prev) => [
      ...prev,
      { id: `faq-${Date.now()}`, question: "", answer: "" },
    ]);
    toast.success("New FAQ added!");
  };

  const removeFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    toast.success("FAQ removed");
  };

  // Benefit Handlers
  const handleBenefitChange = (
    id: string,
    field: keyof BenefitCard,
    val: string,
  ) => {
    setBenefits((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: val } : b)),
    );
  };

  // Save Handlers
  const saveToServer = async (
    rawPayload: any,
    setSaving: any,
    setSaved: any,
    successMsg: string,
  ) => {
    setSaving(true);
    try {
      const payload = await uploadFilesDeep(rawPayload);

      // Sync local state
      if (payload.heroBg && typeof payload.heroBg === "string") setHeroBg(payload.heroBg);
      if (payload.introImage && typeof payload.introImage === "string") setIntroImage(payload.introImage);
      if (payload.portfolio) setPortfolio(payload.portfolio);

      // We must fetch existing full payload first to not overwrite other sections
      const res = await fetch("/api/installation");
      const json = await res.json();
      const existingContent =
        json.success && json.data
          ? (json.data.services || json.data.installation || {})
          : {};

      const updatedContent = { ...existingContent, ...payload };

      const updateRes = await fetch("/api/installation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "services",
          content: updatedContent,
        }),
      });
      if (updateRes.ok) {
        setSaved(true);
        toast.success(successMsg);
        setTimeout(() => setSaved(false), 2000);
      } else {
        toast.error("Failed to save");
      }
    } catch (err) {
      toast.error("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHero = () => {
    saveToServer(
      { heroBadge, heroHeading, heroSub, heroBg, heroCtaLabel },
      setSavingHero,
      setSavedHero,
      "Hero section saved!",
    );
  };

  const handleSaveIntro = () => {
    saveToServer(
      { introTagline, introHeading, introP1, introP2, introImage },
      setSavingIntro,
      setSavedIntro,
      "Expertise Intro section saved!",
    );
  };

  const handleSaveSteps = () => {
    saveToServer(
      { processTagline, processHeading, processDesc, steps },
      setSavingSteps,
      setSavedSteps,
      "6-Step Installation Process saved!",
    );
  };

  const handleSavePortfolio = () => {
    saveToServer(
      {
        portfolioTagline,
        portfolioHeading,
        portfolioDesc,
        portfolioCtaLabel,
        portfolio,
      },
      setSavingPortfolio,
      setSavedPortfolio,
      "Installation Portfolio Gallery saved!",
    );
  };

  const handleSaveFaqs = () => {
    saveToServer(
      { faqTagline, faqHeading, faqDesc, faqs },
      setSavingFaqs,
      setSavedFaqs,
      "Installation FAQs saved!",
    );
  };

  const handleSaveBenefits = () => {
    saveToServer(
      { benefits },
      setSavingBenefits,
      setSavedBenefits,
      "Installation Benefits saved!",
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Installation & Commissioning Static Page CMS (/services/installation)"
        description="Manage all 6 sections of the Turnkey Installation Page: Hero Banner, Kumar Power Expertise, 6-Step Process, Portfolio Gallery Bulk Uploader, FAQs & Benefits."
      />

      {/* 1. Hero Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Installation & Commissioning')"
          description="Manage badge text, main heading, tagline description & background image."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Badge Tag Text"
              value={heroBadge}
              onChange={(e) => setHeroBadge(e.target.value)}
            />
            <InputField
              label="Hero Heading"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
            />
            <TextAreaField
              label="Subtitle Tagline"
              value={heroSub}
              onChange={(e) => setHeroSub(e.target.value)}
              rows={2}
            />
            <InputField
              label="Primary CTA Button Label"
              value={heroCtaLabel}
              onChange={(e) => setHeroCtaLabel(e.target.value)}
            />
            <ImageUploadField
              label="Hero Background Graphic"
              value={heroBg}
              onChange={(val) => setHeroBg(val)}
            />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingHero}
                saved={savedHero}
                onClick={handleSaveHero}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Intro Section ("KUMAR POWER EXPERTISE") */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="2. Kumar Power Expertise Intro Section"
          description="Manage section tagline, main headline, 2 body paragraphs & showcase side image."
          isOpen={isIntroOpen}
          onToggle={() => setIsIntroOpen(!isIntroOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isIntroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Section Tagline"
              value={introTagline}
              onChange={(e) => setIntroTagline(e.target.value)}
            />
            <InputField
              label="Section Heading"
              value={introHeading}
              onChange={(e) => setIntroHeading(e.target.value)}
            />
            <TextAreaField
              label="Paragraph 1"
              value={introP1}
              onChange={(e) => setIntroP1(e.target.value)}
              rows={3}
            />
            <TextAreaField
              label="Paragraph 2"
              value={introP2}
              onChange={(e) => setIntroP2(e.target.value)}
              rows={3}
            />
            <ImageUploadField
              label="Side Showcase Graphic"
              value={introImage}
              onChange={(val) => setIntroImage(val)}
            />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingIntro}
                saved={savedIntro}
                onClick={handleSaveIntro}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 6-Step Installation Process ("THE KUMAR POWER APPROACH") */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. 6-Step Installation Process Workflow (${steps.length} Steps)`}
          description="Manage section tagline, main heading, overview description, step titles, descriptions, and bullet check items."
          isOpen={isStepsOpen}
          onToggle={() => setIsStepsOpen(!isStepsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isStepsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-slate-100">
              <InputField
                label="Section Tagline"
                value={processTagline}
                onChange={(e) => setProcessTagline(e.target.value)}
              />
              <InputField
                label="Section Heading"
                value={processHeading}
                onChange={(e) => setProcessHeading(e.target.value)}
              />
              <div className="sm:col-span-2">
                <TextAreaField
                  label="Section Description"
                  value={processDesc}
                  onChange={(e) => setProcessDesc(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Process Step
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Step #{s.stepNum || idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeStep(s.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <InputField
                      label="Step #"
                      value={s.stepNum}
                      onChange={(e) =>
                        handleStepChange(s.id, "stepNum", e.target.value)
                      }
                    />
                    <div className="sm:col-span-3">
                      <InputField
                        label="Step Title"
                        value={s.title}
                        onChange={(e) =>
                          handleStepChange(s.id, "title", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label="Step Overview Description"
                    value={s.description}
                    onChange={(e) =>
                      handleStepChange(s.id, "description", e.target.value)
                    }
                    rows={2}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Check Bullet 1"
                      value={s.bullet1}
                      onChange={(e) =>
                        handleStepChange(s.id, "bullet1", e.target.value)
                      }
                    />
                    <InputField
                      label="Check Bullet 2"
                      value={s.bullet2}
                      onChange={(e) =>
                        handleStepChange(s.id, "bullet2", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingSteps}
                saved={savedSteps}
                onClick={handleSaveSteps}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Installation Portfolio Gallery (Bulk Drag & Drop Uploader) */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`4. Installation Portfolio Gallery (${portfolio.length} Projects)`}
          description="Manage tagline, section title, description & CTA label, or drag and drop photos to bulk add projects."
          isOpen={isPortfolioOpen}
          onToggle={() => setIsPortfolioOpen(!isPortfolioOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isPortfolioOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2 border-b border-slate-100">
              <InputField
                label="Section Tagline"
                value={portfolioTagline}
                onChange={(e) => setPortfolioTagline(e.target.value)}
              />
              <InputField
                label="Section Heading"
                value={portfolioHeading}
                onChange={(e) => setPortfolioHeading(e.target.value)}
              />
              <InputField
                label="CTA Button Label"
                value={portfolioCtaLabel}
                onChange={(e) => setPortfolioCtaLabel(e.target.value)}
              />
              <div className="sm:col-span-3">
                <TextAreaField
                  label="Section Description"
                  value={portfolioDesc}
                  onChange={(e) => setPortfolioDesc(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Bulk Upload Drop Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleBulkUpload(e.dataTransfer.files);
              }}
              onClick={() => bulkInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-[#2D6FBA] bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
            >
              <input
                ref={bulkInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleBulkUpload(e.target.files)}
              />
              <div className="p-3 bg-white rounded-full shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition">
                <UploadCloud className="w-6 h-6 text-[#2D6FBA]" />
              </div>
              <p className="text-xs font-bold text-slate-700">
                Click to bulk upload installation project photos or drag and
                drop
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Upload PNG, JPG, or WebP images of residential, commercial &
                industrial DG installations
              </p>
            </div>

            {/* Portfolio Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {portfolio.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removePortfolioItem(p.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition cursor-pointer z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                    Project #{idx + 1}
                  </span>
                  <InputField
                    label="Project Title"
                    value={p.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPortfolio((prev) =>
                        prev.map((item) =>
                          item.id === p.id ? { ...item, name: val } : item,
                        ),
                      );
                    }}
                  />
                  <ImageUploadField
                    label="Project Photo"
                    value={p.imageUrl}
                    onChange={(val) => {
                      setPortfolio((prev) =>
                        prev.map((item) =>
                          item.id === p.id ? { ...item, imageUrl: val } : item,
                        ),
                      );
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingPortfolio}
                saved={savedPortfolio}
                onClick={handleSavePortfolio}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Frequently Asked Questions */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`5. Frequently Asked Questions (${faqs.length} FAQs)`}
          description="Manage section tagline, main heading, overview description & accordion questions & answers."
          isOpen={isFaqsOpen}
          onToggle={() => setIsFaqsOpen(!isFaqsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isFaqsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-slate-100">
              <InputField
                label="Section Tagline"
                value={faqTagline}
                onChange={(e) => setFaqTagline(e.target.value)}
              />
              <InputField
                label="Section Heading"
                value={faqHeading}
                onChange={(e) => setFaqHeading(e.target.value)}
              />
              <div className="sm:col-span-2">
                <TextAreaField
                  label="Section Description"
                  value={faqDesc}
                  onChange={(e) => setFaqDesc(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addFaq}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add FAQ Item
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((f, idx) => (
                <div
                  key={f.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                      FAQ #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFaq(f.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <InputField
                    label="Question Title"
                    value={f.question}
                    onChange={(e) =>
                      handleFaqChange(f.id, "question", e.target.value)
                    }
                  />
                  <TextAreaField
                    label="Answer Paragraph"
                    value={f.answer}
                    onChange={(e) =>
                      handleFaqChange(f.id, "answer", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingFaqs}
                saved={savedFaqs}
                onClick={handleSaveFaqs}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Installation Benefits Grid */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`6. Installation Benefits Cards (${benefits.length} Cards)`}
          description="Manage key advantages (Maximize Reliability, Extend Lifespan, Code Compliance, Protect Warranty, etc.)."
          isOpen={isBenefitsOpen}
          onToggle={() => setIsBenefitsOpen(!isBenefitsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isBenefitsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {benefits.map((b, idx) => (
                <div
                  key={b.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                    Benefit #{idx + 1}
                  </span>
                  <InputField
                    label="Benefit Title"
                    value={b.title}
                    onChange={(e) =>
                      handleBenefitChange(b.id, "title", e.target.value)
                    }
                  />
                  <TextAreaField
                    label="Description"
                    value={b.description}
                    onChange={(e) =>
                      handleBenefitChange(b.id, "description", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingBenefits}
                saved={savedBenefits}
                onClick={handleSaveBenefits}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
