"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { NavLink } from "@/lib/types";
import { ChevronDown, ChevronRight, CheckCircle, Globe, Layers } from "lucide-react";

export default function MenuLinksCMSPage() {
  const [links, setLinks] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadNavLinks() {
      try {
        const res = await fetch("/api/nav-links");
        const json = await res.json();
        if (json.success && json.data) {
          setLinks(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch navigation links from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNavLinks();
  }, []);

  const toggleParent = (label: string) => {
    setExpandedParents((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Root links (parent === "-")
  const rootLinks = links
    .filter((l) => !l.parent || l.parent === "-")
    .sort((a, b) => a.order - b.order);

  return (
    <section className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Navigation Links Overview"
        description="Comprehensive read-only display of all active navigation bar and sub-page links rendered on the Kumarpower website."
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
                  INTERNAL URL / ROUTE PATH
                </th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[100px]">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm font-semibold text-gray-400">
                    Loading navigation links from database...
                  </td>
                </tr>
              ) : rootLinks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm font-semibold text-gray-400">
                    No navigation links found in database.
                  </td>
                </tr>
              ) : (
                rootLinks.map((root) => {
                  const children = links
                    .filter((l) => l.parent === root.id)
                    .sort((a, b) => a.order - b.order);
                  const isExpanded = !!expandedParents[root.label];
                  const hasChildren = children.length > 0;
                  const linkType = root.type || (hasChildren ? "Dropdown" : "Main Link");

                  return (
                    <React.Fragment key={root.id}>
                      <tr className="hover:bg-[#fafafb] transition-colors group">
                        <td className="px-6 py-5 text-sm font-bold text-gray-500">
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
                              <span className="font-extrabold text-[#0B0F29] text-[15px]">
                                {root.label}
                              </span>
                              {hasChildren && (
                                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-[10px] font-bold text-purple-600 border border-purple-100">
                                  {children.length} sub-links
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                              linkType === "Main Link"
                                ? "bg-blue-50 text-[#2D6FBA]"
                                : linkType === "Dropdown"
                                ? "bg-purple-50 text-purple-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {linkType === "Main Link" ? "MAIN LINK" : linkType === "Dropdown" ? "DROPDOWN" : "SUB LINK"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-xs font-mono text-gray-600 font-medium">
                          {root.url}
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Active
                          </span>
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
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-gray-50 text-gray-400 border border-gray-100 whitespace-nowrap">
                                SUB LINK
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs font-mono text-gray-500 font-medium">
                              {child.url}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
