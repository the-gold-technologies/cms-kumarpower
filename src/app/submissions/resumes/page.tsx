"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { useCMSStore } from "@/lib/cms-store";
import { ResumeItem } from "@/lib/types";
import { FileText, Download, Mail, PhoneCall } from "lucide-react";
import toast from "react-hot-toast";

export default function ResumesCMSPage() {
  const { resumes, saveResumes } = useCMSStore();
  const [selectedResume, setSelectedResume] = useState<ResumeItem | null>(null);

  const handleStatusChange = (id: string, newStatus: "Under Review" | "Shortlisted" | "Rejected") => {
    const updated = resumes.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    saveResumes(updated);
    if (selectedResume && selectedResume.id === id) {
      setSelectedResume({ ...selectedResume, status: newStatus });
    }
    toast.success(`Application status changed to ${newStatus}`);
  };

  const handleDelete = (item: ResumeItem) => {
    if (confirm(`Delete application for ${item.fullName}?`)) {
      const updated = resumes.filter((r) => r.id !== item.id);
      saveResumes(updated);
      toast.success("Application deleted");
      if (selectedResume?.id === item.id) setSelectedResume(null);
    }
  };

  const columns: Column<ResumeItem>[] = [
    {
      header: "Applicant Name",
      cell: (row) => (
        <div>
          <div className="font-extrabold text-slate-900 text-xs">{row.fullName}</div>
          <div className="text-[10px] text-slate-400 font-bold">{row.experienceYears} Experience</div>
        </div>
      ),
    },
    {
      header: "Applied Position",
      accessorKey: "appliedPosition",
    },
    {
      header: "Contact Info",
      cell: (row) => (
        <div className="flex flex-col gap-0.5 text-[11px]">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Mail className="w-3 h-3 text-slate-400" /> {row.email}
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-slate-400" /> {row.phone}
          </span>
        </div>
      ),
    },
    {
      header: "Resume File",
      cell: (row) => (
        <span className="inline-flex items-center gap-1 text-[#2D6FBA] bg-blue-50 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
          <FileText className="w-3 h-3" /> CV Attached
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
            row.status === "Shortlisted"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : row.status === "Under Review"
              ? "bg-amber-50 text-amber-600 border border-amber-200"
              : "bg-rose-50 text-rose-600 border border-rose-200"
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
        title="Resume & Job Applications"
        description="Review incoming job candidate resumes submitted through the Kumar Power careers section."
      />

      <DataTable
        title="Career Applications"
        description={`${resumes.length} Applications received`}
        data={resumes}
        columns={columns}
        onEdit={(row) => setSelectedResume(row)}
        onDelete={handleDelete}
      />

      {selectedResume && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                  {selectedResume.appliedPosition}
                </span>
                <h3 className="font-black text-xl text-slate-900">{selectedResume.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedResume(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Email</span>
                  <span className="font-extrabold text-slate-900">{selectedResume.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Phone</span>
                  <span className="font-extrabold text-slate-900">{selectedResume.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Cover Note</span>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 leading-relaxed text-slate-800">
                  {selectedResume.message}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#2D6FBA]" />
                  <div>
                    <span className="font-extrabold text-slate-900 block text-xs">Resume File Document</span>
                    <span className="text-[10px] text-slate-500">{selectedResume.resumePath}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Resume downloaded")}
                  className="flex items-center gap-1.5 bg-[#2D6FBA] text-white px-3 py-1.5 rounded-xl font-bold text-xs"
                >
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-2 uppercase text-[10px]">Update Application Status</span>
                <div className="flex gap-2">
                  {(["Under Review", "Shortlisted", "Rejected"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedResume.id, st)}
                      className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                        selectedResume.status === st
                          ? "bg-[#2D6FBA] text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedResume(null)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
