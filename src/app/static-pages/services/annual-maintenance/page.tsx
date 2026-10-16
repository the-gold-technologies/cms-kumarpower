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

type FaqItem = {
  question: string;
  answer: string;
};

export default function AnnualMaintenanceCMSPage() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isCtaOpen, setIsCtaOpen] = useState(false);

  const [savingSection, setSavingSection] = useState<string | null>(null);

  // Hero Section
  const [heroHeadingPart1, setHeroHeadingPart1] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroCtaLabel, setHeroCtaLabel] = useState("");
  const [heroCtaLink, setHeroCtaLink] = useState("");

  // Intro Section (Single unified description field)
  const [introTitlePart1, setIntroTitlePart1] = useState("");
  const [introTitlePart2, setIntroTitlePart2] = useState("");
  const [introDesc, setIntroDesc] = useState("");
  const [introBtn1Label, setIntroBtn1Label] = useState("");
  const [introBtn1Link, setIntroBtn1Link] = useState("");
  const [introBtn2Label, setIntroBtn2Label] = useState("");
  const [introBtn2Link, setIntroBtn2Link] = useState("");
  const [introImage, setIntroImage] = useState<string | File>("");

  // Benefits Section
  const [benefitsTagline, setBenefitsTagline] = useState("");
  const [benefitsHeading, setBenefitsHeading] = useState("");
  const [benefitsSub, setBenefitsSub] = useState("");
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);

  // Process Section
  const [processTagline, setProcessTagline] = useState("");
  const [processHeading, setProcessHeading] = useState("");
  const [processSub, setProcessSub] = useState("");
  const [processSteps, setProcessSteps] = useState<ProcessStepItem[]>([]);

  // FAQ Section
  const [faqTagline, setFaqTagline] = useState("");
  const [faqHeading, setFaqHeading] = useState("");
  const [faqSub, setFaqSub] = useState("");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // CTA Section
  const [ctaHeading, setCtaHeading] = useState("");
  const [ctaSub, setCtaSub] = useState("");
  const [ctaBtn1Label, setCtaBtn1Label] = useState("");
  const [ctaBtn1Link, setCtaBtn1Link] = useState("");
  const [ctaBtn2Label, setCtaBtn2Label] = useState("");
  const [ctaBtn2Link, setCtaBtn2Link] = useState("");

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        const res = await fetch("/api/annual-maintenance");
        const json = await res.json();
        if (json.success && json.data) {
          const content =
            json.data["annual-maintenance"] || json.data.services || {};

          setHeroHeadingPart1(content.heroHeadingPart1 || "");
          setHeroTitle(content.heroTitle || "");
          setHeroSub(content.heroSub || "");
          setHeroCtaLabel(content.heroCtaLabel || "");
          setHeroCtaLink(content.heroCtaLink || "");

          setIntroTitlePart1(content.introTitlePart1 || "");
          setIntroTitlePart2(content.introTitlePart2 || "");
          setIntroDesc(content.introDesc || "");
          setIntroBtn1Label(content.introBtn1Label || "");
          setIntroBtn1Link(content.introBtn1Link || "");
          setIntroBtn2Label(content.introBtn2Label || "");
          setIntroBtn2Link(content.introBtn2Link || "");
          setIntroImage(content.introImage || "");

          setBenefitsTagline(content.benefitsTagline || "");
          setBenefitsHeading(content.benefitsHeading || "");
          setBenefitsSub(content.benefitsSub || "");
          setBenefits(Array.isArray(content.benefits) ? content.benefits : []);

          setProcessTagline(content.processTagline || "");
          setProcessHeading(content.processHeading || "");
          setProcessSub(content.processSub || "");
          setProcessSteps(
            Array.isArray(content.processSteps) ? content.processSteps : []
          );

          setFaqTagline(content.faqTagline || "");
          setFaqHeading(content.faqHeading || "");
          setFaqSub(content.faqSub || "");
          setFaqs(Array.isArray(content.faqs) ? content.faqs : []);

          setCtaHeading(content.ctaHeading || "");
          setCtaSub(content.ctaSub || "");
          setCtaBtn1Label(content.ctaBtn1Label || "");
          setCtaBtn1Link(content.ctaBtn1Link || "");
          setCtaBtn2Label(content.ctaBtn2Label || "");
          setCtaBtn2Link(content.ctaBtn2Link || "");
        }
      } catch (err) {
        console.error("Failed to load annual-maintenance CMS data:", err);
        toast.error("Failed to load CMS data.");
      }
    };
    fetchCMSData();
  }, []);

  const saveSection = async (sectionName: string) => {
    setSavingSection(sectionName);
    try {
      const rawContent = {
        heroHeadingPart1,
        heroTitle,
        heroSub,
        heroCtaLabel,
        heroCtaLink,
        introTitlePart1,
        introTitlePart2,
        introDesc,
        introBtn1Label,
        introBtn1Link,
        introBtn2Label,
        introBtn2Link,
        introImage,
        benefitsTagline,
        benefitsHeading,
        benefitsSub,
        benefits,
        processTagline,
        processHeading,
        processSub,
        processSteps,
        faqTagline,
        faqHeading,
        faqSub,
        faqs,
        ctaHeading,
        ctaSub,
        ctaBtn1Label,
        ctaBtn1Link,
        ctaBtn2Label,
        ctaBtn2Link,
      };

      const content = await uploadFilesDeep(rawContent);
      if (content.introImage && typeof content.introImage === "string") {
        setIntroImage(content.introImage);
      }

      const res = await fetch("/api/annual-maintenance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "annual-maintenance", content }),
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
        title="Annual Maintenance Contracts Static Page CMS (/services/annual-maintenance)"
        description="Manage the Annual Maintenance Contracts page (Hero, Intro, Benefits, Maintenance Process, FAQs, CTA)."
      />

      {/* 1. Hero Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section"
          description="Main banner heading, title, subtitle, and CTA."
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
              label="Hero Top Tagline / Category"
              value={heroHeadingPart1}
              onChange={(e) => setHeroHeadingPart1(e.target.value)}
              placeholder="e.g. ANNUAL MAINTENANCE CONTRACTS"
            />
            <InputField
              label="Hero Main Heading"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="e.g. Preventive Care for Uninterrupted Power"
            />
            <TextAreaField
              label="Hero Subtitle / Description"
              value={heroSub}
              onChange={(e) => setHeroSub(e.target.value)}
              placeholder="Describe your AMC service..."
              rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Hero CTA Button Label"
                value={heroCtaLabel}
                onChange={(e) => setHeroCtaLabel(e.target.value)}
                placeholder="e.g. Request AMC Quote"
              />
              <InputField
                label="Hero CTA Button Link"
                value={heroCtaLink}
                onChange={(e) => setHeroCtaLink(e.target.value)}
                placeholder="e.g. /contact"
              />
            </div>
            <SaveButton
              onClick={() => saveSection("Hero Banner")}
              isSaving={savingSection === "Hero Banner"}
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
          description="Service overview heading, descriptive text, and showcase image."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Intro Heading Part 1"
                value={introTitlePart1}
                onChange={(e) => setIntroTitlePart1(e.target.value)}
                placeholder="e.g. Keep Your Power Systems Running at"
              />
              <InputField
                label="Intro Heading Part 2 (Highlighted)"
                value={introTitlePart2}
                onChange={(e) => setIntroTitlePart2(e.target.value)}
                placeholder="e.g. Peak Efficiency"
              />
            </div>
            <TextAreaField
              label="Intro Description (Use Enter for new paragraphs)"
              value={introDesc}
              onChange={(e) => setIntroDesc(e.target.value)}
              placeholder="Explain the importance of AMC, technician expertise, etc. Press Enter for separate paragraphs."
              rows={6}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Button 1 Label"
                value={introBtn1Label}
                onChange={(e) => setIntroBtn1Label(e.target.value)}
                placeholder="e.g. Request AMC Quote"
              />
              <InputField
                label="Button 1 Link"
                value={introBtn1Link}
                onChange={(e) => setIntroBtn1Link(e.target.value)}
                placeholder="e.g. /contact"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Button 2 Label"
                value={introBtn2Label}
                onChange={(e) => setIntroBtn2Label(e.target.value)}
                placeholder="e.g. View All Products"
              />
              <InputField
                label="Button 2 Link"
                value={introBtn2Link}
                onChange={(e) => setIntroBtn2Link(e.target.value)}
                placeholder="e.g. /products/generators"
              />
            </div>
            <ImageUploadField
              label="Intro Section Image"
              value={introImage}
              onChange={setIntroImage}
              tooltip="Upload showcase photo of generator maintenance"
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

      {/* 3. Benefits Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. Key Benefits"
          description="Manage bulleted benefits and value props for AMC services."
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
              label="Benefits Tagline"
              value={benefitsTagline}
              onChange={(e) => setBenefitsTagline(e.target.value)}
              placeholder="e.g. Why Choose Our AMC"
            />
            <InputField
              label="Benefits Heading"
              value={benefitsHeading}
              onChange={(e) => setBenefitsHeading(e.target.value)}
              placeholder="e.g. Benefits of Our Annual Maintenance Contracts"
            />
            <TextAreaField
              label="Benefits Subtitle"
              value={benefitsSub}
              onChange={(e) => setBenefitsSub(e.target.value)}
              placeholder="Proactive maintenance is the key..."
              rows={2}
            />

            <div className="mt-2 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">Benefit Cards</h4>
                <button
                  type="button"
                  onClick={() =>
                    setBenefits([
                      ...benefits,
                      { title: "", description: "", icon: "Shield" },
                    ])
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition"
                >
                  <Plus size={14} /> Add Benefit
                </button>
              </div>

              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-xl bg-gray-50/50 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setBenefits(benefits.filter((_, i) => i !== idx))
                    }
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Benefit Title"
                      value={benefit.title}
                      onChange={(e) => {
                        const updated = [...benefits];
                        updated[idx].title = e.target.value;
                        setBenefits(updated);
                      }}
                      placeholder="e.g. Prevent Costly Breakdowns"
                    />
                    <InputField
                      label="Lucide Icon Name"
                      value={benefit.icon || "Shield"}
                      onChange={(e) => {
                        const updated = [...benefits];
                        updated[idx].icon = e.target.value;
                        setBenefits(updated);
                      }}
                      placeholder="Shield, Clock, Calendar, AlertCircle, FileText, Wrench"
                    />
                  </div>
                  <TextAreaField
                    label="Description"
                    value={benefit.description}
                    onChange={(e) => {
                      const updated = [...benefits];
                      updated[idx].description = e.target.value;
                      setBenefits(updated);
                    }}
                    placeholder="Benefit details..."
                    rows={2}
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

      {/* 4. Process Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="4. Maintenance Process Steps"
          description="Step-by-step workflow for customer maintenance service."
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
              placeholder="e.g. How We Work"
            />
            <InputField
              label="Process Heading"
              value={processHeading}
              onChange={(e) => setProcessHeading(e.target.value)}
              placeholder="e.g. Our Maintenance Process"
            />
            <TextAreaField
              label="Process Subtitle"
              value={processSub}
              onChange={(e) => setProcessSub(e.target.value)}
              placeholder="A systematic approach..."
              rows={2}
            />

            <div className="mt-2 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">Timeline Steps</h4>
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
                        placeholder="e.g. Initial System Assessment"
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
                    rows={2}
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

      {/* 5. FAQ Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="5. Frequently Asked Questions"
          description="Manage questions and detailed answers for AMC clients."
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
              placeholder="e.g. Get Answers"
            />
            <InputField
              label="FAQ Heading"
              value={faqHeading}
              onChange={(e) => setFaqHeading(e.target.value)}
              placeholder="e.g. Frequently Asked Questions"
            />
            <TextAreaField
              label="FAQ Subtitle"
              value={faqSub}
              onChange={(e) => setFaqSub(e.target.value)}
              placeholder="Common questions about our AMC..."
              rows={2}
            />

            <div className="mt-2 space-y-3">
              <div className="flex items-center justify-between">
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
                    rows={3}
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

      {/* 6. CTA Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="6. Bottom Call to Action"
          description="Bottom contact banner heading and buttons."
          isOpen={isCtaOpen}
          onToggle={() => setIsCtaOpen(!isCtaOpen)}
        />
        <div
          className={`grid transition-all duration-300 ${
            isCtaOpen
              ? "grid-rows-[1fr] opacity-100 mt-6"
              : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField
              label="CTA Heading"
              value={ctaHeading}
              onChange={(e) => setCtaHeading(e.target.value)}
              placeholder="e.g. Ready to Secure Your Power Equipment's Performance?"
            />
            <TextAreaField
              label="CTA Subtitle"
              value={ctaSub}
              onChange={(e) => setCtaSub(e.target.value)}
              placeholder="Contact our service team today..."
              rows={2}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Primary Button Label"
                value={ctaBtn1Label}
                onChange={(e) => setCtaBtn1Label(e.target.value)}
                placeholder="e.g. Request AMC Quote"
              />
              <InputField
                label="Primary Button Link"
                value={ctaBtn1Link}
                onChange={(e) => setCtaBtn1Link(e.target.value)}
                placeholder="e.g. /contact"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Secondary Button Label"
                value={ctaBtn2Label}
                onChange={(e) => setCtaBtn2Label(e.target.value)}
                placeholder="e.g. Explore Other Services"
              />
              <InputField
                label="Secondary Button Link"
                value={ctaBtn2Link}
                onChange={(e) => setCtaBtn2Link(e.target.value)}
                placeholder="e.g. /services/installation"
              />
            </div>
            <SaveButton
              onClick={() => saveSection("CTA Section")}
              isSaving={savingSection === "CTA Section"}
              saved={false}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
