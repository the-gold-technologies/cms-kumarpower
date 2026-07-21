"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SelectField } from "@/components/SelectField";
import { ImagePickerField } from "@/components/ImagePickerField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { RichTextEditor } from "@/components/RichTextEditor";
import { SaveButton } from "@/components/SaveButton";
import { BlogItem } from "@/lib/types";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  User,
  Clock,
  FileText,
  Tag,
  Link as LinkIcon,
} from "lucide-react";
import toast from "react-hot-toast";

export default function StaticBlogCMSPage() {
  const [blogList, setBlogList] = useState<BlogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Hero Section State
  const [isHeroOpen, setIsHeroOpen] = useState(true);
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);
  const [heroTagline, setHeroTagline] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroBg, setHeroBg] = useState("");

  // Articles Section State
  const [isArticlesOpen, setIsArticlesOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<BlogItem, "id">>({
    title: "",
    slug: "",
    category: "Product Guide",
    author: "Kumar Power Team",
    publishedDate: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    readTime: "4 min read",
    status: "Published",
  });

  useEffect(() => {
    fetch("/api/pages/blogs")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          if (Array.isArray(json.data.articles)) {
            setBlogList(json.data.articles);
          }
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/api/pages/blogs")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const hero = json.data.blogs || json.data;
          if (hero.heroTagline !== undefined) setHeroTagline(hero.heroTagline);
          if (hero.heroHeading !== undefined) setHeroHeading(hero.heroHeading);
          if (hero.heroSub !== undefined) setHeroSub(hero.heroSub);
          if (hero.heroBg !== undefined) setHeroBg(hero.heroBg);
        }
      })
      .catch(console.error);
  }, []);

  const handleSaveHero = async () => {
    setSavingHero(true);
    try {
      const payload = { heroTagline, heroHeading, heroSub, heroBg };
      const res = await fetch("/api/pages/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "blogs", content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSavedHero(true);
      toast.success("Blog Landing Header Section Saved!");
      setTimeout(() => setSavedHero(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setSavingHero(false);
    }
  };

  // Helper to generate a clean unique URL / slug
  const generateSlug = (titleText: string) => {
    const clean = titleText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return clean ? `${clean}-${randomSuffix}` : `article-${Date.now()}`;
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: "Product Guide",
      author: "Kumar Power Team",
      publishedDate: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      readTime: "4 min read",
      status: "Published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: BlogItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      category: item.category,
      author: item.author,
      publishedDate: item.publishedDate,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      readTime: item.readTime,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (item: BlogItem) => {
    if (confirm(`Are you sure you want to delete article "${item.title}"?`)) {
      const updated = blogList.filter((b) => b.id !== item.id);
      setBlogList(updated);
      toast.success("Blog article deleted");
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Article Title is required!");
      return;
    }

    const finalSlug = formData.slug || generateSlug(formData.title);

    if (editingId) {
      const updated = blogList.map((b) =>
        b.id === editingId
          ? { ...formData, slug: finalSlug, id: editingId }
          : b,
      );
      setBlogList(updated);
      toast.success("Blog article updated!");
    } else {
      const newBlog: BlogItem = {
        ...formData,
        id: `blog-${Date.now()}`,
        slug: finalSlug,
      };
      const updated = [newBlog, ...blogList];
      setBlogList(updated);
      toast.success("New blog article created!");
    }

    setIsModalOpen(false);
  };

  const filteredBlogs = blogList.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...Array.from(new Set(blogList.map((b) => b.category))),
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Blogs & Articles Overview CMS (/static-pages/blog)"
        description="Manage the main Blog Landing Page header banner and manage published articles in card format."
      />

      {/* 1. Header Banner Form Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Blog Landing Header Banner"
          description="Manage header headline, tagline badge, subtitle description, and background image for the main blog landing page."
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
              label="Tagline Badge Text"
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              placeholder="e.g. KUMAR POWER BLOG & INSIGHTS"
            />
            <InputField
              label="Main Blog Heading"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              placeholder="e.g. Technical Insights, Generator Guides & Power Updates"
            />
            <TextAreaField
              label="Subtitle Description Paragraph"
              value={heroSub}
              onChange={(e) => setHeroSub(e.target.value)}
              rows={3}
              placeholder="Enter a comprehensive intro paragraph..."
            />
            <ImageUploadField
              label="Header Banner Background Image"
              value={heroBg}
              onChange={(val) => setHeroBg(val)}
            />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton
                isSaving={savingHero}
                saved={savedHero}
                onClick={handleSaveHero}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Blog Articles & Card Grid Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <SectionHeader
            title={`2. Published Blog Articles (${filteredBlogs.length} Articles)`}
            description="Manage articles in card format, search by category, and generate unique article URLs."
            isOpen={isArticlesOpen}
            onToggle={() => setIsArticlesOpen(!isArticlesOpen)}
          />
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#2D6FBA] hover:bg-[#235896] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create New Article
          </button>
        </div>

        <div
          className={`grid transition-all duration-300 ${
            isArticlesOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden space-y-6 pt-2">
            {/* Filter & Search Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-1 min-w-[280px] bg-white px-4 py-2.5 rounded-2xl border border-slate-200">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles by title, excerpt or URL slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs font-semibold text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blog Cards Grid */}
            {filteredBlogs.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-200">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">
                  No blog articles found
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your search query or click "Create New Article".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      {/* Cover Image & Category Badge */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#0a192f]/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          {item.category}
                        </div>
                        <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-xs">
                          {item.status}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.publishedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {item.readTime}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-base text-slate-900 line-clamp-2 group-hover:text-[#2D6FBA] transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>

                        {/* Generated URL Info */}
                        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-[#2D6FBA] font-bold">
                          <LinkIcon className="w-3 h-3 shrink-0" />
                          <span className="truncate">/blog/{item.slug}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100/50 bg-slate-50/50">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                        <User className="w-3.5 h-3.5" />
                        <span>{item.author}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 rounded-xl text-slate-400 hover:text-[#2D6FBA] hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Form for Create / Edit Blog Article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900">
                {editingId ? "Edit Blog Article" : "Create New Blog Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <InputField
                label="Article Title *"
                value={formData.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setFormData({
                    ...formData,
                    title: newTitle,
                    slug: editingId ? formData.slug : generateSlug(newTitle),
                  });
                }}
                placeholder="e.g. Why Kirloskar CPCB IV+ Silent Generators Save Fuel"
                required
              />

              <InputField
                label="Generated URL Slug (/blog/your-slug) *"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="e.g. why-kirloskar-cpcb-iv-silent-generators-save-fuel"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SelectField
                  label="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  options={[
                    { label: "Product Guide", value: "Product Guide" },
                    { label: "Technical Specs", value: "Technical Specs" },
                    { label: "Maintenance Tips", value: "Maintenance Tips" },
                    { label: "Installation", value: "Installation" },
                    { label: "Company News", value: "Company News" },
                  ]}
                />

                <InputField
                  label="Author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />

                <InputField
                  label="Publish Date"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, publishedDate: e.target.value })
                  }
                />
              </div>

              <TextAreaField
                label="Article Summary Excerpt *"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={3}
                placeholder="Provide a short 2-3 sentence overview for card previews..."
                required
              />

              <RichTextEditor
                label="Article Content (WYSIWYG Rich Text)"
                value={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                tooltip="Format headings, bold text, lists, and links visually for your blog post."
              />

              <ImagePickerField
                label="Cover Image"
                value={formData.image || ""}
                onChange={(val) => setFormData({ ...formData, image: val })}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <SaveButton
                  label={editingId ? "Save Changes" : "Publish Article"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
