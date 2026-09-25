"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SectionHeader } from "@/components/SectionHeader";
import { RichTextEditor } from "@/components/RichTextEditor";
import { SaveButton } from "@/components/SaveButton";
import { ShieldCheck, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function PrivacyPolicyCMSPage() {
  const [loading, setLoading] = useState(true);

  // Section Accordion State
  const [isMetaOpen, setIsMetaOpen] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(true);

  // Save states
  const [savingMeta, setSavingMeta] = useState(false);
  const [savingEditor, setSavingEditor] = useState(false);

  // Form State
  const [title, setTitle] = useState("Privacy Policy");
  const [badge, setBadge] = useState("Legal & Privacy Assurance");
  const [subtitle, setSubtitle] = useState(
    "How Kumar Power collects, safeguards, and processes your commercial, technical, and personal data.",
  );
  const [lastUpdated, setLastUpdated] = useState("September 25, 2026");
  const [effectiveDate, setEffectiveDate] = useState("January 1, 2026");
  const [contactEmail, setContactEmail] = useState("info@kumarpower.com");
  const [contactPhone, setContactPhone] = useState("+91 97738 51767");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/privacy-policy")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const policy = json.data["privacy-policy"] || json.data;
          if (policy.title !== undefined) setTitle(policy.title);
          if (policy.badge !== undefined) setBadge(policy.badge);
          if (policy.subtitle !== undefined) setSubtitle(policy.subtitle);
          if (policy.lastUpdated !== undefined)
            setLastUpdated(policy.lastUpdated);
          if (policy.effectiveDate !== undefined)
            setEffectiveDate(policy.effectiveDate);
          if (policy.contactEmail !== undefined)
            setContactEmail(policy.contactEmail);
          if (policy.contactPhone !== undefined)
            setContactPhone(policy.contactPhone);
          if (policy.content !== undefined) setContent(policy.content);
        }
      })
      .catch((err) => {
        console.error("Error loading Privacy Policy:", err);
        toast.error("Failed to load Privacy Policy data");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavingEditor(true);
    setSavingMeta(true);

    try {
      const payload = {
        title,
        badge,
        subtitle,
        lastUpdated,
        effectiveDate,
        contactEmail,
        contactPhone,
        content,
      };

      const res = await fetch("/api/privacy-policy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "privacy-policy",
          content: payload,
        }),
      });

      if (!res.ok) throw new Error("Failed to save changes");

      toast.success("Privacy Policy published successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save Privacy Policy");
    } finally {
      setSavingEditor(false);
      setSavingMeta(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#2D6FBA] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Loading Privacy Policy Content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Page Header */}
      <PageHeader
        title="Privacy Policy Management"
        description="Write and publish legally compliant, rich privacy policy content for website visitors, clients, and partners."
      />

      {/* 1. Basic Information & Headers */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Page Header & Metadata"
          description="Configure the header titles, badge, revision timestamps, and contact references shown on the live policy page."
          isOpen={isMetaOpen}
          onToggle={() => setIsMetaOpen(!isMetaOpen)}
        />

        <div
          className={`space-y-6 transition-all duration-300 ${isMetaOpen ? "mt-8" : "hidden"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Page Main Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Privacy Policy"
              required
            />

            <InputField
              label="Header Badge Label"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. Legal & Privacy Assurance"
            />
          </div>

          <TextAreaField
            label="Header Subtitle / Summary *"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            placeholder="Brief introductory summary of data protection principles..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
            <InputField
              label="Last Updated Date"
              value={lastUpdated}
              onChange={(e) => setLastUpdated(e.target.value)}
              placeholder="e.g. September 25, 2026"
            />

            <InputField
              label="Effective Date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              placeholder="e.g. January 1, 2026"
            />

            <InputField
              label="Grievance / Contact Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="e.g. info@kumarpower.com"
            />

            <InputField
              label="Grievance / Support Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="e.g. +91 97738 51767"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton
              label={savingMeta ? "Saving..." : "Save Header Info"}
              onClick={handleSaveAll}
            />
          </div>
        </div>
      </div>

      {/* 2. Policy Rich Text Editor (Like Blog Editor) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="2. Policy Document Content (WYSIWYG Rich Editor)"
          description="Just like the blog editor, format sections with headings (H2, H3), bold text, bullet lists, numbered lists, blockquotes, and links."
          isOpen={isEditorOpen}
          onToggle={() => setIsEditorOpen(!isEditorOpen)}
        />

        <div
          className={`space-y-6 transition-all duration-300 ${isEditorOpen ? "mt-8" : "hidden"}`}
        >
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-[#2D6FBA] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">WYSIWYG Editor Guidance:</span> Use
              the toolbar below to organize your policy clauses. Use{" "}
              <strong>Heading 2</strong> for main policy numbers (e.g.{" "}
              <em>1. Information We Collect</em>), <strong>Heading 3</strong>{" "}
              for sub-clauses, and <strong>Bullet Lists</strong> for categorized
              terms. Click <strong>Publish</strong> to sync across the live
              website immediately.
            </div>
          </div>

          <RichTextEditor
            label="Privacy Policy Body Content"
            value={content}
            onChange={(html) => setContent(html)}
            placeholder="Write or edit the privacy policy clauses here..."
            minHeight="480px"
            tooltip="Fully interactive rich text editor with headings, bold, italic, underline, lists, quotes, and links."
          />

          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FileText className="w-4 h-4" />
              <span>
                HTML markup is automatically rendered with typography styling on
                the public website.
              </span>
            </div>
            <SaveButton
              label={savingEditor ? "Publishing..." : "Publish Full Policy"}
              onClick={handleSaveAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
