"use client";

import Link from "next/link";
import { Inbox, PhoneCall, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useCMSStore } from "@/lib/cms-store";
import toast from "react-hot-toast";

export function RecentEnquiries() {
  const { enquiries, saveEnquiries } = useCMSStore();

  const handleStatusToggle = (id: string) => {
    const updated = enquiries.map((item) => {
      if (item.id === id) {
        const nextStatus =
          item.status === "New"
            ? "Contacted"
            : item.status === "Contacted"
            ? "Closed"
            : "New";
        return { ...item, status: nextStatus as any };
      }
      return item;
    });
    saveEnquiries(updated);
    toast.success("Lead status updated!");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#2D6FBA]" />
            <h3 className="font-extrabold text-lg text-slate-900">Recent Customer Enquiries</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Incoming quote requests & service calls submitted via website
          </p>
        </div>
        <Link
          href="/submissions/enquiries"
          className="text-xs font-extrabold text-[#2D6FBA] hover:underline flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full"
        >
          View All ({enquiries.length}) <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider">
              <th className="py-3 px-4">Client Name</th>
              <th className="py-3 px-4">Contact Info</th>
              <th className="py-3 px-4">Product / Interest</th>
              <th className="py-3 px-4">Callback</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {enquiries.slice(0, 5).map((enq) => (
              <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {enq.name}
                  <div className="text-[10px] text-slate-400 font-normal">{enq.department}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <Mail className="w-3 h-3 text-slate-400" /> {enq.email}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <PhoneCall className="w-3 h-3 text-slate-400" /> {enq.phone}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-800 font-semibold">
                  {enq.productOrService}
                </td>
                <td className="py-3.5 px-4">
                  {enq.callback ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> Requested
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[10px]">Email Only</span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      enq.status === "New"
                        ? "bg-rose-50 text-rose-600 border border-rose-200"
                        : enq.status === "Contacted"
                        ? "bg-amber-50 text-amber-600 border border-amber-200"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    }`}
                  >
                    {enq.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleStatusToggle(enq.id)}
                    className="text-[11px] font-bold text-[#2D6FBA] hover:bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 cursor-pointer transition-colors"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
