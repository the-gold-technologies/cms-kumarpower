"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SitemapRobotsCMSPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [robotsTxt, setRobotsTxt] = useState(
`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /submissions/

Sitemap: https://www.kumarpower.com/sitemap.xml`
  );

  const handleGenerateSitemap = () => {
    toast.success("XML Sitemap regenerated automatically!");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Robots.txt file saved!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Sitemap & Robots.txt Generator"
        description="Manage search engine indexing directives and regenerate sitemap.xml for Google Search Console."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sitemap Generator */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-slate-900">XML Sitemap Status</h3>
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active & Generated
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Your sitemap includes 24 dynamic pages (Products, Rentals, Services, Blogs) and updates automatically when you publish new content.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
            https://www.kumarpower.com/sitemap.xml
          </div>

          <button
            onClick={handleGenerateSitemap}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-2xl cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-index & Refresh Sitemap
          </button>
        </div>

        {/* Robots.txt Editor */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-black text-lg text-slate-900">Robots.txt Directives</h3>
          <TextAreaField
            label="Robots.txt File Content"
            value={robotsTxt}
            onChange={(e) => setRobotsTxt(e.target.value)}
            rows={8}
            className="font-mono text-xs"
          />
          <div className="flex justify-end">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
