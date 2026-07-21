"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type AmcPlanCard = {
  id: string;
  name: string;
  price: string;
  period: string;
  visits: string;
  response: string;
  partsCovered: string;
  features: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const INITIAL_PLANS: AmcPlanCard[] = [
  {
    id: "plan-1",
    name: "Basic AMC Plan",
    price: "Custom",
    period: "Annual",
    visits: "Quarterly (4 visits/yr)",
    response: "48 hours guaranteed",
    partsCovered: "Essential consumables & basic filters",
    features: "Preventive inspections, oil checks, basic filter cleaning & priority phone support",
  },
  {
    id: "plan-2",
    name: "Standard AMC Plan",
    price: "Custom",
    period: "Annual",
    visits: "Bi-monthly (6 visits/yr)",
    response: "24 hours guaranteed",
    partsCovered: "Common wear components & major filters",
    features: "Scheduled servicing, battery checks, fluid replacements & 24hr technician dispatch",
  },
  {
    id: "plan-3",
    name: "Premium AMC Plan",
    price: "Custom",
    period: "Annual",
    visits: "Monthly (12 visits/yr)",
    response: "12 hours guaranteed",
    partsCovered: "Comprehensive parts & electrical controls",
    features: "24/7 dedicated engineer, emergency calls included, full engine tune-ups & IoT health report",
  },
];

const INITIAL_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What does the Annual Maintenance Contract cover?",
    answer: "Our AMC covers scheduled preventive maintenance visits, troubleshooting, repairs, part replacements as per the selected plan, technical support, and emergency response services.",
  },
  {
    id: "faq-2",
    question: "How often will maintenance be performed?",
    answer: "Maintenance frequency depends on your selected plan: Basic AMC includes quarterly visits, Standard AMC includes bi-monthly visits, and Premium AMC includes monthly visits.",
  },
  {
    id: "faq-3",
    question: "What is the emergency response time?",
    answer: "Emergency response times vary by plan: Basic AMC ensures 48-hour response, Standard AMC provides 24-hour response, and Premium AMC guarantees 12-hour response.",
  },
];

export default function AnnualMaintenanceCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isFaqsOpen, setIsFaqsOpen] = useState(false);

  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingPlans, setSavingPlans] = useState(false);
  const [savedPlans, setSavedPlans] = useState(false);

  const [savingFaqs, setSavingFaqs] = useState(false);
  const [savedFaqs, setSavedFaqs] = useState(false);

  // Hero Section
  const [heroTagline, setHeroTagline] = useState("ANNUAL MAINTENANCE CONTRACTS");
  const [heroHeading, setHeroHeading] = useState("Preventive Care for Uninterrupted Power");
  const [heroSub, setHeroSub] = useState("Ensure maximum uptime and equipment longevity with our comprehensive maintenance solutions tailored for Kirloskar DG sets.");
  const [heroBg, setHeroBg] = useState("");

  // Plans List
  const [plans, setPlans] = useState<AmcPlanCard[]>(INITIAL_PLANS);

  // FAQs List
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);

  const handlePlanChange = (id: string, field: keyof AmcPlanCard, val: string) => {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const addPlan = () => {
    setPlans((prev) => [
      ...prev,
      { id: `plan-${Date.now()}`, name: "", price: "Custom", period: "Annual", visits: "", response: "", partsCovered: "", features: "" },
    ]);
    toast.success("New AMC plan added!");
  };

  const removePlan = (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    toast.success("AMC plan removed");
  };

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

  const handleSaveHero = () => {
    setSavingHero(true);
    setTimeout(() => {
      setSavingHero(false);
      setSavedHero(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSavedHero(false), 2000);
    }, 400);
  };

  const handleSavePlans = () => {
    setSavingPlans(true);
    setTimeout(() => {
      setSavingPlans(false);
      setSavedPlans(true);
      toast.success("AMC plans saved!");
      setTimeout(() => setSavedPlans(false), 2000);
    }, 400);
  };

  const handleSaveFaqs = () => {
    setSavingFaqs(true);
    setTimeout(() => {
      setSavingFaqs(false);
      setSavedFaqs(true);
      toast.success("FAQs section saved!");
      setTimeout(() => setSavedFaqs(false), 2000);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Annual Maintenance Service CMS (/services/annual-maintenance)"
        description="Manage the Annual Maintenance Contracts page (Hero Banner, AMC Plans & Packages, FAQs & Consultation hotline)."
      />

      {/* 1. Hero Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('ANNUAL MAINTENANCE CONTRACTS')"
          description="Manage headline, subtitle tagline & hero background image."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Tagline Badge Text" value={heroTagline} onChange={(e) => setHeroTagline(e.target.value)} />
            <InputField label="Main Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <TextAreaField label="Subtitle Tagline" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <ImageUploadField label="Background Banner Image" value={heroBg} onChange={(val) => setHeroBg(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. AMC Packages & Plans */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. AMC Contract Packages (${plans.length} Plans)`}
          description="Manage maintenance tiers (Basic, Standard, Premium), visit frequencies, response SLAs & covered parts."
          isOpen={isPlansOpen}
          onToggle={() => setIsPlansOpen(!isPlansOpen)}
        />
        <div className={`grid transition-all duration-300 ${isPlansOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addPlan}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add AMC Plan
              </button>
            </div>

            <div className="space-y-4">
              {plans.map((p, idx) => (
                <div key={p.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Plan #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removePlan(p.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Plan Name" value={p.name} onChange={(e) => handlePlanChange(p.id, "name", e.target.value)} placeholder="e.g. Standard AMC Plan" />
                    <InputField label="Visit Frequency" value={p.visits} onChange={(e) => handlePlanChange(p.id, "visits", e.target.value)} placeholder="e.g. Bi-monthly (6 visits/yr)" />
                    <InputField label="Guaranteed Response SLA" value={p.response} onChange={(e) => handlePlanChange(p.id, "response", e.target.value)} placeholder="e.g. 24 hours guaranteed" />
                    <InputField label="Parts & Components Coverage" value={p.partsCovered} onChange={(e) => handlePlanChange(p.id, "partsCovered", e.target.value)} />
                  </div>
                  <TextAreaField label="Plan Features Summary" value={p.features} onChange={(e) => handlePlanChange(p.id, "features", e.target.value)} rows={3} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingPlans} saved={savedPlans} onClick={handleSavePlans} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Frequently Asked Questions */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. Frequently Asked Questions (${faqs.length} FAQs)`}
          description="Manage client accordion questions & answers regarding AMC coverage and SLAs."
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
    </div>
  );
}
