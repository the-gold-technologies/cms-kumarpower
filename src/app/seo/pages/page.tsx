"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import { useCMSStore } from "@/lib/cms-store";
import { PageSeo } from "@/lib/mock-data/initialData";
import toast from "react-hot-toast";

export default function PageSeoCMSPage() {
  const { seoSettings, saveSeoSettings } = useCMSStore();
  const [selectedSeo, setSelectedSeo] = useState<PageSeo | null>(null);

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeo) return;

    const updated = seoSettings.map((item) =>
      item.slug === selectedSeo.slug ? selectedSeo : item
    );
    saveSeoSettings(updated);
    toast.success("Page SEO meta updated!");
    setSelectedSeo(null);
  };

  const columns: Column<PageSeo>[] = [
    {
      header: "Page Title",
      cell: (row) => (
        <div>
          <div className="font-extrabold text-slate-900 text-xs">{row.pageName}</div>
          <div className="text-[10px] text-slate-400 font-mono">{row.slug}</div>
        </div>
      ),
    },
    {
      header: "Meta Title Tag",
      cell: (row) => (
        <div className="text-xs font-semibold text-slate-800 line-clamp-1">
          {row.metaTitle}
        </div>
      ),
    },
    {
      header: "Meta Description",
      cell: (row) => (
        <div className="text-[11px] text-slate-500 line-clamp-2 max-w-xs">
          {row.metaDescription}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Page-Level Meta SEO"
        description="Optimize titles, meta descriptions, and keywords for individual website routes."
      />

      <DataTable
        title="Pages SEO Settings"
        description={`${seoSettings.length} Pages configured`}
        data={seoSettings}
        columns={columns}
        onEdit={(row) => setSelectedSeo(row)}
      />

      {selectedSeo && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900">
                Edit SEO for {selectedSeo.pageName}
              </h3>
              <button
                onClick={() => setSelectedSeo(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <InputField
                label="Meta Title Tag"
                value={selectedSeo.metaTitle}
                onChange={(e) =>
                  setSelectedSeo({ ...selectedSeo, metaTitle: e.target.value })
                }
              />

              <TextAreaField
                label="Meta Description Tag"
                value={selectedSeo.metaDescription}
                onChange={(e) =>
                  setSelectedSeo({ ...selectedSeo, metaDescription: e.target.value })
                }
                rows={3}
              />

              <TextAreaField
                label="Target Search Keywords (Comma Separated)"
                value={selectedSeo.keywords}
                onChange={(e) =>
                  setSelectedSeo({ ...selectedSeo, keywords: e.target.value })
                }
                rows={2}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedSeo(null)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <SaveButton label="Save Meta Tags" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
