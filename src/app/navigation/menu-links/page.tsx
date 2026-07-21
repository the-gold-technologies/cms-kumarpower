"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useCMSStore } from "@/lib/cms-store";
import { NavLink } from "@/lib/types";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function MenuLinksCMSPage() {
  const { navLinks } = useCMSStore();
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({
    "About Us": true,
    "Products": true,
  });

  const toggleParent = (label: string) => {
    setExpandedParents((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Root links (parent === "-")
  const rootLinks = navLinks
    .filter((l) => !l.parent || l.parent === "-")
    .sort((a, b) => a.order - b.order);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Navigation Links"
        description="Manage the links that appear in the main website navigation bar."
      />

      <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-xs ring-1 ring-gray-100/50">
        <div className="overflow-x-auto p-4">
          <table className="min-w-full divide-y divide-gray-100/50">
            <thead>
              <tr>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[80px]">
                  ORDER
                </th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  LABEL / TITLE
                </th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[140px]">
                  TYPE
                </th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rootLinks.map((root) => {
                const children = navLinks
                  .filter((l) => l.parent === root.id)
                  .sort((a, b) => a.order - b.order);
                const isExpanded = expandedParents[root.label];
                const hasChildren = children.length > 0;
                const linkType = root.type || (hasChildren ? "Dropdown" : "Main Link");

                return (
                  <React.Fragment key={root.id}>
                    <tr className="hover:bg-[#fafafb] transition-colors group">
                      <td className="px-6 py-5 text-sm font-medium text-gray-500">
                        {root.order}
                      </td>
                      <td className="px-6 py-5">
                        <div
                          className={`flex items-center gap-2.5 ${
                            hasChildren ? "cursor-pointer select-none" : ""
                          }`}
                          onClick={() => hasChildren && toggleParent(root.label)}
                        >
                          {hasChildren ? (
                            isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-[#2D6FBA] shrink-0" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                            )
                          ) : (
                            <div className="w-4 h-4 shrink-0" />
                          )}
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0B0F29] text-[15px]">
                              {root.label}
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-gray-50 text-[9px] font-bold text-gray-400 uppercase border border-gray-100">
                              STATIC
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                            linkType === "Main Link"
                              ? "bg-blue-50 text-[#2D6FBA]"
                              : linkType === "Dropdown"
                              ? "bg-[#2D6FBA]/10 text-[#2D6FBA]"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {linkType === "Main Link" ? "MAIN LINK" : linkType === "Dropdown" ? "DROPDOWN" : "SUB LINK"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-mono text-gray-400">
                        {root.url}
                      </td>
                    </tr>

                    {isExpanded &&
                      children.map((child) => (
                        <tr
                          key={child.id}
                          className="bg-[#fcfdff]/50 hover:bg-[#f5f8ff] transition-colors group"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-400 pl-12">
                            {child.order}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3 pl-6 border-l-2 border-gray-100">
                              <span className="text-gray-300 text-lg">↳</span>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700 group-hover:text-[#0B0F29] transition-colors text-[14px]">
                                  {child.label}
                                </span>
                                <span className="px-1.5 py-0.5 rounded-md bg-gray-50 text-[9px] font-bold text-gray-400 uppercase border border-gray-100">
                                  STATIC
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-gray-50 text-gray-400 border border-gray-100 whitespace-nowrap">
                              SUB LINK
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-mono text-gray-400">
                            {child.url}
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
