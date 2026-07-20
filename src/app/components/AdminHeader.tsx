"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, LayoutDashboard, Package, BookOpen, Inbox, Globe, Settings, FileText } from "lucide-react";

const SEARCH_ITEMS = [
  { title: "Dashboard Overview", category: "General", url: "/", icon: LayoutDashboard },
  { title: "Products Catalogue", category: "Sub-Services", url: "/products", icon: Package },
  { title: "Services Management", category: "Sub-Services", url: "/services", icon: Settings },
  { title: "Generator Rentals Fleet", category: "Sub-Services", url: "/rentals", icon: Package },
  { title: "Blog Posts & News", category: "Sub-Services", url: "/blog", icon: FileText },
  { title: "Home Page CMS", category: "Pages", url: "/static-pages/home", icon: BookOpen },
  { title: "About Us CMS", category: "Pages", url: "/static-pages/about", icon: BookOpen },
  { title: "Certifications CMS", category: "Pages", url: "/static-pages/certifications", icon: BookOpen },
  { title: "Client Logos CMS", category: "Pages", url: "/static-pages/clients", icon: BookOpen },
  { title: "Contact Page CMS", category: "Pages", url: "/static-pages/contact", icon: BookOpen },
  { title: "Enquiries Submissions", category: "Submissions", url: "/submissions/enquiries", icon: Inbox },
  { title: "Resumes Submissions", category: "Submissions", url: "/submissions/resumes", icon: Inbox },
  { title: "Global SEO & Sitemap", category: "SEO Management", url: "/seo/global", icon: Globe },
  { title: "Admin Profile Settings", category: "Settings", url: "/settings/profile", icon: Settings },
];

export function AdminHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = searchQuery.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <section className="flex flex-col gap-6 w-full">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#0B0F29] tracking-tight flex items-center gap-2">
          Welcome back <span className="text-[#2D6FBA]">Admin</span> 👋
        </h1>

        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=d9f969"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </header>

      <div className="flex justify-between items-center relative">
        <div className="relative group w-[350px]" ref={searchRef}>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0B0F29] transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search CMS pages & settings..."
            className="pl-10 pr-10 py-3.5 bg-white border-0 ring-1 ring-gray-100 w-full rounded-full text-sm font-medium focus:ring-2 focus:ring-[#2D6FBA] focus:outline-none shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setIsOpen(false);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Results Dropdown */}
          {isOpen && searchQuery && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-3xl shadow-xl ring-1 ring-black/5 overflow-hidden z-50 py-2 max-h-[300px] overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-5 py-4 text-xs font-semibold text-gray-400 text-center italic">
                  No matching CMS items found
                </div>
              ) : (
                <div className="flex flex-col">
                  {results.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        router.push(item.url);
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition-colors w-full"
                    >
                      <div className="p-2 rounded-xl bg-pink-50 text-[#2D6FBA]">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-800">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {item.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
