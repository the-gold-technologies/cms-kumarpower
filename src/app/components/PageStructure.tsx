"use client";

import Link from "next/link";
import { ArrowRight, Layout, BadgeCheck, ShieldAlert, Eye } from "lucide-react";

interface PageListItem {
  id: string;
  title: string;
  type: string;
  slug: string;
  visibility: "public" | "draft";
  sectionsCount: number;
}

const PAGES_LIST: PageListItem[] = [
  {
    id: "p1",
    title: "Home",
    type: "STANDARD",
    slug: "",
    visibility: "public",
    sectionsCount: 8,
  },
  {
    id: "p2",
    title: "Our Story",
    type: "ABOUT",
    slug: "about/OurProfile",
    visibility: "public",
    sectionsCount: 6,
  },
  {
    id: "p3",
    title: "Testimonials",
    type: "ABOUT",
    slug: "about/Testimonials",
    visibility: "public",
    sectionsCount: 5,
  },
  {
    id: "p4",
    title: "Photo Gallery",
    type: "GALLERY",
    slug: "about/PhotoGallery",
    visibility: "public",
    sectionsCount: 4,
  },
  {
    id: "p5",
    title: "Certifications",
    type: "COMPLIANCE",
    slug: "about/Certifications",
    visibility: "public",
    sectionsCount: 5,
  },
  {
    id: "p6",
    title: "Our Clients",
    type: "PORTFOLIO",
    slug: "about/OurClients",
    visibility: "public",
    sectionsCount: 4,
  },
  {
    id: "p7",
    title: "Products",
    type: "CATALOG",
    slug: "products",
    visibility: "public",
    sectionsCount: 7,
  },
  {
    id: "p8",
    title: "Kirloskar Diesel Generator",
    type: "PRODUCT",
    slug: "products/kirloskar-diesel-generator",
    visibility: "public",
    sectionsCount: 6,
  },
  {
    id: "p9",
    title: "Kirloskar Gas Generator",
    type: "PRODUCT",
    slug: "products/kirloskar-gas-generator",
    visibility: "public",
    sectionsCount: 5,
  },
  {
    id: "p10",
    title: "Kirloskar Portable Generator",
    type: "PRODUCT",
    slug: "products/kirloskar-portable-generator",
    visibility: "public",
    sectionsCount: 4,
  },
  {
    id: "p11",
    title: "Panels",
    type: "PRODUCT",
    slug: "products/panels",
    visibility: "public",
    sectionsCount: 4,
  },
  {
    id: "p12",
    title: "Optiprime",
    type: "PRODUCT",
    slug: "products/optiprime",
    visibility: "public",
    sectionsCount: 4,
  },
  {
    id: "p13",
    title: "Servo Stabilizer",
    type: "PRODUCT",
    slug: "products/servo-stabilizer",
    visibility: "public",
    sectionsCount: 4,
  },
  {
    id: "p14",
    title: "Transformers",
    type: "PRODUCT",
    slug: "products/transformers",
    visibility: "public",
    sectionsCount: 4,
  },
  {
    id: "p15",
    title: "Installation",
    type: "SERVICE",
    slug: "installation",
    visibility: "public",
    sectionsCount: 5,
  },
  {
    id: "p16",
    title: "Contact",
    type: "STANDARD",
    slug: "contact",
    visibility: "public",
    sectionsCount: 3,
  },
  {
    id: "p17",
    title: "Blog",
    type: "ARTICLE",
    slug: "blogs",
    visibility: "public",
    sectionsCount: 6,
  },
];

export function PageStructure() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xs ring-1 ring-gray-100/80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg text-[#0B0F29]">Kumar Power Website Pages</h3>
          <p className="text-xs font-medium text-gray-400 mt-0.5">
            Overview of static pages, layout layouts, and section configurations.
          </p>
        </div>
        <Link
          href="/seo/pages"
          className="text-xs font-bold text-[#2D6FBA] hover:text-black flex items-center gap-1 bg-pink-50/50 px-3 py-1.5 rounded-xl transition-all"
        >
          Manage SEO <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 pb-2">
              <th className="pb-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">PAGE NAME</th>
              <th className="pb-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">ROUTE PATH</th>
              <th className="pb-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">STATUS</th>
              <th className="pb-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">SECTIONS COUNT</th>
              <th className="pb-3 font-bold text-gray-400 uppercase tracking-widest text-[10px] text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PAGES_LIST.map((page) => {
              const isPublic = page.visibility === "public";
              const editorUrl = page.slug === "" ? "/static-pages/home" : `/static-pages/${page.slug.split("/").pop()}`;

              return (
                <tr key={page.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-3.5">
                    <Link href={editorUrl} className="flex items-center gap-3 group">
                      <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#2D6FBA]/10 group-hover:text-[#2D6FBA] transition-colors">
                        <Layout className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-[#2D6FBA] transition-colors text-[13px]">
                          {page.title}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                          {page.type} PAGE
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3.5 font-mono text-xs text-gray-500">
                    /{page.slug}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isPublic
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {isPublic ? (
                        <>
                          <BadgeCheck className="w-3 h-3" />
                          PUBLIC
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-3 h-3" />
                          DRAFT
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 font-bold text-gray-800 text-[13px]">
                    {page.sectionsCount} content block{page.sectionsCount === 1 ? "" : "s"}
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={editorUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-black font-semibold text-[11px] transition-all"
                    >
                      <Eye className="w-3 h-3 text-gray-400" />
                      Edit Layout
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
