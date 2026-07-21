"use client";

import { useState, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";

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
  imageUrl: string;
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

const INITIAL_STEPS: ProcessStepCard[] = [
  {
    id: "step-1",
    stepNum: "1",
    title: "Initial Consultation & Site Survey",
    description: "We begin with a thorough assessment of your power requirements and site conditions to determine the optimal system configuration, placement, and infrastructure needs.",
    bullet1: "Comprehensive load analysis and power requirements assessment",
    bullet2: "Detailed site inspection and infrastructure evaluation",
  },
  {
    id: "step-2",
    stepNum: "2",
    title: "Detailed Design & Planning",
    description: "Our engineers develop comprehensive installation plans including electrical schematics, mechanical layouts, and project timelines tailored to your specific needs.",
    bullet1: "Custom system design optimized for your facility",
    bullet2: "Detailed project timeline and resource allocation",
  },
  {
    id: "step-3",
    stepNum: "3",
    title: "Permitting & Compliance",
    description: "We handle all necessary permits, regulatory approvals, and compliance requirements to ensure your installation meets all local and national standards.",
    bullet1: "Complete management of permit acquisition process",
    bullet2: "Regulatory compliance verification and documentation",
  },
  {
    id: "step-4",
    stepNum: "4",
    title: "Professional Installation",
    description: "Our certified technicians execute the installation according to the detailed plan, ensuring all components are properly installed, connected, and secured.",
    bullet1: "Expert mechanical and electrical installation by certified technicians",
    bullet2: "Quality control checks at each installation milestone",
  },
  {
    id: "step-5",
    stepNum: "5",
    title: "Testing & Commissioning",
    description: "We conduct comprehensive testing of all systems, including load testing, performance verification, and safety checks to ensure everything functions correctly.",
    bullet1: "Full-load testing under various operational conditions",
    bullet2: "System performance optimization and calibration",
  },
  {
    id: "step-6",
    stepNum: "6",
    title: "Training & Handover",
    description: "We provide thorough training for your staff on system operation and basic maintenance, along with complete documentation and warranty information.",
    bullet1: "Comprehensive operator training and knowledge transfer",
    bullet2: "Complete system documentation and maintenance schedules",
  },
];

const INITIAL_PORTFOLIO: PortfolioItem[] = [
  { id: "p-2", name: "Commercial Power System", category: "Commercial", imageUrl: "" },
  { id: "p-3", name: "Residential Backup Generator", category: "Residential", imageUrl: "" },
  { id: "p-4", name: "Hospital Emergency Power", category: "Commercial", imageUrl: "" },
  { id: "p-5", name: "Data Center Installation", category: "Industrial", imageUrl: "" },
  { id: "p-6", name: "Manufacturing Facility Setup", category: "Industrial", imageUrl: "" },
  { id: "p-7", name: "Office Building Generator", category: "Commercial", imageUrl: "" },
  { id: "p-8", name: "Home Standby Power", category: "Residential", imageUrl: "" },
  { id: "p-9", name: "Retail Power Solution", category: "Commercial", imageUrl: "" },
  { id: "p-10", name: "Industrial Complex System", category: "Industrial", imageUrl: "" },
  { id: "p-11", name: "Apartment Building Generator", category: "Residential", imageUrl: "" },
];

const INITIAL_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How long does the installation process take?",
    answer: "The installation timeline varies based on the system complexity and site conditions. Small to medium generators typically take 1-3 days, while larger industrial installations may require 1-2 weeks.",
  },
  {
    id: "faq-2",
    question: "Do you handle all required permits and approvals?",
    answer: "Yes, we manage the entire permitting process. Our team handles all necessary documentation, regulatory compliance, and approvals from local authorities.",
  },
  {
    id: "faq-3",
    question: "Can you install generators in difficult locations?",
    answer: "Absolutely. Our installation teams are equipped to handle challenging locations including rooftops, basements, confined spaces, and remote sites.",
  },
  {
    id: "faq-4",
    question: "Will the installation cause disruption to our operations?",
    answer: "We minimize disruption by carefully planning the installation process. Most electrical connections requiring power interruption can be scheduled during off-hours.",
  },
  {
    id: "faq-5",
    question: "What happens after installation is complete?",
    answer: "Following installation, we conduct comprehensive commissioning tests, provide detailed operator training, and deliver complete documentation including operation manuals and warranty info.",
  },
  {
    id: "faq-6",
    question: "Are your installations covered by warranty?",
    answer: "Yes, all our installation work is backed by a comprehensive warranty. We provide a standard 12-month warranty on labor and workmanship in addition to manufacturer warranties.",
  },
];

