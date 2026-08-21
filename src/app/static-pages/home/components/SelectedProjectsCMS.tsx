"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { uploadFilesDeep } from "@/lib/uploadHelpers";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  Plane,
  Factory,
  Sun,
  Building,
  HeartPulse,
  Server,
  Zap,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import toast from "react-hot-toast";

const AVAILABLE_ICONS: Record<string, any> = {
  Plane,
  Factory,
  Sun,
  Building,
  HeartPulse,
  Server,
  Zap,
  Layers,
  Sparkles,
};

export interface CaseStudyItem {
  id: string;
  icon: string;
  sector: string;
  location: string;
  client: string;
  title: string;
  metric: string;
  image: string | File;
  challenge: string;
  solution: string;
  outcome: string;
}

const DEFAULT_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "aviation-delhi",
    icon: "Plane",
    sector: "Aviation Facility",
    location: "Delhi NCR",
    client: "Air India Terminal Operations",
    title: "Critical Ground & Runway Operation Backup",
    metric: "99.999% Power Uptime",
    image:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1784703235/kumarpower_website/i31vcugsqskwv56ixrhv.jpg",
    challenge:
      "Zero-downtime standby power required for critical flight ground control, terminal lighting, and security infrastructure during grid outages.",
    solution:
      "Turnkey CPCB IV+ silent DG set synchronization, AMF panels, heavy-duty underground cabling, and 24/7 support.",
    outcome:
      "Achieved 99.999% power uptime during utility grid interruptions with sub-second failover transition.",
  },
  {
    id: "manufacturing-haryana",
    icon: "Factory",
    sector: "Heavy Manufacturing",
    location: "Delhi NCR",
    client: "Automotive Precision Plant",
    title: "Plant Electrical Distribution & Power Quality",
    metric: "85% Breakdown Cut",
    image:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1784703674/kumarpower_website/vo2ekpdop7dovku0rc8n.jpg",
    challenge:
      "Frequent utility voltage fluctuations, poor power factor penalties, and unorganized floor power distribution causing frequent machine trips.",
    solution:
      "Turnkey supply and installation of custom distribution transformer, LT main switchgear panel, APFC capacitor bank, and servo stabilizer.",
    outcome:
      "Eliminated annual power factor penalty, reduced machine breakdown by 85%, and optimized plant voltage stability.",
  },
  {
    id: "solar-bess-commercial",
    icon: "Sun",
    sector: "Commercial & Data Facility",
    location: "Delhi NCR",
    client: "Tech Park Infrastructure",
    title: "Hybrid Solar-BESS Cost Reduction & Backup",
    metric: "38% Energy Bill Cut",
    image:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1784703672/kumarpower_website/egvye1xjbviosybczmy5.jpg",
    challenge:
      "High daytime electricity grid tariffs, strict diesel generator emission caps, and low solar self-consumption without storage.",
    solution:
      "Integrated 50 kWp rooftop solar panels with 100 kWh BESS and intelligent EMS control platform.",
    outcome:
      "Cut monthly energy bill by 38% and reduced generator run hours by 65% while keeping critical loads backed up.",
  },
];

