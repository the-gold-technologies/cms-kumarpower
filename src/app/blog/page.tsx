"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SelectField } from "@/components/SelectField";
import { ImagePickerField } from "@/components/ImagePickerField";
import { RichTextEditor } from "@/components/RichTextEditor";
import { SaveButton } from "@/components/SaveButton";
import { useCMSStore } from "@/lib/cms-store";
import { BlogItem } from "@/lib/types";
import toast from "react-hot-toast";

export default function BlogCMSPage() {
  const { blogs, saveBlogs } = useCMSStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<BlogItem, "id">>({
    title: "",
    slug: "",
    category: "Product Guide",
    author: "Technical Team",
    publishedDate: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    readTime: "4 min read",
    status: "Published",
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: "Product Guide",
      author: "Technical Team",
      publishedDate: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
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
    if (confirm(`Delete blog post "${item.title}"?`)) {
      const updated = blogs.filter((b) => b.id !== item.id);
      saveBlogs(updated);
      toast.success("Blog post deleted!");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Please enter a blog title");
      return;
    }

    if (editingId) {
      const updated = blogs.map((b) =>
        b.id === editingId ? { ...formData, id: editingId } : b
      );
      saveBlogs(updated);
      toast.success("Blog post updated!");
    } else {
      const newBlog: BlogItem = {
        ...formData,
        id: `blog-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-"),
      };
      saveBlogs([newBlog, ...blogs]);
      toast.success("Blog post published!");
    }

    setIsModalOpen(false);
  };

  const columns: Column<BlogItem>[] = [
    {
      header: "Article Title",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.image}
            alt={row.title}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <div className="font-extrabold text-slate-900 text-xs line-clamp-1">{row.title}</div>
            <div className="text-[10px] text-slate-400 font-bold">{row.category} • {row.readTime}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Author",
      accessorKey: "author",
    },
    {
      header: "Publish Date",
      accessorKey: "publishedDate",
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
            row.status === "Published"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Blog Articles & News CMS"
        description="Publish maintenance guides, Kirloskar generator tips, industry insights, and technical advice."
      />

      <DataTable
        title="Published Articles"
        description={`${blogs.length} Blog articles in CMS`}
        data={blogs}
        columns={columns}
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
        addLabel="Write New Article"
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900">
                {editingId ? "Edit Article" : "New Blog Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <InputField
                label="Article Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Why Kirloskar CPCB IV+ Silent Generators Save Fuel"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SelectField
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  options={[
                    { label: "Product Guide", value: "Product Guide" },
                    { label: "Maintenance Tips", value: "Maintenance Tips" },
                    { label: "Technology", value: "Technology" },
                    { label: "Company News", value: "Company News" },
                  ]}
                />

                <InputField
                  label="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />

                <InputField
                  label="Publish Date"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                />
              </div>

              <TextAreaField
                label="Article Summary Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
              />

              <RichTextEditor
                label="Article Content (WYSIWYG Rich Text)"
                value={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                tooltip="Format headings, bold text, lists, and links visually for your blog post."
              />

              <ImagePickerField
                label="Cover Image"
                value={formData.image}
                onChange={(val) => setFormData({ ...formData, image: val })}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <SaveButton label="Publish Article" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
