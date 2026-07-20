"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type BlogCardItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
};

const INITIAL_BLOGS: BlogCardItem[] = [
  {
    id: "blog-1",
    slug: "amf-panel-for-dg-set",
    title: "AMF Panel for DG Set: Automatic Power Management for Continuous Operations",
    summary:
      "AMF Panels (Automatic Mains Failure Panels) for DG Sets are essential for ensuring uninterrupted power supply, automatically switching between mains and generator power during outages.",
    image: "",
  },
  {
    id: "blog-2",
    slug: "kirloskar-silent-generator",
    title: "Kirloskar Silent Generator for Home and Business: Diesel, Green & DG Set Guide",
    summary:
      "The Kirloskar silent power generator operates at a noise level of less than 75 dBA at 1 metre distance, which is roughly similar to the sound of a normal conversation.",
    image: "",
  },
  {
    id: "blog-3",
    slug: "industrial-kirloskar-dg-set-750kva-1500kva",
    title: "Industrial Kirloskar DG Set (750 kVA to 1500 kVA) for Heavy Duty Power Requirement",
    summary:
      "Heavy-duty industrial Kirloskar DG Sets ranging from 750 kVA to 1500 kVA are engineered for continuous, reliable prime and standby power in large-scale manufacturing, infrastructure, and commercial sectors.",
    image: "",
  },
];

export function BlogSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    title: "Blogs",
    subtitle: "Explore expert articles, case studies, and latest trends in industrial power solutions.",
    maxPostsDisplayed: "3",

    // Bottom Call To Action Banner in BlogSection.tsx
    ctaTitle: "Call To Action",
    ctaDescription: "Have questions or need more information? We're here to help!",
    ctaBtn1Label: "Enquire Now",
    ctaBtn1Url: "/contact",
    ctaBtn2Label: "Download Our Company Profile",
    ctaProfilePdf: "",
  });

  const [blogCards, setBlogCards] = useState<BlogCardItem[]>(INITIAL_BLOGS);

  const handleBlogChange = (id: string, field: keyof BlogCardItem, val: string) => {
    setBlogCards((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: val } : b))
    );
  };

  const addBlogCard = () => {
    const newId = `blog-${Date.now()}`;
    setBlogCards((prev) => [
      ...prev,
      {
        id: newId,
        slug: "new-article-slug",
        title: "",
        summary: "",
        image: "",
      },
    ]);
    toast.success("New blog card added!");
  };

  const removeBlogCard = (id: string) => {
    setBlogCards((prev) => prev.filter((b) => b.id !== id));
    toast.success("Blog card removed");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Blog section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Blog Section & Bottom Callout"
        description="Manage featured blog cards (add multiple blog cards), section headings & bottom 'Call To Action' profile download banner."
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
          {/* Main Blog Section Header */}
          <div className="space-y-3">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">Blog Header</p>
            <InputField
              label="Section Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Blogs"
            />

            <TextAreaField
              label="Section Subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              rows={2}
            />

            <InputField
              label="Max Articles Displayed"
              type="number"
              value={formData.maxPostsDisplayed}
              onChange={(e) => setFormData({ ...formData, maxPostsDisplayed: e.target.value })}
            />
          </div>

          {/* Dynamic Multiple Blog Cards Section */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Featured Blog Cards ({blogCards.length} articles)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Click 'Add Blog Article Card' to add as many featured blog cards as needed
                </p>
              </div>
              <button
                type="button"
                onClick={addBlogCard}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Blog Card
              </button>
            </div>

            <div className="space-y-4">
              {blogCards.map((b, idx) => (
                <div key={b.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Blog Card #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeBlogCard(b.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Article Title"
                      value={b.title}
                      onChange={(e) => handleBlogChange(b.id, "title", e.target.value)}
                      placeholder="e.g. AMF Panel for DG Set"
                    />
                    <InputField
                      label="Article Slug / URL"
                      value={b.slug}
                      onChange={(e) => handleBlogChange(b.id, "slug", e.target.value)}
                      placeholder="e.g. amf-panel-for-dg-set"
                    />
                  </div>

                  <TextAreaField
                    label="Article Summary Excerpt"
                    value={b.summary}
                    onChange={(e) => handleBlogChange(b.id, "summary", e.target.value)}
                    rows={2}
                  />

                  <ImageUploadField
                    label="Cover Image"
                    value={b.image}
                    onChange={(val) => handleBlogChange(b.id, "image", val)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call To Action Banner in BlogSection.tsx */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              Bottom Call To Action Banner (in Blog Section)
            </p>
            <InputField
              label="CTA Title"
              value={formData.ctaTitle}
              onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
              placeholder="e.g. Call To Action"
            />

            <TextAreaField
              label="CTA Description"
              value={formData.ctaDescription}
              onChange={(e) => setFormData({ ...formData, ctaDescription: e.target.value })}
              rows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Button 1 Label"
                value={formData.ctaBtn1Label}
                onChange={(e) => setFormData({ ...formData, ctaBtn1Label: e.target.value })}
                placeholder="e.g. Enquire Now"
              />
              <InputField
                label="Button 1 Target URL"
                value={formData.ctaBtn1Url}
                onChange={(e) => setFormData({ ...formData, ctaBtn1Url: e.target.value })}
                placeholder="e.g. /contact"
              />
            </div>

            <InputField
              label="Button 2 Label"
              value={formData.ctaBtn2Label}
              onChange={(e) => setFormData({ ...formData, ctaBtn2Label: e.target.value })}
              placeholder="e.g. Download Our Company Profile"
            />

            <PDFUploadField
              label="Company Profile PDF File (Button 2 download)"
              value={formData.ctaProfilePdf}
              onChange={(val) => setFormData({ ...formData, ctaProfilePdf: val })}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
