"use client";

import Link from "next/link";
import { BookOpen, MessageSquare, Star } from "lucide-react";
import { useCMSStore } from "@/lib/cms-store";

export function OverviewStats() {
  const { enquiries } = useCMSStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-[#0B0F29]">Overview Stats</h3>
        <Link
          href="/seo/pages"
          className="text-xs font-bold text-gray-400 hover:text-black transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stat Card 1: Active Pages */}
        <div className="bg-white rounded-3xl p-5 shadow-xs ring-1 ring-gray-100/80 hover:-translate-y-0.5 transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-[#0B0F29] text-[15px]">
                Active Pages
              </h3>
              <p className="text-[13px] font-medium text-gray-400 mt-0.5">
                15 Published
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                STATUS
              </p>
              <p className="text-[13px] font-bold text-[#0B0F29]">Online</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                CMS ACCESS
              </p>
              <p className="text-[13px] font-bold text-[#0B0F29]">Editable</p>
            </div>
          </div>
        </div>

        {/* Stat Card 2: Enquiries */}
        <div className="bg-white rounded-3xl p-5 shadow-xs ring-1 ring-gray-100/80 hover:-translate-y-0.5 transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-[#d1fadf] text-[#12b76a] flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-[#0B0F29] text-[15px]">
                Enquiries
              </h3>
              <p className="text-[13px] font-medium text-gray-400 mt-0.5">
                {enquiries.length} Submissions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                RESPONSE
              </p>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-[13px] font-bold text-[#0B0F29]">
                  In Scope
                </span>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                SOURCE
              </p>
              <p className="text-[13px] font-bold text-[#0B0F29]">Organic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
