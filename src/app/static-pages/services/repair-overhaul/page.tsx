"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { uploadFilesDeep } from "@/lib/uploadHelpers";

type RepairServiceCard = {
  title: string;
  description: string;
  icon: string;
  features: string[];
};

type BenefitCard = {
  title: string;
  description: string;
  icon: string;
};

type ProcessStepCard = {
  title: string;
  description: string;
  features: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

export default function RepairOverhaulCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [savingSection, setSavingSection] = useState<string | null>(null);

  // Strings
  const [heroBadge, setHeroBadge] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroCtaLabel, setHeroCtaLabel] = useState("");
  const [heroCtaLink, setHeroCtaLink] = useState("");
  const [heroBg, setHeroBg] = useState("");

  const [introTitle, setIntroTitle] = useState("");
  const [introDesc, setIntroDesc] = useState("");
  const [introTagline, setIntroTagline] = useState("");
  const [introImage, setIntroImage] = useState<string | File>("");
  const [introBtn1Label, setIntroBtn1Label] = useState("");
  const [introBtn1Link, setIntroBtn1Link] = useState("");
  const [introBtn2Label, setIntroBtn2Label] = useState("");
  const [introBtn2Link, setIntroBtn2Link] = useState("");

  const [diffTagline, setDiffTagline] = useState("");
  const [diffHeading, setDiffHeading] = useState("");
  const [diffDesc, setDiffDesc] = useState("");

  const [repairTabLabel, setRepairTabLabel] = useState("");
  const [repairTabTitle, setRepairTabTitle] = useState("");
  const [repairTabDesc1, setRepairTabDesc1] = useState("");
  const [repairScenarios, setRepairScenarios] = useState<string[]>([]);
  const [repairTabDesc2, setRepairTabDesc2] = useState("");

  const [overhaulTabLabel, setOverhaulTabLabel] = useState("");
  const [overhaulTabTitle, setOverhaulTabTitle] = useState("");
  const [overhaulTabDesc1, setOverhaulTabDesc1] = useState("");
  const [overhaulScenarios, setOverhaulScenarios] = useState<string[]>([]);
  const [overhaulTabDesc2, setOverhaulTabDesc2] = useState("");

  const [servicesTagline, setServicesTagline] = useState("");
  const [servicesHeading, setServicesHeading] = useState("");
  const [servicesDesc, setServicesDesc] = useState("");

  const [benefitsTagline, setBenefitsTagline] = useState("");
  const [benefitsHeading, setBenefitsHeading] = useState("");
  const [benefitsDesc, setBenefitsDesc] = useState("");
  const [benefitsCtaLabel, setBenefitsCtaLabel] = useState("");
  const [benefitsCtaLink, setBenefitsCtaLink] = useState("");

  const [processTagline, setProcessTagline] = useState("");
  const [processHeading, setProcessHeading] = useState("");
  const [processDesc, setProcessDesc] = useState("");

  const [faqTagline, setFaqTagline] = useState("");
  const [faqHeading, setFaqHeading] = useState("");
  const [faqDesc, setFaqDesc] = useState("");

  const [hotlineLabel, setHotlineLabel] = useState("");
  const [hotlineLink, setHotlineLink] = useState("");
  const [helpTitle, setHelpTitle] = useState("");
  const [helpSub, setHelpSub] = useState("");
  const [helpBtnLabel, setHelpBtnLabel] = useState("");
  const [helpBtnLink, setHelpBtnLink] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Arrays
  const [services, setServices] = useState<RepairServiceCard[]>([]);
  const [benefits, setBenefits] = useState<BenefitCard[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStepCard[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        const res = await fetch("/api/repair-overhaul");
        const json = await res.json();
        if (json.success && json.data) {
          const content = json.data.services || json.data["repair-overhaul"];
          if (content) {
            setHeroBadge(content.heroBadge || "");
            setHeroHeading(content.heroHeading || "");
            setHeroSub(content.heroSub || "");
            setHeroCtaLabel(content.heroCtaLabel || "");
            setHeroCtaLink(content.heroCtaLink || "");
            setHeroBg(content.heroBg || "");

            setIntroTitle(content.introTitle || "");
            setIntroDesc(content.introDesc || [content.introDesc1, content.introDesc2].filter(Boolean).join("\n\n") || "");
            setIntroTagline(content.introTagline || "");
            setIntroImage(content.introImage || "");
            setIntroBtn1Label(content.introBtn1Label || "");
            setIntroBtn1Link(content.introBtn1Link || "");
            setIntroBtn2Label(content.introBtn2Label || "");
            setIntroBtn2Link(content.introBtn2Link || "");

            setDiffTagline(content.diffTagline || "");
            setDiffHeading(content.diffHeading || "");
            setDiffDesc(content.diffDesc || "");

            setRepairTabLabel(content.repairTabLabel || "");
            setRepairTabTitle(content.repairTabTitle || "");
            setRepairTabDesc1(content.repairTabDesc1 || "");
            setRepairScenarios(Array.isArray(content.repairScenarios) ? content.repairScenarios : typeof content.repairScenarios === "string" ? JSON.parse(content.repairScenarios) : []);
            setRepairTabDesc2(content.repairTabDesc2 || "");

            setOverhaulTabLabel(content.overhaulTabLabel || "");
            setOverhaulTabTitle(content.overhaulTabTitle || "");
            setOverhaulTabDesc1(content.overhaulTabDesc1 || "");
            setOverhaulScenarios(Array.isArray(content.overhaulScenarios) ? content.overhaulScenarios : typeof content.overhaulScenarios === "string" ? JSON.parse(content.overhaulScenarios) : []);
            setOverhaulTabDesc2(content.overhaulTabDesc2 || "");

            setServicesTagline(content.servicesTagline || "");
            setServicesHeading(content.servicesHeading || "");
            setServicesDesc(content.servicesDesc || "");

            setBenefitsTagline(content.benefitsTagline || "");
            setBenefitsHeading(content.benefitsHeading || "");
            setBenefitsDesc(content.benefitsDesc || "");
            setBenefitsCtaLabel(content.benefitsCtaLabel || "");
            setBenefitsCtaLink(content.benefitsCtaLink || "");

            setProcessTagline(content.processTagline || "");
            setProcessHeading(content.processHeading || "");
            setProcessDesc(content.processDesc || "");

            setFaqTagline(content.faqTagline || "");
            setFaqHeading(content.faqHeading || "");
            setFaqDesc(content.faqDesc || "");

            setHotlineLabel(content.hotlineLabel || "");
            setHotlineLink(content.hotlineLink || "");
            setHelpTitle(content.helpTitle || "");
            setHelpSub(content.helpSub || "");
            setHelpBtnLabel(content.helpBtnLabel || "");
            setHelpBtnLink(content.helpBtnLink || "");
            setEmergencyPhone(content.emergencyPhone || "");

            setServices(Array.isArray(content.services) ? content.services : typeof content.services === "string" ? JSON.parse(content.services) : []);
            setBenefits(Array.isArray(content.benefits) ? content.benefits : typeof content.benefits === "string" ? JSON.parse(content.benefits) : []);
            setProcessSteps(Array.isArray(content.processSteps) ? content.processSteps : typeof content.processSteps === "string" ? JSON.parse(content.processSteps) : []);
            setFaqs(Array.isArray(content.faqs) ? content.faqs : typeof content.faqs === "string" ? JSON.parse(content.faqs) : []);
          }
        }
      } catch (err) {
        console.error("Failed to load CMS data:", err);
      }
    };
    fetchCMSData();
  }, []);

  const handleSave = async (sectionName: string) => {
    setSavingSection(sectionName);
    try {
      const rawContent = {
        heroBadge, heroHeading, heroSub, heroCtaLabel, heroCtaLink, heroBg,
        introTitle, introDesc, introTagline, introImage, introBtn1Label, introBtn1Link, introBtn2Label, introBtn2Link,
        diffTagline, diffHeading, diffDesc,
        repairTabLabel, repairTabTitle, repairTabDesc1, repairScenarios, repairTabDesc2,
        overhaulTabLabel, overhaulTabTitle, overhaulTabDesc1, overhaulScenarios, overhaulTabDesc2,
        servicesTagline, servicesHeading, servicesDesc, services,
        benefitsTagline, benefitsHeading, benefitsDesc, benefitsCtaLabel, benefitsCtaLink, benefits,
        processTagline, processHeading, processDesc, processSteps,
        faqTagline, faqHeading, faqDesc, faqs,
        hotlineLabel, hotlineLink, helpTitle, helpSub, helpBtnLabel, helpBtnLink, emergencyPhone
      };

      const content = await uploadFilesDeep(rawContent);
      if (content.introImage && typeof content.introImage === "string") {
        setIntroImage(content.introImage);
      }

      const res = await fetch("/api/repair-overhaul", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "services", content }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success(sectionName + " saved!");
      } else {
        toast.error("Failed to save.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving section.");
    } finally {
      setSavingSection(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Repair & Overhaul Service Static Page CMS (/services/repair-overhaul)"
        description="Manage the Engine Repair & Overhauling page (Hero, Intro, Differences, Services, Benefits, Process, FAQs, Help)."
      />

      {/* Hero Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section"
          description="Manage badge text, main heading, tagline description & CTA button."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Hero Badge" value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} />
            <InputField label="Hero Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <TextAreaField label="Hero Subheading" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Hero CTA Label" value={heroCtaLabel} onChange={(e) => setHeroCtaLabel(e.target.value)} />
              <InputField label="Hero CTA Link" value={heroCtaLink} onChange={(e) => setHeroCtaLink(e.target.value)} placeholder="/contact" />
            </div>
            <SaveButton
              onClick={() => handleSave("Hero Section")}
              isSaving={savingSection === "Hero Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="2. Intro Section"
          description="Manage intro title, taglines, unified description paragraph, image and call-to-action buttons."
          isOpen={isIntroOpen}
          onToggle={() => setIsIntroOpen(!isIntroOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isIntroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Intro Tagline" value={introTagline} onChange={(e) => setIntroTagline(e.target.value)} />
            <InputField label="Intro Title" value={introTitle} onChange={(e) => setIntroTitle(e.target.value)} />
            <TextAreaField
              label="Intro Description (Use Enter for paragraph breaks)"
              value={introDesc}
              onChange={(e) => setIntroDesc(e.target.value)}
              rows={6}
            />
            <ImageUploadField label="Intro Image" value={introImage} onChange={(val) => setIntroImage(val)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Button 1 Label" value={introBtn1Label} onChange={(e) => setIntroBtn1Label(e.target.value)} />
              <InputField label="Button 1 Link" value={introBtn1Link} onChange={(e) => setIntroBtn1Link(e.target.value)} placeholder="/contact" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Button 2 Label" value={introBtn2Label} onChange={(e) => setIntroBtn2Label(e.target.value)} />
              <InputField label="Button 2 Link" value={introBtn2Link} onChange={(e) => setIntroBtn2Link(e.target.value)} placeholder="tel:+919773851767" />
            </div>
            <SaveButton
              onClick={() => handleSave("Intro Section")}
              isSaving={savingSection === "Intro Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Differences Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Repair vs Overhaul Section"
          description="Manage the section and tabs outlining the differences between repair and overhaul services."
          isOpen={isDiffOpen}
          onToggle={() => setIsDiffOpen(!isDiffOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isDiffOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Tagline" value={diffTagline} onChange={(e) => setDiffTagline(e.target.value)} />
            <InputField label="Heading" value={diffHeading} onChange={(e) => setDiffHeading(e.target.value)} />
            <TextAreaField label="Description" value={diffDesc} onChange={(e) => setDiffDesc(e.target.value)} rows={2} />

            {/* Repair Tab Details */}
            <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3">
              <h4 className="font-semibold text-gray-800">Repair Tab Configuration</h4>
              <InputField label="Tab Trigger Label" value={repairTabLabel} onChange={(e) => setRepairTabLabel(e.target.value)} />
              <InputField label="Tab Card Title" value={repairTabTitle} onChange={(e) => setRepairTabTitle(e.target.value)} />
              <TextAreaField label="Tab Description 1" value={repairTabDesc1} onChange={(e) => setRepairTabDesc1(e.target.value)} rows={2} />
              <TextAreaField
                label="Repair Scenarios (one per line)"
                value={repairScenarios.join("\n")}
                onChange={(e) => setRepairScenarios(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
                rows={5}
              />
              <TextAreaField label="Tab Description 2" value={repairTabDesc2} onChange={(e) => setRepairTabDesc2(e.target.value)} rows={2} />
            </div>

            {/* Overhaul Tab Details */}
            <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3">
              <h4 className="font-semibold text-gray-800">Overhaul Tab Configuration</h4>
              <InputField label="Tab Trigger Label" value={overhaulTabLabel} onChange={(e) => setOverhaulTabLabel(e.target.value)} />
              <InputField label="Tab Card Title" value={overhaulTabTitle} onChange={(e) => setOverhaulTabTitle(e.target.value)} />
              <TextAreaField label="Tab Description 1" value={overhaulTabDesc1} onChange={(e) => setOverhaulTabDesc1(e.target.value)} rows={2} />
              <TextAreaField
                label="Overhaul Scenarios (one per line)"
                value={overhaulScenarios.join("\n")}
                onChange={(e) => setOverhaulScenarios(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
                rows={5}
              />
              <TextAreaField label="Tab Description 2" value={overhaulTabDesc2} onChange={(e) => setOverhaulTabDesc2(e.target.value)} rows={2} />
            </div>

            <SaveButton
              onClick={() => handleSave("Repair vs Overhaul Section")}
              isSaving={savingSection === "Repair vs Overhaul Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="4. Services Section"
          description="Manage the comprehensive repair and overhaul services offered."
          isOpen={isServicesOpen}
          onToggle={() => setIsServicesOpen(!isServicesOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isServicesOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Tagline" value={servicesTagline} onChange={(e) => setServicesTagline(e.target.value)} />
            <InputField label="Heading" value={servicesHeading} onChange={(e) => setServicesHeading(e.target.value)} />
            <TextAreaField label="Description" value={servicesDesc} onChange={(e) => setServicesDesc(e.target.value)} rows={2} />

            <div className="mt-2 flex flex-col gap-4">
              <h4 className="font-medium text-gray-700">Services Items</h4>
              {services.map((s, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 flex flex-col gap-3">
                  <InputField label="Title" value={s.title} onChange={(e) => {
                    const ns = [...services]; ns[i].title = e.target.value; setServices(ns);
                  }} />
                  <TextAreaField label="Description" value={s.description} onChange={(e) => {
                    const ns = [...services]; ns[i].description = e.target.value; setServices(ns);
                  }} rows={2} />
                  <InputField label="Icon (e.g. AlertTriangle, Wrench, Cpu, Clock)" value={s.icon} onChange={(e) => {
                    const ns = [...services]; ns[i].icon = e.target.value; setServices(ns);
                  }} />
                  <TextAreaField label="Features (comma separated)" value={s.features?.join(", ") || ""} onChange={(e) => {
                    const ns = [...services]; ns[i].features = e.target.value.split(",").map((f) => f.trim()).filter(Boolean); setServices(ns);
                  }} rows={2} />
                  <button onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="self-start text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                    <Trash2 className="w-4 h-4" /> Remove Service
                  </button>
                </div>
              ))}
              <button onClick={() => setServices([...services, { title: "", description: "", icon: "Wrench", features: [] }])} className="self-start flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                <Plus className="mr-1 h-4 w-4" /> Add Service
              </button>
            </div>

            <SaveButton
              onClick={() => handleSave("Services Section")}
              isSaving={savingSection === "Services Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="5. Benefits Section"
          description="Manage the benefits of professional repair and overhaul."
          isOpen={isBenefitsOpen}
          onToggle={() => setIsBenefitsOpen(!isBenefitsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isBenefitsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Tagline" value={benefitsTagline} onChange={(e) => setBenefitsTagline(e.target.value)} />
            <InputField label="Heading" value={benefitsHeading} onChange={(e) => setBenefitsHeading(e.target.value)} />
            <TextAreaField label="Description" value={benefitsDesc} onChange={(e) => setBenefitsDesc(e.target.value)} rows={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="CTA Label" value={benefitsCtaLabel} onChange={(e) => setBenefitsCtaLabel(e.target.value)} />
              <InputField label="CTA Link" value={benefitsCtaLink} onChange={(e) => setBenefitsCtaLink(e.target.value)} placeholder="/contact" />
            </div>

            <div className="mt-2 flex flex-col gap-4">
              <h4 className="font-medium text-gray-700">Benefits Items</h4>
              {benefits.map((b, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 flex flex-col gap-3">
                  <InputField label="Title" value={b.title} onChange={(e) => {
                    const nb = [...benefits]; nb[i].title = e.target.value; setBenefits(nb);
                  }} />
                  <TextAreaField label="Description" value={b.description} onChange={(e) => {
                    const nb = [...benefits]; nb[i].description = e.target.value; setBenefits(nb);
                  }} rows={2} />
                  <InputField label="Icon (e.g. Clock, Shield, Activity, FileText, CheckCircle2, Zap)" value={b.icon} onChange={(e) => {
                    const nb = [...benefits]; nb[i].icon = e.target.value; setBenefits(nb);
                  }} />
                  <button onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))} className="self-start text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                    <Trash2 className="w-4 h-4" /> Remove Benefit
                  </button>
                </div>
              ))}
              <button onClick={() => setBenefits([...benefits, { title: "", description: "", icon: "Shield" }])} className="self-start flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                <Plus className="mr-1 h-4 w-4" /> Add Benefit
              </button>
            </div>

            <SaveButton
              onClick={() => handleSave("Benefits Section")}
              isSaving={savingSection === "Benefits Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="6. Process Section"
          description="Manage the steps of the repair and overhaul process."
          isOpen={isProcessOpen}
          onToggle={() => setIsProcessOpen(!isProcessOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isProcessOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Tagline" value={processTagline} onChange={(e) => setProcessTagline(e.target.value)} />
            <InputField label="Heading" value={processHeading} onChange={(e) => setProcessHeading(e.target.value)} />
            <TextAreaField label="Description" value={processDesc} onChange={(e) => setProcessDesc(e.target.value)} rows={2} />

            <div className="mt-2 flex flex-col gap-4">
              <h4 className="font-medium text-gray-700">Process Steps</h4>
              {processSteps.map((p, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 flex flex-col gap-3">
                  <InputField label="Title" value={p.title} onChange={(e) => {
                    const np = [...processSteps]; np[i].title = e.target.value; setProcessSteps(np);
                  }} />
                  <TextAreaField label="Description" value={p.description} onChange={(e) => {
                    const np = [...processSteps]; np[i].description = e.target.value; setProcessSteps(np);
                  }} rows={2} />
                  <TextAreaField label="Features (comma separated)" value={p.features?.join(", ") || ""} onChange={(e) => {
                    const np = [...processSteps]; np[i].features = e.target.value.split(",").map((f) => f.trim()).filter(Boolean); setProcessSteps(np);
                  }} rows={2} />
                  <button onClick={() => setProcessSteps(processSteps.filter((_, idx) => idx !== i))} className="self-start text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                    <Trash2 className="w-4 h-4" /> Remove Step
                  </button>
                </div>
              ))}
              <button onClick={() => setProcessSteps([...processSteps, { title: "", description: "", features: [] }])} className="self-start flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                <Plus className="mr-1 h-4 w-4" /> Add Process Step
              </button>
            </div>

            <SaveButton
              onClick={() => handleSave("Process Section")}
              isSaving={savingSection === "Process Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="7. FAQs Section"
          description="Manage frequently asked questions and their answers."
          isOpen={isFaqOpen}
          onToggle={() => setIsFaqOpen(!isFaqOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isFaqOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Tagline" value={faqTagline} onChange={(e) => setFaqTagline(e.target.value)} />
            <InputField label="Heading" value={faqHeading} onChange={(e) => setFaqHeading(e.target.value)} />
            <TextAreaField label="Description" value={faqDesc} onChange={(e) => setFaqDesc(e.target.value)} rows={2} />

            <div className="mt-2 flex flex-col gap-4">
              <h4 className="font-medium text-gray-700">FAQ Items</h4>
              {faqs.map((f, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 flex flex-col gap-3">
                  <InputField label="Question" value={f.question} onChange={(e) => {
                    const nf = [...faqs]; nf[i].question = e.target.value; setFaqs(nf);
                  }} />
                  <TextAreaField label="Answer" value={f.answer} onChange={(e) => {
                    const nf = [...faqs]; nf[i].answer = e.target.value; setFaqs(nf);
                  }} rows={3} />
                  <button onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))} className="self-start text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                    <Trash2 className="w-4 h-4" /> Remove FAQ
                  </button>
                </div>
              ))}
              <button onClick={() => setFaqs([...faqs, { question: "", answer: "" }])} className="self-start flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                <Plus className="mr-1 h-4 w-4" /> Add FAQ
              </button>
            </div>

            <SaveButton
              onClick={() => handleSave("FAQs Section")}
              isSaving={savingSection === "FAQs Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="8. Help & Support Section"
          description="Manage emergency contact information and support call-to-actions."
          isOpen={isHelpOpen}
          onToggle={() => setIsHelpOpen(!isHelpOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${isHelpOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Help Title" value={helpTitle} onChange={(e) => setHelpTitle(e.target.value)} />
            <TextAreaField label="Help Subheading" value={helpSub} onChange={(e) => setHelpSub(e.target.value)} rows={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Help Button Label" value={helpBtnLabel} onChange={(e) => setHelpBtnLabel(e.target.value)} />
              <InputField label="Help Button Link" value={helpBtnLink} onChange={(e) => setHelpBtnLink(e.target.value)} placeholder="/contact" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Hotline Label" value={hotlineLabel} onChange={(e) => setHotlineLabel(e.target.value)} />
              <InputField label="Hotline Link" value={hotlineLink} onChange={(e) => setHotlineLink(e.target.value)} placeholder="tel:+919773851767" />
            </div>
            <InputField label="Emergency Phone" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} placeholder="+919773851767" />
            <SaveButton
              onClick={() => handleSave("Help Section")}
              isSaving={savingSection === "Help Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
