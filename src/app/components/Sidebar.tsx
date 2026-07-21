"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Compass,
  BookOpen,
  Package,
  Wrench,
  LucideIcon,
  ChevronDown,
  LogOut,
  Globe,
  Inbox,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarLink = {
  title: string;
  icon: LucideIcon;
  href?: string;
  sublinks?: { title: string; href: string }[];
  badge?: string | number;
};

const sidebarLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "NAVIGATION & LINKS",
    icon: Compass,
    sublinks: [
      { title: "Menu Links", href: "/navigation/menu-links" },
      { title: "Social Media", href: "/navigation/social-media" },
    ],
  },
  {
    title: "STATIC PAGES",
    icon: BookOpen,
    sublinks: [
      { title: "Home", href: "/static-pages/home" },
      { title: "Our Profile", href: "/static-pages/our-profile" },
      { title: "Testimonials", href: "/static-pages/testimonials" },
      { title: "Our Clients", href: "/static-pages/our-clients" },
      { title: "Photo Gallery", href: "/static-pages/photo-gallery" },
      { title: "Certifications", href: "/static-pages/certifications" },
      { title: "Products Overview", href: "/static-pages/products" },
      { title: "Services Overview", href: "/static-pages/services" },
      { title: "Blogs Overview", href: "/static-pages/blog" },
      { title: "Contact Us", href: "/static-pages/contact" },
    ],
  },
  {
    title: "PRODUCT DROPDOWN PAGES",
    icon: Package,
    sublinks: [
      { title: "Kirloskar Diesel Generator", href: "/static-pages/products/kirloskar-diesel-generator" },
      { title: "Kirloskar Gas Generator", href: "/static-pages/products/kirloskar-gas-generator" },
      { title: "Kirloskar Portable Generator", href: "/static-pages/products/kirloskar-portable-generator" },
      { title: "Optiprime Generator", href: "/static-pages/products/optiprime" },
      { title: "Electrical Panels", href: "/static-pages/products/panels" },
      { title: "Servo Stabilizers", href: "/static-pages/products/servo-stabilizer" },
      { title: "Transformers", href: "/static-pages/products/transformers" },
    ],
  },
  {
    title: "SERVICE DROPDOWN PAGES",
    icon: Wrench,
    sublinks: [
      { title: "Annual Maintenance (AMC)", href: "/static-pages/services/annual-maintenance" },
      { title: "Turnkey SITC Installation", href: "/static-pages/services/installation" },
      { title: "Engine Repair & Overhaul", href: "/static-pages/services/repair-overhaul" },
      { title: "24/7 Emergency Support", href: "/static-pages/services/emergency-support" },
    ],
  },
  {
    title: "SEO MANAGEMENT",
    icon: Globe,
    sublinks: [
      { title: "Global Settings", href: "/seo/global" },
      { title: "Page Settings", href: "/seo/pages" },
      { title: "Sitemap & Robots", href: "/seo/sitemap-robots" },
    ],
  },
  {
    title: "SUBMISSIONS & LEADS",
    icon: Inbox,
    sublinks: [
      { title: "Leads & Enquiries", href: "/submissions/enquiries" },
    ],
  },
  {
    title: "SETTINGS",
    icon: Settings,
    sublinks: [{ title: "Profile", href: "/settings/profile" }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    return sidebarLinks
      .filter((item) =>
        item.sublinks?.some((sublink) => pathname === sublink.href || pathname.startsWith(sublink.href))
      )
      .map((item) => item.title);
  });

  useEffect(() => {
    const activeGroups = sidebarLinks
      .filter((item) =>
        item.sublinks?.some((sublink) => pathname === sublink.href || pathname.startsWith(sublink.href))
      )
      .map((item) => item.title);

    setOpenGroups((prev) => {
      const newGroups = [...prev];
      activeGroups.forEach((group) => {
        if (!newGroups.includes(group)) {
          newGroups.push(group);
        }
      });
      return newGroups;
    });
  }, [pathname]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="flex h-full w-[280px] flex-col bg-[#0a192f] text-white overflow-hidden rounded-l-[2.5rem] border-l border-white/5 shrink-0 shadow-2xl">
      {/* Logo Area */}
      <div className="flex h-24 items-center px-8">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#0a192f] font-black italic shadow-md text-lg">
            K
          </div>
          <span className="font-bold text-lg tracking-tight">
            Kumar Power <span className="text-[#2D6FBA] font-semibold">CMS</span>
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <nav className="space-y-1.5 px-6">
          {sidebarLinks.map((item, index) => {
            const isActive = pathname === item.href;
            const isOpen = openGroups.includes(item.title);

            if (item.sublinks) {
              return (
                <div key={index} className="pt-4 first:pt-0">
                  <div
                    className="flex items-center justify-between cursor-pointer group mb-2 pr-4 pl-4"
                    onClick={() => toggleGroup(item.title)}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                      <item.icon className="w-3.5 h-3.5" />
                      {item.title}
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 text-gray-500 transition-transform duration-200 group-hover:text-gray-300",
                        isOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                  {isOpen && (
                    <div className="space-y-1 pl-4 ml-2 border-l border-gray-800 py-1">
                      {item.sublinks.map((sublink, subIndex) => {
                        const isSubActive = pathname === sublink.href;
                        return (
                          <Link
                            key={subIndex}
                            href={sublink.href}
                            className={cn(
                              "block px-4 py-2.5 rounded-2xl text-[13px] font-medium transition-all duration-200",
                              isSubActive
                                ? "bg-[#2D6FBA] text-white shadow-sm shadow-[#2D6FBA]/20 transform scale-[1.02]"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            {sublink.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={item.href!}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-2xl text-[14px] font-medium transition-all duration-200 mt-2",
                  isActive
                    ? "bg-[#2D6FBA] text-white shadow-sm shadow-[#2D6FBA]/20 transform scale-[1.02]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-white" : "text-gray-400"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {item.title}
                </div>
                {item.badge && (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#2D6FBA]/80 text-white text-[10px] font-bold">
                    {item.badge}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-6 pb-8 border-t border-gray-800 pt-6">
        <Link
          href="/login"
          className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl text-[14px] font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Link>
      </div>
    </div>
  );
}
