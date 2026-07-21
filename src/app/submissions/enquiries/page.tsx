"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { EnquiryItem } from "@/lib/types";
import { Mail, PhoneCall, CheckCircle2, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function EnquiriesCMSPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  useEffect(() => {
    fetch("/api/enquiries")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setEnquiries(json.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleStatusChange = async (id: string, newStatus: "New" | "Contacted" | "Closed") => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    try {
      await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error("Status update error");
    }
  };

  const handleDelete = (item: EnquiryItem) => {
    if (confirm(`Delete enquiry from ${item.name}?`)) {
      const updated = enquiries.filter((e) => e.id !== item.id);
      setEnquiries(updated);
      toast.success("Enquiry record deleted");
      if (selectedEnquiry?.id === item.id) setSelectedEnquiry(null);
    }
  };

  const columns: Column<EnquiryItem>[] = [
    {
      header: "Customer Detail",
      cell: (row) => (
        <div>
          <div className="font-extrabold text-slate-900 text-xs">{row.name}</div>
          <div className="text-[10px] font-bold text-slate-400">{row.department}</div>
        </div>
      ),
    },
    {
      header: "Contact Details",
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
      header: "Product / Requirement",
      accessorKey: "productOrService",
    },
    {
      header: "Callback Request",
      cell: (row) => (
        row.callback ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Call Back
          </span>
        ) : (
          <span className="text-slate-400 text-[10px]">Email Info</span>
        )
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
            row.status === "New"
              ? "bg-rose-50 text-rose-600 border border-rose-200"
              : row.status === "Contacted"
              ? "bg-amber-50 text-amber-600 border border-amber-200"
              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
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
        title="Enquiries & Quote Submissions"
        description="Review incoming website generator quote requests, callback requests, and sales leads."
      />

      <DataTable
        title="Incoming Sales & Service Leads"
        description={`${enquiries.length} Enquiries captured`}
        data={enquiries}
        columns={columns}
        onEdit={(row) => setSelectedEnquiry(row)}
        onDelete={handleDelete}
      />

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                  {selectedEnquiry.department}
                </span>
                <h3 className="font-black text-xl text-slate-900">{selectedEnquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Email Address</span>
                  <span className="font-extrabold text-slate-900">{selectedEnquiry.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Phone Number</span>
                  <span className="font-extrabold text-slate-900">{selectedEnquiry.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Interested Product / Service</span>
                <div className="p-3 bg-blue-50 text-[#2D6FBA] rounded-xl font-bold border border-blue-100">
                  {selectedEnquiry.productOrService}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1 uppercase text-[10px]">Client Message</span>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 leading-relaxed text-slate-800">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-2 uppercase text-[10px]">Update Lead Status</span>
                <div className="flex gap-2">
                  {(["New", "Contacted", "Closed"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                        selectedEnquiry.status === st
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
                onClick={() => setSelectedEnquiry(null)}
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
