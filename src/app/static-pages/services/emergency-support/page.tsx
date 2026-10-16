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

type StatItem = {
  value: string;
  label: string;
  description: string;
};

type BenefitItem = {
  title: string;
  description: string;
  icon?: string;
};

type ProcessStepItem = {
  step: number;
  title: string;
  description: string;
};

type ScenarioItem = {
  title: string;
  description: string;
  icon?: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export default function EmergencySupportCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [isScenariosOpen, setIsScenariosOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const [savingSection, setSavingSection] = useState<string | null>(null);

  // Hero Section
  const [heroTagline, setHeroTagline] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Intro Section
  const [introTagline, setIntroTagline] = useState("");
  const [introTitle, setIntroTitle] = useState("");
  const [introDesc, setIntroDesc] = useState("");
  const [introHotlineLabel, setIntroHotlineLabel] = useState("");
  const [introBtn2Label, setIntroBtn2Label] = useState("");
  const [introBtn2Link, setIntroBtn2Link] = useState("");
  const [introImage, setIntroImage] = useState<string | File>("");

  // Stats Section
  const [statsTagline, setStatsTagline] = useState("");
  const [statsHeading, setStatsHeading] = useState("");
  const [statsSub, setStatsSub] = useState("");
  const [responseStats, setResponseStats] = useState<StatItem[]>([]);

  // Benefits Section
  const [benefitsTagline, setBenefitsTagline] = useState("");
  const [benefitsHeading, setBenefitsHeading] = useState("");
  const [benefitsSub, setBenefitsSub] = useState("");
  const [serviceBenefits, setServiceBenefits] = useState<BenefitItem[]>([]);

  // Process Section
  const [processTagline, setProcessTagline] = useState("");
  const [processHeading, setProcessHeading] = useState("");
  const [processSub, setProcessSub] = useState("");
  const [processSteps, setProcessSteps] = useState<ProcessStepItem[]>([]);

  // Scenarios Section
  const [scenariosTagline, setScenariosTagline] = useState("");
  const [scenariosHeading, setScenariosHeading] = useState("");
  const [scenariosSub, setScenariosSub] = useState("");
  const [emergencyScenarios, setEmergencyScenarios] = useState<ScenarioItem[]>([]);

  // FAQ Section
  const [faqTagline, setFaqTagline] = useState("");
  const [faqHeading, setFaqHeading] = useState("");
  const [faqSub, setFaqSub] = useState("");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        const res = await fetch("/api/emergency-support");
        const json = await res.json();
        if (json.success && json.data) {
          const content =
            json.data["emergency-support"] || json.data.services || {};

          setHeroTagline(content.heroTagline || "");
          setHeroHeading(content.heroHeading || "");
          setHeroSub(content.heroSub || "");
          setEmergencyPhone(content.emergencyPhone || "");

          setIntroTagline(content.introTagline || "");
          setIntroTitle(content.introTitle || "");
          setIntroDesc(content.introDesc || "");
          setIntroHotlineLabel(content.introHotlineLabel || "");
          setIntroBtn2Label(content.introBtn2Label || "");
          setIntroBtn2Link(content.introBtn2Link || "");
          setIntroImage(content.introImage || "");

          setStatsTagline(content.statsTagline || "");
          setStatsHeading(content.statsHeading || "");
          setStatsSub(content.statsSub || "");
          setResponseStats(
            Array.isArray(content.responseStats) ? content.responseStats : []
          );

          setBenefitsTagline(content.benefitsTagline || "");
          setBenefitsHeading(content.benefitsHeading || "");
          setBenefitsSub(content.benefitsSub || "");
          setServiceBenefits(
            Array.isArray(content.serviceBenefits)
              ? content.serviceBenefits
              : []
          );

          setProcessTagline(content.processTagline || "");
          setProcessHeading(content.processHeading || "");
          setProcessSub(content.processSub || "");
          setProcessSteps(
            Array.isArray(content.processSteps) ? content.processSteps : []
          );

          setScenariosTagline(content.scenariosTagline || "");
          setScenariosHeading(content.scenariosHeading || "");
          setScenariosSub(content.scenariosSub || "");
          setEmergencyScenarios(
            Array.isArray(content.emergencyScenarios)
              ? content.emergencyScenarios
              : []
          );

          setFaqTagline(content.faqTagline || "");
          setFaqHeading(content.faqHeading || "");
          setFaqSub(content.faqSub || "");
          setFaqs(Array.isArray(content.faqs) ? content.faqs : []);
        }
      } catch (err) {
        console.error("Failed to load emergency-support CMS data:", err);
        toast.error("Failed to load CMS data.");
      }
    };
    fetchCMSData();
  }, []);

  const saveSection = async (sectionName: string) => {
    setSavingSection(sectionName);
    try {
      const rawContent = {
        heroTagline,
        heroHeading,
        heroSub,
        emergencyPhone,
        introTagline,
        introTitle,
        introDesc,
        introHotlineLabel,
        introBtn2Label,
        introBtn2Link,
        introImage,
        statsTagline,
        statsHeading,
        statsSub,
        responseStats,
        benefitsTagline,
        benefitsHeading,
        benefitsSub,
        serviceBenefits,
        processTagline,
        processHeading,
        processSub,
        processSteps,
        scenariosTagline,
        scenariosHeading,
        scenariosSub,
        emergencyScenarios,
        faqTagline,
        faqHeading,
        faqSub,
        faqs,
      };

      const content = await uploadFilesDeep(rawContent);
      if (content.introImage && typeof content.introImage === "string") {
        setIntroImage(content.introImage);
      }

      const res = await fetch("/api/emergency-support", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "emergency-support", content }),
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
        title="24/7 Emergency Support Static Page CMS (/services/emergency-support)"
        description="Manage the 24/7 Emergency Support page (Hero, Hotline, Intro, Response Metrics, Service Advantage, Process, Common Scenarios, FAQs)."
      />

      {/* 1. Hero Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section"
          description="Emergency hotline heading, tagline, description, and direct dial phone number."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isHeroOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Hero Tagline Badge"
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              placeholder="e.g. Critical Response"
            />
            <InputField
              label="Hero Main Heading"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              placeholder="e.g. 24/7 Emergency Support"
            />
            <TextAreaField
              label="Hero Subtitle / Description"
              value={heroSub}
              onChange={(e) => setHeroSub(e.target.value)}
              placeholder="Describe rapid response power solutions..."
            />
            <InputField
              label="Emergency Hotline Phone Number"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              placeholder="e.g. +919773851767"
            />
            <SaveButton
              onClick={() => saveSection("Hero Section")}
              isSaving={savingSection === "Hero Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* 2. Intro Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="2. Introduction Section"
          description="Response overview heading, descriptive text, and emergency unit image."
          isOpen={isIntroOpen}
          onToggle={() => setIsIntroOpen(!isIntroOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isIntroOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Intro Tagline"
              value={introTagline}
              onChange={(e) => setIntroTagline(e.target.value)}
              placeholder="e.g. EMERGENCY RESPONSE"
            />
            <InputField
              label="Intro Main Title"
              value={introTitle}
              onChange={(e) => setIntroTitle(e.target.value)}
              placeholder="e.g. Reliable Emergency Support When You Need It Most"
            />
            <TextAreaField
              label="Intro Description (Use Enter for new paragraphs)"
              value={introDesc}
              onChange={(e) => setIntroDesc(e.target.value)}
              placeholder="Explain 24/7/365 availability and rapid response readiness. Press Enter for separate paragraphs."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Hotline Button Label"
                value={introHotlineLabel}
                onChange={(e) => setIntroHotlineLabel(e.target.value)}
                placeholder="e.g. Emergency Hotline"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Secondary Button Label"
                value={introBtn2Label}
                onChange={(e) => setIntroBtn2Label(e.target.value)}
                placeholder="e.g. Request Priority Service"
              />
              <InputField
                label="Secondary Button Link"
                value={introBtn2Link}
                onChange={(e) => setIntroBtn2Link(e.target.value)}
                placeholder="e.g. /contact"
              />
            </div>
            <ImageUploadField
              label="Intro Showcase Photo"
              value={introImage}
              onChange={setIntroImage}
              tooltip="Upload photo of emergency mobile unit or generator technician"
            />
            <SaveButton
              onClick={() => saveSection("Intro Section")}
              isSaving={savingSection === "Intro Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* 3. Stats Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Rapid Response Metrics"
          description="Performance statistics (Response times, resolution rates, 24/7 support)."
          isOpen={isStatsOpen}
          onToggle={() => setIsStatsOpen(!isStatsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isStatsOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Metrics Tagline"
              value={statsTagline}
              onChange={(e) => setStatsTagline(e.target.value)}
              placeholder="e.g. RAPID RESPONSE METRICS"
            />
            <InputField
              label="Metrics Heading"
              value={statsHeading}
              onChange={(e) => setStatsHeading(e.target.value)}
              placeholder="e.g. Our Emergency Response Performance"
            />
            <TextAreaField
              label="Metrics Subtitle"
              value={statsSub}
              onChange={(e) => setStatsSub(e.target.value)}
              placeholder="Explain why every minute counts..."
            />

            <div className="flex items-center justify-between pt-2">
              <h4 className="font-semibold text-gray-800">Statistic Cards</h4>
              <button
                type="button"
                onClick={() =>
                  setResponseStats([
                    ...responseStats,
                    { value: "", label: "", description: "" },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition"
              >
                <Plus size={14} /> Add Metric Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {responseStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-xl bg-gray-50/50 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setResponseStats(responseStats.filter((_, i) => i !== idx))
                    }
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <InputField
                    label="Value / Number"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...responseStats];
                      updated[idx].value = e.target.value;
                      setResponseStats(updated);
                    }}
                    placeholder="e.g. 15, <2, 98%"
                  />
                  <InputField
                    label="Label"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...responseStats];
                      updated[idx].label = e.target.value;
                      setResponseStats(updated);
                    }}
                    placeholder="e.g. Minutes, Hours, Resolution"
                  />
                  <TextAreaField
                    label="Description"
                    value={stat.description}
                    onChange={(e) => {
                      const updated = [...responseStats];
                      updated[idx].description = e.target.value;
                      setResponseStats(updated);
                    }}
                    placeholder="Brief metric explanation..."
                  />
                </div>
              ))}
            </div>

            <SaveButton
              onClick={() => saveSection("Stats Section")}
              isSaving={savingSection === "Stats Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* 4. Service Advantage / Benefits */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="4. Emergency Service Advantage"
          description="Key reasons to trust Kumar Power for emergency generator situations."
          isOpen={isBenefitsOpen}
          onToggle={() => setIsBenefitsOpen(!isBenefitsOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isBenefitsOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Advantage Tagline"
              value={benefitsTagline}
              onChange={(e) => setBenefitsTagline(e.target.value)}
              placeholder="e.g. THE KUMAR POWER DIFFERENCE"
            />
            <InputField
              label="Advantage Heading"
              value={benefitsHeading}
              onChange={(e) => setBenefitsHeading(e.target.value)}
              placeholder="e.g. Our Emergency Service Advantage"
            />
            <TextAreaField
              label="Advantage Subtitle"
              value={benefitsSub}
              onChange={(e) => setBenefitsSub(e.target.value)}
              placeholder="Why businesses across India trust Kumar Power..."
            />

            <div className="flex items-center justify-between pt-2">
              <h4 className="font-semibold text-gray-800">Advantage Cards</h4>
              <button
                type="button"
                onClick={() =>
                  setServiceBenefits([
                    ...serviceBenefits,
                    { title: "", description: "" },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition"
              >
                <Plus size={14} /> Add Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceBenefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-xl bg-gray-50/50 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setServiceBenefits(
                        serviceBenefits.filter((_, i) => i !== idx)
                      )
                    }
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <InputField
                    label={`Card #${idx + 1} Title`}
                    value={b.title}
                    onChange={(e) => {
                      const updated = [...serviceBenefits];
                      updated[idx].title = e.target.value;
                      setServiceBenefits(updated);
                    }}
                    placeholder="e.g. Priority Parts Access"
                  />
                  <TextAreaField
                    label="Description"
                    value={b.description}
                    onChange={(e) => {
                      const updated = [...serviceBenefits];
                      updated[idx].description = e.target.value;
                      setServiceBenefits(updated);
                    }}
                    placeholder="Explain the advantage..."
                  />
                </div>
              ))}
            </div>

            <SaveButton
              onClick={() => saveSection("Benefits Section")}
              isSaving={savingSection === "Benefits Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* 5. Process Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="5. Emergency Response Process"
          description="Structured 6-step emergency timeline from dispatch to resolution."
          isOpen={isProcessOpen}
          onToggle={() => setIsProcessOpen(!isProcessOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isProcessOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Process Tagline"
              value={processTagline}
              onChange={(e) => setProcessTagline(e.target.value)}
              placeholder="e.g. OUR STRUCTURED APPROACH"
            />
            <InputField
              label="Process Main Heading"
              value={processHeading}
              onChange={(e) => setProcessHeading(e.target.value)}
              placeholder="e.g. Our Emergency Response Process"
            />
            <TextAreaField
              label="Process Subtitle"
              value={processSub}
              onChange={(e) => setProcessSub(e.target.value)}
              placeholder="A systematic approach designed for swift resolution..."
            />

            <div className="flex items-center justify-between pt-2">
              <h4 className="font-semibold text-gray-800">Process Steps</h4>
              <button
                type="button"
                onClick={() =>
                  setProcessSteps([
                    ...processSteps,
                    {
                      step: processSteps.length + 1,
                      title: "",
                      description: "",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition"
              >
                <Plus size={14} /> Add Step
              </button>
            </div>

            <div className="space-y-4">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-xl bg-gray-50/50 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setProcessSteps(processSteps.filter((_, i) => i !== idx))
                    }
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <InputField
                        label="Step #"
                        type="number"
                        value={String(step.step || idx + 1)}
                        onChange={(e) => {
                          const updated = [...processSteps];
                          updated[idx].step = Number(e.target.value);
                          setProcessSteps(updated);
                        }}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <InputField
                        label="Step Title"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...processSteps];
                          updated[idx].title = e.target.value;
                          setProcessSteps(updated);
                        }}
                        placeholder="e.g. Emergency Call Received"
                      />
                    </div>
                  </div>
                  <TextAreaField
                    label="Step Description"
                    value={step.description}
                    onChange={(e) => {
                      const updated = [...processSteps];
                      updated[idx].description = e.target.value;
                      setProcessSteps(updated);
                    }}
                    placeholder="Details about this step..."
                  />
                </div>
              ))}
            </div>

            <SaveButton
              onClick={() => saveSection("Process Section")}
              isSaving={savingSection === "Process Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* 6. Common Emergency Scenarios */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="6. Common Emergency Scenarios"
          description="Types of generator failures handled (Electrical faults, cooling, fuel, etc.)."
          isOpen={isScenariosOpen}
          onToggle={() => setIsScenariosOpen(!isScenariosOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isScenariosOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="Scenarios Tagline"
              value={scenariosTagline}
              onChange={(e) => setScenariosTagline(e.target.value)}
              placeholder="e.g. EMERGENCY EXPERTISE"
            />
            <InputField
              label="Scenarios Heading"
              value={scenariosHeading}
              onChange={(e) => setScenariosHeading(e.target.value)}
              placeholder="e.g. Common Emergency Scenarios We Handle"
            />
            <TextAreaField
              label="Scenarios Subtitle"
              value={scenariosSub}
              onChange={(e) => setScenariosSub(e.target.value)}
              placeholder="Our emergency teams are equipped to handle..."
            />

            <div className="flex items-center justify-between pt-2">
              <h4 className="font-semibold text-gray-800">Scenarios Cards</h4>
              <button
                type="button"
                onClick={() =>
                  setEmergencyScenarios([
                    ...emergencyScenarios,
                    { title: "", description: "" },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition"
              >
                <Plus size={14} /> Add Scenario
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyScenarios.map((sc, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-xl bg-gray-50/50 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setEmergencyScenarios(
                        emergencyScenarios.filter((_, i) => i !== idx)
                      )
                    }
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <InputField
                    label={`Scenario #${idx + 1} Title`}
                    value={sc.title}
                    onChange={(e) => {
                      const updated = [...emergencyScenarios];
                      updated[idx].title = e.target.value;
                      setEmergencyScenarios(updated);
                    }}
                    placeholder="e.g. Complete System Failure"
                  />
                  <TextAreaField
                    label="Description"
                    value={sc.description}
                    onChange={(e) => {
                      const updated = [...emergencyScenarios];
                      updated[idx].description = e.target.value;
                      setEmergencyScenarios(updated);
                    }}
                    placeholder="Details about this emergency situation..."
                  />
                </div>
              ))}
            </div>

            <SaveButton
              onClick={() => saveSection("Scenarios Section")}
              isSaving={savingSection === "Scenarios Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* 7. FAQ Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="7. Frequently Asked Questions"
          description="Manage questions and detailed answers for emergency clients."
          isOpen={isFaqOpen}
          onToggle={() => setIsFaqOpen(!isFaqOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isFaqOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="FAQ Tagline"
              value={faqTagline}
              onChange={(e) => setFaqTagline(e.target.value)}
              placeholder="e.g. FREQUENTLY ASKED QUESTIONS"
            />
            <InputField
              label="FAQ Heading"
              value={faqHeading}
              onChange={(e) => setFaqHeading(e.target.value)}
              placeholder="e.g. Emergency Support FAQ"
            />
            <TextAreaField
              label="FAQ Subtitle"
              value={faqSub}
              onChange={(e) => setFaqSub(e.target.value)}
              placeholder="Common questions about our emergency support..."
            />

            <div className="flex items-center justify-between pt-2">
              <h4 className="font-semibold text-gray-800">FAQ Accordion Items</h4>
              <button
                type="button"
                onClick={() =>
                  setFaqs([...faqs, { question: "", answer: "" }])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition"
              >
                <Plus size={14} /> Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-xl bg-gray-50/50 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <InputField
                    label={`Question #${idx + 1}`}
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      setFaqs(updated);
                    }}
                    placeholder="Enter question..."
                  />
                  <TextAreaField
                    label="Answer"
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].answer = e.target.value;
                      setFaqs(updated);
                    }}
                    placeholder="Enter answer..."
                  />
                </div>
              ))}
            </div>

            <SaveButton
              onClick={() => saveSection("FAQ Section")}
              isSaving={savingSection === "FAQ Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
