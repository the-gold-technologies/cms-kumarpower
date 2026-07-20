"use client";

import { PageHeader } from "@/components/PageHeader";
import { AboutHeroSectionCMS } from "./components/AboutHeroSectionCMS";
import { OurStorySectionCMS } from "./components/OurStorySectionCMS";
import { MeetTheTeamSectionCMS } from "./components/MeetTheTeamSectionCMS";
import { QualityCommitmentSectionCMS } from "./components/QualityCommitmentSectionCMS";
import { AboutCTASectionCMS } from "./components/AboutCTASectionCMS";

export default function OurProfileStaticPageCMS() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Our Profile Static Page CMS (/about/OurProfile)"
        description="Manage all sections of the 'Our Profile' page (Hero Intro, Story Timeline, Leadership Team, Quality Commitment & CTA Banner). Expand any section to edit its content."
      />

      <AboutHeroSectionCMS />
      <OurStorySectionCMS />
      <MeetTheTeamSectionCMS />
      <QualityCommitmentSectionCMS />
      <AboutCTASectionCMS />
    </div>
  );
}
