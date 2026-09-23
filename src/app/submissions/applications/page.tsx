"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { JobApplicationItem } from "@/lib/types";
import {
  Mail,
  PhoneCall,
  FileText,
  ExternalLink,
  Download,
  Calendar,
  Briefcase,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function JobApplicationsCMSPage() {
  const [applications, setApplications] = useState<JobApplicationItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<JobApplicationItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchApplications = () => {
    setLoading(true);
    fetch("/api/applications")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setApplications(json.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load applications:", err);
        toast.error("Failed to load applications");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: "New" | "Reviewed" | "Shortlisted" | "Rejected"
  ) => {
    const updated = applications.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setApplications(updated);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }

    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Application marked as ${newStatus}`);
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch {
      toast.error("Network error while updating status");
    }
  };

  const handleDelete = async (item: JobApplicationItem) => {
    if (!confirm(`Are you sure you want to delete application from ${item.fullName}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/applications?id=${item.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) => prev.filter((a) => a.id !== item.id));
        if (selectedApp?.id === item.id) setSelectedApp(null);
        toast.success("Application deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete application");
      }
    } catch {
      toast.error("Failed to delete application");
    }
  };

  // Stats count
  const newCount = applications.filter((a) => a.status === "New").length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const reviewedCount = applications.filter((a) => a.status === "Reviewed").length;

  const columns: Column<JobApplicationItem>[] = [
    {
      header: "Candidate Name",
      cell: (row) => (
        <div>
          <div className="font-extrabold text-slate-900 text-sm">{row.fullName}</div>
          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3" />
            {row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }) : "N/A"}
          </div>
        </div>
      ),
    },
    {
      header: "Contact Details",
      cell: (row) => (
        <div className="flex flex-col gap-1 text-[11px]">
          <a
            href={`mailto:${row.email}`}
            className="font-bold text-slate-800 flex items-center gap-1.5 hover:text-[#2D6FBA] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {row.email}
          </a>
          <a
            href={`tel:${row.phone}`}
            className="text-slate-600 flex items-center gap-1.5 hover:text-[#2D6FBA] transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {row.phone}
          </a>
        </div>
      ),
    },
    {
      header: "Cover Note",
      cell: (row) => (
        <div className="max-w-[240px] truncate text-slate-600 text-xs" title={row.message || "No cover note"}>
          {row.message || <span className="text-slate-400 italic">No cover note provided</span>}
        </div>
      ),
    },
    {
      header: "Resume",
      cell: (row) => (
        row.resumeUrl ? (
          <a
            href={row.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#2D6FBA] hover:bg-blue-100 rounded-xl text-xs font-bold border border-blue-200 transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        ) : (
          <span className="text-slate-400 text-xs italic">No file attached</span>
        )
      ),
    },
    {
      header: "Status",
      cell: (row) => {
        const badgeColors = {
          New: "bg-rose-50 text-rose-600 border-rose-200",
          Reviewed: "bg-amber-50 text-amber-700 border-amber-200",
          Shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-200",
          Rejected: "bg-slate-100 text-slate-600 border-slate-200",
        };
        const statusClass = badgeColors[row.status as keyof typeof badgeColors] || badgeColors.New;

        return (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${statusClass}`}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Job Applications & Resumes"
        description="Review candidate applications submitted from the website career portal. Download resumes and manage candidate status."
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2D6FBA] flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Applicants</p>
            <h4 className="text-2xl font-black text-slate-900">{applications.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Review</p>
            <h4 className="text-2xl font-black text-rose-600">{newCount}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Shortlisted</p>
            <h4 className="text-2xl font-black text-emerald-600">{shortlistedCount}</h4>
          </div>
        </div>
      </div>

      <DataTable
        title="Candidate Submissions"
        description={`${applications.length} applications received through Careers form`}
        data={applications}
        columns={columns}
        onEdit={(row) => setSelectedApp(row)}
        onDelete={handleDelete}
      />

      {/* Candidate Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                  Job Application Detail
                </span>
                <h3 className="font-black text-xl text-slate-900">{selectedApp.fullName}</h3>
                <span className="text-xs text-slate-400">
                  Applied on {selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }) : "N/A"}
                </span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="min-w-0">
                  <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Email Address</span>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="font-extrabold text-[#2D6FBA] hover:underline break-all block"
                  >
                    {selectedApp.email}
                  </a>
                </div>
                <div className="min-w-0">
                  <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Phone Number</span>
                  <a
                    href={`tel:${selectedApp.phone}`}
                    className="font-extrabold text-[#2D6FBA] hover:underline break-all block"
                  >
                    {selectedApp.phone}
                  </a>
                </div>
              </div>

              {/* Resume File Box */}
              <div>
                <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Candidate Resume</span>
                {selectedApp.resumeUrl ? (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#2D6FBA] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">Uploaded Resume Document</p>
                        <p className="text-[10px] text-slate-500 truncate">Stored securely on Cloudinary</p>
                      </div>
                    </div>
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#2D6FBA] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <span>Open File</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 italic">
                    No resume document was uploaded with this application.
                  </div>
                )}
              </div>

              {/* Message / Cover Note */}
              <div>
                <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Cover Note / Message</span>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 leading-relaxed text-slate-800 whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                  {selectedApp.message || "No cover note provided by candidate."}
                </div>
              </div>

              {/* Status Updater */}
              <div>
                <span className="text-slate-400 font-bold block mb-2 uppercase text-[10px]">Update Candidate Status</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["New", "Reviewed", "Shortlisted", "Rejected"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedApp.id, st)}
                      className={`py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                        selectedApp.status === st
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

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDelete(selectedApp)}
                className="text-rose-600 hover:text-rose-700 font-bold text-xs"
              >
                Delete Record
              </button>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold cursor-pointer transition-colors"
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