interface SelectedProjectsCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function SelectedProjectsCMS({
  saveUrl = "/api/home",
  responseKey = "selectedProjects",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: SelectedProjectsCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>("aviation-delhi");

  const [formData, setFormData] = useState<{
    badge: string;
    title: string;
    description: string;
    ctaButtonLabel: string;
    ctaButtonUrl: string;
    caseStudies: CaseStudyItem[];
  }>({
    badge: "Proven Field Execution",
    title: "Solutions in Action",
    description:
      "Real-world case studies demonstrating our end-to-end power engineering, installation, and operational results.",
    ctaButtonLabel: "View All Client References & Project Portfolio",
    ctaButtonUrl: "/about/OurClients",
    caseStudies: DEFAULT_CASE_STUDIES,
  });

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey ? json.data?.[responseKey] : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData((prev) => ({
              ...prev,
              badge: sectionData.badge ?? prev.badge,
              title: sectionData.title ?? prev.title,
              description: sectionData.description ?? prev.description,
              ctaButtonLabel: sectionData.ctaButtonLabel ?? prev.ctaButtonLabel,
              ctaButtonUrl: sectionData.ctaButtonUrl ?? prev.ctaButtonUrl,
              caseStudies:
                Array.isArray(sectionData.caseStudies) && sectionData.caseStudies.length > 0
                  ? sectionData.caseStudies
                  : prev.caseStudies,
            }));
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateCaseStudyField = (
    id: string,
    key: keyof CaseStudyItem,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.map((cs) =>
        cs.id === id ? { ...cs, [key]: value } : cs
      ),
    }));
  };

  const addCaseStudy = () => {
    const newId = `cs-${Date.now()}`;
    const newCaseStudy: CaseStudyItem = {
      id: newId,
      icon: "Factory",
      sector: "Industry Sector",
      location: "Location / Region",
      client: "Client Name",
      title: "Project & Solution Title",
      metric: "Uptime / Savings Metric",
      image: "",
      challenge: "Operational challenge description...",
      solution: "Engineering and equipment installation solution...",
      outcome: "Measurable operational outcome...",
    };

    setFormData((prev) => ({
      ...prev,
      caseStudies: [...prev.caseStudies, newCaseStudy],
    }));
    setExpandedCard(newId);
    toast.success("New case study added");
  };

  const removeCaseStudy = (id: string) => {
    if (formData.caseStudies.length <= 1) {
      toast.error("You must keep at least 1 case study.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((cs) => cs.id !== id),
    }));
    toast.success("Case study removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = await uploadFilesDeep(formData);

      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");

      if (payload.caseStudies) {
        setFormData((prev) => ({ ...prev, caseStudies: payload.caseStudies }));
      }

      clearCache(saveUrl);
      setSaved(true);
      toast.success("Selected Projects section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save selected projects");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="9. Selected Projects & Case Studies (Solutions in Action)"
        description="Manage the featured project case studies (Aviation, Heavy Manufacturing, Solar-BESS) with Challenge, Solution, Outcome breakdown, metrics badge, and installation visual images."
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
          {/* Header Block */}
          <div className="space-y-4">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
              Header Block & Bottom CTA
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Badge Tagline"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Proven Field Execution"
              />
              <InputField
                label="Section Heading"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Solutions in Action"
              />
            </div>

            <TextAreaField
              label="Overview Subtitle"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Real-world case studies demonstrating our end-to-end power engineering..."
              rows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="CTA Button Label"
                value={formData.ctaButtonLabel}
                onChange={(e) => setFormData({ ...formData, ctaButtonLabel: e.target.value })}
                placeholder="e.g. View All Client References & Project Portfolio"
              />
              <InputField
                label="CTA Button URL"
                value={formData.ctaButtonUrl}
                onChange={(e) => setFormData({ ...formData, ctaButtonUrl: e.target.value })}
                placeholder="e.g. /about/OurClients"
              />
            </div>
          </div>

          {/* Case Studies List */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Case Studies ({formData.caseStudies.length} projects)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure real-world case study details, challenge, solution, and outcome.
                </p>
              </div>
              <button
                type="button"
                onClick={addCaseStudy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Case Study
              </button>
            </div>

            <div className="space-y-3">
              {formData.caseStudies.map((cs, idx) => {
                const isExpanded = expandedCard === cs.id;
                const CurrentIcon = AVAILABLE_ICONS[cs.icon] || Factory;

                return (
                  <div
                    key={cs.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition-colors"
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => setExpandedCard(isExpanded ? null : cs.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1A6AA2] font-bold shrink-0 shadow-2xs overflow-hidden">
                          {cs.image ? (
                            <img
                              src={
                                typeof cs.image === "string"
                                  ? cs.image
                                  : URL.createObjectURL(cs.image)
                              }
                              alt={cs.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <CurrentIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-900">
                              PROJECT #{idx + 1}
                            </span>
                            <span className="text-[10px] font-bold text-[#1A6AA2] uppercase">
                              {cs.sector}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                              {cs.metric}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                            {cs.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {formData.caseStudies.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCaseStudy(cs.id);
                            }}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                            title="Remove case study"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Case Study Details Form */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-200 bg-white space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <InputField
                            label="Sector Name"
                            value={cs.sector}
                            onChange={(e) =>
                              updateCaseStudyField(cs.id, "sector", e.target.value)
                            }
                            placeholder="e.g. Aviation Facility"
                          />
                          <InputField
                            label="Location"
                            value={cs.location}
                            onChange={(e) =>
                              updateCaseStudyField(cs.id, "location", e.target.value)
                            }
                            placeholder="e.g. Delhi NCR"
                          />
                          <InputField
                            label="Client Reference"
                            value={cs.client}
                            onChange={(e) =>
                              updateCaseStudyField(cs.id, "client", e.target.value)
                            }
                            placeholder="e.g. Air India Terminal Operations"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <InputField
                              label="Project Title"
                              value={cs.title}
                              onChange={(e) =>
                                updateCaseStudyField(cs.id, "title", e.target.value)
                              }
                              placeholder="e.g. Critical Ground & Runway Operation Backup"
                            />
                          </div>
                          <div>
                            <InputField
                              label="Achievement Metric Badge"
                              value={cs.metric}
                              onChange={(e) =>
                                updateCaseStudyField(cs.id, "metric", e.target.value)
                              }
                              placeholder="e.g. 99.999% Power Uptime"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Sector Icon
                            </label>
                            <select
                              value={cs.icon}
                              onChange={(e) =>
                                updateCaseStudyField(cs.id, "icon", e.target.value)
                              }
                              aria-label="Select Icon"
                              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2.5 font-medium outline-none focus:border-[#1A6AA2] focus:bg-white transition"
                            >
                              {Object.keys(AVAILABLE_ICONS).map((k) => (
                                <option key={k} value={k}>
                                  {k}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <ImageUploadField
                              label="Project Photo / Visual Image"
                              value={cs.image}
                              onChange={(val) => updateCaseStudyField(cs.id, "image", val)}
                              tooltip="Upload photo of the project or installation"
                            />
                          </div>
                        </div>

                        {/* Challenge, Solution, Outcome */}
                        <div className="space-y-3 pt-2 border-t border-slate-100">
                          <TextAreaField
                            label="1. Operational Challenge"
                            value={cs.challenge}
                            onChange={(e) =>
                              updateCaseStudyField(cs.id, "challenge", e.target.value)
                            }
                            placeholder="Describe the initial power bottleneck or operational challenge..."
                            rows={2}
                          />

                          <TextAreaField
                            label="2. Engineering Solution"
                            value={cs.solution}
                            onChange={(e) =>
                              updateCaseStudyField(cs.id, "solution", e.target.value)
                            }
                            placeholder="Describe the equipment, synchronization, and turnkey installation provided..."
                            rows={2}
                          />

                          <TextAreaField
                            label="3. Measurable Outcome"
                            value={cs.outcome}
                            onChange={(e) =>
                              updateCaseStudyField(cs.id, "outcome", e.target.value)
                            }
                            placeholder="Describe the quantifiable results and client satisfaction..."
                            rows={2}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
