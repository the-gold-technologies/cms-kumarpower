"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import { ImageUploadField } from "@/components/ImageUploadField";
import { uploadFiles } from "@/lib/uploadHelpers";
import toast from "react-hot-toast";
import { Globe, Activity, Shield } from "lucide-react";

interface GlobalConfig {
  siteTitle: string;
  siteDescription: string;
  favicon: (File | string | null)[];
  googleAnalyticsId: string;
  gtmId: string;
  searchConsoleId: string;
  customHeaderScripts: string;
  customFooterScripts: string;
  schema?: string;
  headingOptions?: string;
}

const defaultData: GlobalConfig = {
  siteTitle: "",
  siteDescription: "",
  favicon: [],
  googleAnalyticsId: "",
  gtmId: "",
  searchConsoleId: "",
  customHeaderScripts: "",
  customFooterScripts: "",
  schema: "",
  headingOptions: "h1",
};

export default function GlobalSeoCMSPage() {
  const [formData, setFormData] = useState<GlobalConfig>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/seo/global");
        const json = await res.json();
        if (json.success && json.data) {
          const data = json.data;
          setFormData({
            ...defaultData,
            ...data,
            favicon: data.favicon ? [data.favicon] : [],
            headingOptions: typeof data.headingOptions === "string" ? data.headingOptions : "h1",
          });
        }
      } catch (error) {
        console.error("Error fetching global SEO:", error);
        toast.error("Failed to load SEO settings.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const tid = toast.loading("Saving global SEO settings...");

    try {
      const faviconUrls = await uploadFiles(formData.favicon);
      const faviconUrl = faviconUrls[0] || null;

      const payload = {
        ...formData,
        favicon: faviconUrl,
      };

      const res = await fetch("/api/seo/global", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: payload }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Global SEO settings saved!", { id: tid });
      } else {
        const errMsg =
          typeof json.error === "string"
            ? json.error
            : json.error?.message || "Save failed.";
        toast.error(errMsg, { id: tid });
      }
    } catch (error) {
      console.error("Error saving global SEO:", error);
      toast.error("Network error.", { id: tid });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-pulse text-gray-400 font-medium font-mono text-xs tracking-widest uppercase">
          Loading SEO settings...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-end">
        <PageHeader
          title="Global SEO & Tracking"
          description="Manage website-wide meta tags, tracking codes, favicon, and social profiles."
        />
        <div className="mb-2">
          <SaveButton onClick={handleSave} disabled={isSaving} className="w-auto px-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Identity */}
        <div className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">General Identity</h2>
          </div>

          <InputField
            label="Default Site Title"
            value={formData.siteTitle}
            onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
            placeholder="e.g. Kumar Power | Kirloskar Generator Dealer"
            tooltip="The main title of your website. Appears in browser tabs and search results when no page-level title is set."
          />
          <TextAreaField
            label="Default Site Description"
            value={formData.siteDescription}
            onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
            placeholder="A short summary of what your site is about (150–160 characters)."
            rows={3}
            tooltip="A summary of your website used by search engines for result snippets on pages without a specific meta description."
          />
          <div className="mt-2">
            <ImageUploadField
              label="Favicon (.ico or .png)"
              images={formData.favicon}
              onImagesChange={(imgs) => setFormData({ ...formData, favicon: imgs })}
              maxImages={1}
              tooltip="The small icon shown in browser tabs. Use a .ico file or a 32x32px .png for best results."
            />
          </div>
        </div>

        {/* Tracking & Analytics */}
        <div className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Tracking & Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Google Analytics ID (GA4)"
              value={formData.googleAnalyticsId}
              onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
              placeholder="e.g. G-XXXXXXXXXX"
              tooltip="Measurement ID (G-XXXXXXX). Go to Google Analytics → Admin → Data Streams → select your website → copy the ID starting with G-."
            />
            <InputField
              label="GTM Container ID"
              value={formData.gtmId}
              onChange={(e) => setFormData({ ...formData, gtmId: e.target.value })}
              placeholder="e.g. GTM-XXXXXXX"
              tooltip="Container ID (GTM-XXXXXXX). Open Google Tag Manager → select workspace → copy the ID starting with GTM-."
            />
          </div>
          <InputField
            label="Search Console Verification ID"
            value={formData.searchConsoleId}
            onChange={(e) => setFormData({ ...formData, searchConsoleId: e.target.value })}
            placeholder="Enter the google-site-verification code"
            tooltip={`Copy the content value from the HTML tag in Google Search Console.\nExample: <meta name="google-site-verification" content="XXXXXXXX" />\nPaste only the XXXXXXXX part.`}
          />
        </div>

        {/* Custom Code Injection */}
        <div className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Custom Code Injection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextAreaField
              label="Custom Header Scripts (<head>)"
              value={formData.customHeaderScripts}
              onChange={(e) =>
                setFormData({ ...formData, customHeaderScripts: e.target.value })
              }
              placeholder="Paste your scripts to be injected into the <head> tag..."
              rows={8}
              className="font-mono text-xs"
              tooltip="Scripts placed here will be injected inside the <head> tag of every page. Use for custom fonts, meta tags, or third-party scripts."
            />
            <TextAreaField
              label="Custom Footer Scripts (before </body>)"
              value={formData.customFooterScripts}
              onChange={(e) =>
                setFormData({ ...formData, customFooterScripts: e.target.value })
              }
              placeholder="Paste your scripts to be injected before the closing </body> tag..."
              rows={8}
              className="font-mono text-xs"
              tooltip="Scripts placed here will be injected just before the closing </body> tag. Use for chat widgets, pixel tracking, or deferred scripts."
            />
            <TextAreaField
              label="Structured Data — Global Schema (JSON-LD)"
              value={formData.schema || ""}
              onChange={(e) =>
                setFormData({ ...formData, schema: e.target.value })
              }
              placeholder='e.g. { "@context": "https://schema.org", "@type": "Organization", "name": "Kumar Power" }'
              rows={8}
              className="font-mono text-xs md:col-span-2"
              containerClassName="md:col-span-2"
              allowJsonUpload={true}
              tooltip="Global Schema.org JSON-LD structured data injected on every page. Click 'Validate JSON' to check syntax before saving."
            />

            <div className="flex flex-col gap-1.5 px-0.5 md:col-span-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                Default Hero Headline Tag (SEO)
              </span>
              <select
                value={formData.headingOptions || "h1"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    headingOptions: e.target.value,
                  })
                }
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-1 focus:ring-[#2D6FBA] focus:border-[#2D6FBA] outline-none text-gray-800 cursor-pointer h-[54px]"
              >
                <option value="h1">H1 (Recommended — standard title tag)</option>
                <option value="h2">H2 (Alternative heading tag)</option>
                <option value="h3">H3 (Sub-heading tag)</option>
                <option value="h4">H4 (Sub-heading tag)</option>
                <option value="h5">H5 (Sub-heading tag)</option>
                <option value="h6">H6 (Sub-heading tag)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
