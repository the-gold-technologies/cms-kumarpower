"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import {
  Phone,
  Mail,
  HelpCircle,
  CheckCircle2,
  Plus,
  Trash2,
  ListOrdered,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

interface ConsultationFormData {
  // Section 1: Left Column Copy & Direct Contact Info
  badge: string;
  heading: string;
  description: string;
  assessmentBtnText: string;
  expertBtnText: string;
  phone: string;
  salesEmail: string;
  accountsEmail: string;
  supportEmail: string;

  // Section 2: Right Column Form Settings & Success State
  formCardTitle: string;
  submitBtnText: string;
  successTitle: string;
  successMessage: string;
  industries: string[];
}

const INITIAL_DATA: ConsultationFormData = {
  badge: "",
  heading: "",
  description: "",
  assessmentBtnText: "",
  expertBtnText: "",
  phone: "",
  salesEmail: "",
  accountsEmail: "",
  supportEmail: "",

  formCardTitle: "",
  submitBtnText: "",
  successTitle: "",
  successMessage: "",
  industries: [],
};

interface ConsultationFormCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function ConsultationFormCMS({
  saveUrl = "/api/home",
  responseKey = "consultation",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: ConsultationFormCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>(INITIAL_DATA);

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const sectionData = responseKey ? json.data?.[responseKey] : json.data;
          if (sectionData && typeof sectionData === "object") {
            setFormData({
              badge: sectionData.badge ?? "",
              heading: sectionData.heading ?? "",
              description: sectionData.description ?? "",
              assessmentBtnText: sectionData.assessmentBtnText ?? "",
              expertBtnText: sectionData.expertBtnText ?? "",
              phone: sectionData.phone ?? "",
              salesEmail: sectionData.salesEmail ?? "",
              accountsEmail: sectionData.accountsEmail ?? "",
              supportEmail: sectionData.supportEmail ?? "",
              formCardTitle: sectionData.formCardTitle ?? "",
              submitBtnText: sectionData.submitBtnText ?? "",
              successTitle: sectionData.successTitle ?? "",
              successMessage: sectionData.successMessage ?? "",
              industries: Array.isArray(sectionData.industries)
                ? sectionData.industries
                : [],
            });
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateIndustry = (index: number, value: string) => {
    setFormData((prev) => {
      const newIndustries = [...prev.industries];
      newIndustries[index] = value;
      return { ...prev, industries: newIndustries };
    });
  };

  const addIndustry = () => {
    setFormData((prev) => ({
      ...prev,
      industries: [...prev.industries, "New Industry Sector"],
    }));
  };

  const removeIndustry = (index: number) => {
    if (formData.industries.length <= 1) {
      toast.error("You must keep at least 1 industry option.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.filter((_, i) => i !== index),
    }));
    toast.success("Industry option removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: formData }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
      setSaved(true);
      toast.success("Consultation & Site Assessment section saved successfully!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Failed to save consultation section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="11. Consultation & Site Assessment Form Section"
        description="Manage the 2-column consultation layout: Left column copy & contact channels, plus Right column form configuration and industry options."
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
        <div className="overflow-hidden flex flex-col gap-8 pt-1">
          {/* ========================================================================= */}
          {/* SECTION 1: LEFT COLUMN COPY & DIRECT CONTACTS */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-[#1A6AA2]" />
              <p className="text-[12px] font-extrabold uppercase tracking-widest text-slate-800">
                Section 1: Left Column Copy & Contact Channels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Over-title / Badge Tagline"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. WE'RE HERE TO HELP YOU"
              />

              <InputField
                label="Main Heading"
                value={formData.heading}
                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                placeholder="e.g. Not Sure Which Electrical Solution You Need?"
              />
            </div>

            <TextAreaField
              label="Blockquote / Engineering Guidance Note"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Share your load, electricity bill, DG usage or project requirement..."
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <InputField
                label="Primary Assessment CTA Button Text"
                value={formData.assessmentBtnText}
                onChange={(e) =>
                  setFormData({ ...formData, assessmentBtnText: e.target.value })
                }
                placeholder="e.g. Request a Site Assessment"
              />

              <InputField
                label="Secondary Call CTA Button Text"
                value={formData.expertBtnText}
                onChange={(e) =>
                  setFormData({ ...formData, expertBtnText: e.target.value })
                }
                placeholder="e.g. Speak With a Power Expert"
              />
            </div>

            {/* Direct Contact Channels */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Direct Contact Channels (Displayed on Left Column)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Direct Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 97738 51767"
                />

                <InputField
                  label="Sales Email"
                  value={formData.salesEmail}
                  onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                  placeholder="Sales@kumarpower.com"
                />

                <InputField
                  label="Accounts Email"
                  value={formData.accountsEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, accountsEmail: e.target.value })
                  }
                  placeholder="Accounts@kumarpower.com"
                />

                <InputField
                  label="Support Email"
                  value={formData.supportEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, supportEmail: e.target.value })
                  }
                  placeholder="Support@kumarpower.com"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2: RIGHT COLUMN FORM CONFIGURATION & INDUSTRY OPTIONS */}
          {/* ========================================================================= */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ListOrdered className="w-4 h-4 text-[#1A6AA2]" />
              <p className="text-[12px] font-extrabold uppercase tracking-widest text-slate-800">
                Section 2: Right Column Form Configuration & Success Message
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Submit Button Text"
                value={formData.submitBtnText}
                onChange={(e) =>
                  setFormData({ ...formData, submitBtnText: e.target.value })
                }
                placeholder="e.g. Request a Site Assessment"
              />

              <InputField
                label="Success State Title"
                value={formData.successTitle}
                onChange={(e) =>
                  setFormData({ ...formData, successTitle: e.target.value })
                }
                placeholder="e.g. Site Assessment Requested!"
              />
            </div>

            <TextAreaField
              label="Success State Description Note"
              value={formData.successMessage}
              onChange={(e) =>
                setFormData({ ...formData, successMessage: e.target.value })
              }
              placeholder="Thank you. Our technical engineering team will review your application..."
              rows={2}
            />

            {/* Configurable Industry Dropdown List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                    Industry Dropdown Options ({formData.industries.length} options)
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Customize the industry sectors available in the form dropdown menu.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addIndustry}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6AA2] hover:bg-[#155582] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Industry
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {formData.industries.map((ind, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <span className="text-xs font-bold text-slate-400 w-5 text-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={ind}
                      onChange={(e) => updateIndustry(idx, e.target.value)}
                      placeholder="e.g. Manufacturing"
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium outline-none focus:border-[#1A6AA2]"
                    />
                    {formData.industries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIndustry(idx)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer shrink-0"
                        title="Remove option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button Bar */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