const INITIAL_BENEFITS: BenefitCard[] = [
  { id: "b-1", title: "Maximize System Reliability", description: "Proper installation ensures your power system performs optimally during critical situations." },
  { id: "b-2", title: "Extend Equipment Lifespan", description: "Professional installation with correct mounting and calibration significantly extends operational life." },
  { id: "b-3", title: "Ensure Code Compliance", description: "Our certified technicians ensure all installations meet or exceed local codes and CPCB standards." },
  { id: "b-4", title: "Optimize Performance", description: "Expert installation and commissioning maximize fuel efficiency, power output, and system responsiveness." },
  { id: "b-5", title: "Minimize Maintenance Issues", description: "Correctly installed systems require less maintenance and experience fewer operational problems over their lifetime." },
  { id: "b-6", title: "Protect Warranty Coverage", description: "Professional installation maintains manufacturer warranty coverage and provides labor guarantees." },
];

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
  const [heroBadge, setHeroBadge] = useState("Professional Services");
  const [heroHeading, setHeroHeading] = useState("Installation & Commissioning");
  const [heroSub, setHeroSub] = useState("Expert power system installation and commissioning services for optimal performance, reliability, and compliance.");
  const [heroBg, setHeroBg] = useState("");
  const [heroCtaLabel, setHeroCtaLabel] = useState("Schedule a Consultation");

  // Intro Section State
  const [introTagline, setIntroTagline] = useState("KUMAR POWER EXPERTISE");
  const [introHeading, setIntroHeading] = useState("Professional Power System Installation");
  const [introP1, setIntroP1] = useState("Kumar Power delivers end-to-end installation and commissioning services for all types of power generation equipment, ensuring your systems operate at peak efficiency from day one.");
  const [introP2, setIntroP2] = useState("Our certified technicians handle everything from site assessment and planning to final commissioning and operator training, delivering turnkey solutions that maximize reliability and minimize downtime across industries.");
  const [introImage, setIntroImage] = useState("");

  // Process Steps State
  const [steps, setSteps] = useState<ProcessStepCard[]>(INITIAL_STEPS);

  // Portfolio Gallery State
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  // FAQs State
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);

  // Benefits State
  const [benefits, setBenefits] = useState<BenefitCard[]>(INITIAL_BENEFITS);

  // Step Handlers
  const handleStepChange = (id: string, field: keyof ProcessStepCard, val: string) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
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
      imageUrl: URL.createObjectURL(file),
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
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: val } : f)));
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { id: `faq-${Date.now()}`, question: "", answer: "" }]);
    toast.success("New FAQ added!");
  };

  const removeFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    toast.success("FAQ removed");
  };

  // Benefit Handlers
  const handleBenefitChange = (id: string, field: keyof BenefitCard, val: string) => {
    setBenefits((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: val } : b)));
  };

  // Save Handlers
  const handleSaveHero = () => {
    setSavingHero(true);
    setTimeout(() => {
      setSavingHero(false);
      setSavedHero(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSavedHero(false), 2000);
    }, 400);
  };

  const handleSaveIntro = () => {
    setSavingIntro(true);
    setTimeout(() => {
      setSavingIntro(false);
      setSavedIntro(true);
      toast.success("Expertise Intro section saved!");
      setTimeout(() => setSavedIntro(false), 2000);
    }, 400);
  };

  const handleSaveSteps = () => {
    setSavingSteps(true);
    setTimeout(() => {
      setSavingSteps(false);
      setSavedSteps(true);
      toast.success("6-Step Installation Process saved!");
      setTimeout(() => setSavedSteps(false), 2000);
    }, 400);
  };

  const handleSavePortfolio = () => {
    setSavingPortfolio(true);
    setTimeout(() => {
      setSavingPortfolio(false);
      setSavedPortfolio(true);
      toast.success("Installation Portfolio Gallery saved!");
      setTimeout(() => setSavedPortfolio(false), 2000);
    }, 400);
  };

  const handleSaveFaqs = () => {
    setSavingFaqs(true);
    setTimeout(() => {
      setSavingFaqs(false);
      setSavedFaqs(true);
      toast.success("Installation FAQs saved!");
      setTimeout(() => setSavedFaqs(false), 2000);
    }, 400);
  };

  const handleSaveBenefits = () => {
    setSavingBenefits(true);
    setTimeout(() => {
      setSavingBenefits(false);
      setSavedBenefits(true);
      toast.success("Installation Benefits saved!");
      setTimeout(() => setSavedBenefits(false), 2000);
    }, 400);
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
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Badge Tag Text" value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} />
            <InputField label="Hero Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <TextAreaField label="Subtitle Tagline" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <InputField label="Primary CTA Button Label" value={heroCtaLabel} onChange={(e) => setHeroCtaLabel(e.target.value)} />
            <ImageUploadField label="Hero Background Graphic" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
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
        <div className={`grid transition-all duration-300 ${isIntroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Section Tagline" value={introTagline} onChange={(e) => setIntroTagline(e.target.value)} />
            <InputField label="Section Heading" value={introHeading} onChange={(e) => setIntroHeading(e.target.value)} />
            <TextAreaField label="Paragraph 1" value={introP1} onChange={(e) => setIntroP1(e.target.value)} rows={3} />
            <TextAreaField label="Paragraph 2" value={introP2} onChange={(e) => setIntroP2(e.target.value)} rows={3} />
            <ImageUploadField label="Side Showcase Graphic" value={introImage} onChange={(val) => setIntroImage(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingIntro} saved={savedIntro} onClick={handleSaveIntro} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 6-Step Installation Process ("THE KUMAR POWER APPROACH") */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. 6-Step Installation Process Workflow (${steps.length} Steps)`}
          description="Manage step titles, descriptions, and bullet check items."
          isOpen={isStepsOpen}
          onToggle={() => setIsStepsOpen(!isStepsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isStepsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
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
                <div key={s.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Step #{s.stepNum || idx + 1}
                    </span>
                    <button type="button" onClick={() => removeStep(s.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <InputField label="Step #" value={s.stepNum} onChange={(e) => handleStepChange(s.id, "stepNum", e.target.value)} />
                    <div className="sm:col-span-3">
                      <InputField label="Step Title" value={s.title} onChange={(e) => handleStepChange(s.id, "title", e.target.value)} />
                    </div>
                  </div>
                  <TextAreaField label="Step Overview Description" value={s.description} onChange={(e) => handleStepChange(s.id, "description", e.target.value)} rows={2} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Check Bullet 1" value={s.bullet1} onChange={(e) => handleStepChange(s.id, "bullet1", e.target.value)} />
                    <InputField label="Check Bullet 2" value={s.bullet2} onChange={(e) => handleStepChange(s.id, "bullet2", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingSteps} saved={savedSteps} onClick={handleSaveSteps} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Installation Portfolio Gallery (Bulk Drag & Drop Uploader) */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`4. Installation Portfolio Gallery (${portfolio.length} Projects)`}
          description="Drag and drop or select photos to bulk add installation projects across Commercial, Residential, and Industrial sectors."
          isOpen={isPortfolioOpen}
          onToggle={() => setIsPortfolioOpen(!isPortfolioOpen)}
        />
        <div className={`grid transition-all duration-300 ${isPortfolioOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
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
                Click to bulk upload installation project photos or drag and drop
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Upload PNG, JPG, or WebP images of residential, commercial & industrial DG installations
              </p>
            </div>

            {/* Portfolio Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {portfolio.map((p, idx) => (
                <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group">
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
                      setPortfolio((prev) => prev.map((item) => (item.id === p.id ? { ...item, name: val } : item)));
                    }}
                  />
                  <ImageUploadField
                    label="Project Photo"
                    value={p.imageUrl}
                    onChange={(val) => {
                      setPortfolio((prev) => prev.map((item) => (item.id === p.id ? { ...item, imageUrl: val } : item)));
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingPortfolio} saved={savedPortfolio} onClick={handleSavePortfolio} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Frequently Asked Questions */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`5. Frequently Asked Questions (${faqs.length} FAQs)`}
          description="Manage client accordion questions & answers regarding installation timelines, permits, warranties, etc."
          isOpen={isFaqsOpen}
          onToggle={() => setIsFaqsOpen(!isFaqsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isFaqsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
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
                <div key={f.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                      FAQ #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeFaq(f.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <InputField label="Question Title" value={f.question} onChange={(e) => handleFaqChange(f.id, "question", e.target.value)} />
                  <TextAreaField label="Answer Paragraph" value={f.answer} onChange={(e) => handleFaqChange(f.id, "answer", e.target.value)} rows={3} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingFaqs} saved={savedFaqs} onClick={handleSaveFaqs} />
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
        <div className={`grid transition-all duration-300 ${isBenefitsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {benefits.map((b, idx) => (
                <div key={b.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                    Benefit #{idx + 1}
                  </span>
                  <InputField label="Benefit Title" value={b.title} onChange={(e) => handleBenefitChange(b.id, "title", e.target.value)} />
                  <TextAreaField label="Description" value={b.description} onChange={(e) => handleBenefitChange(b.id, "description", e.target.value)} rows={3} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingBenefits} saved={savedBenefits} onClick={handleSaveBenefits} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
