"use client";

import { OverviewStats } from "@/components/OverviewStats";
import { PageStructure } from "@/components/PageStructure";
import { RecentEnquiries } from "@/components/RecentEnquiries";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Overview Stats (Active Pages & Enquiries) */}
      <OverviewStats />

      {/* Website Pages Structure Table */}
      <PageStructure />

      {/* Recent Enquiries Table */}
      <RecentEnquiries />
    </div>
  );
}
