"use client";

import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminRightSidebar } from "@/components/AdminRightSidebar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <html lang="en">
        <body className="antialiased bg-[#0B0F29]">
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="antialiased bg-[#f8f9fa] text-slate-900 min-h-screen">
        <div className="flex h-screen overflow-hidden p-2 gap-2">
          {/* Left Navigation Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar px-12 py-10 gap-6 bg-[#f8f9fa]">
            {pathname === "/" && <AdminHeader />}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
              {/* Left Column (8 cols on dashboard, 12 cols on inner pages) */}
              <div className={pathname === "/" ? "lg:col-span-8 flex flex-col gap-6" : "lg:col-span-12 flex flex-col gap-6"}>
                {children}
              </div>

              {/* Right Column (4 cols on dashboard, hidden/optional on full-width inner pages) */}
              {pathname === "/" && (
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <AdminRightSidebar />
                </div>
              )}
            </div>
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "1rem",
              background: "#0B0F29",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "600",
            },
          }}
        />
      </body>
    </html>
  );
}
