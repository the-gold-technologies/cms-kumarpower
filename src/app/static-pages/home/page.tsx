"use client";

import { PageHeader } from "@/components/PageHeader";
import { HeroSectionCMS } from "./components/HeroSectionCMS";
import { PositioningStatementCMS } from "./components/PositioningStatementCMS";
import { ElectricalEcosystemCMS } from "./components/ElectricalEcosystemCMS";
import { SolutionPortfolioCMS } from "./components/SolutionPortfolioCMS";
import { FeaturedSolutionsCMS } from "./components/FeaturedSolutionsCMS";
import { IndustriesServedCMS } from "./components/IndustriesServedCMS";
import { WhyKumarPowerCMS } from "./components/WhyKumarPowerCMS";
import { NumbersCredibilityCMS } from "./components/NumbersCredibilityCMS";
import { SelectedProjectsCMS } from "./components/SelectedProjectsCMS";
import { PartnerCertificationsCMS } from "./components/PartnerCertificationsCMS";
import { ConsultationFormCMS } from "./components/ConsultationFormCMS";
import { FooterCMS } from "@/components/FooterCMS";

export default function HomeCMSPage() {
  return (
    <section className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Home Page Layout Content"
        description="Manage all layout sections of your homepage (Hero, Positioning Statement, Ecosystem, Solutions, etc.). Expand any section to edit its details."
      />

      <HeroSectionCMS />
      <PositioningStatementCMS />
      <ElectricalEcosystemCMS />
      <SolutionPortfolioCMS />
      <FeaturedSolutionsCMS />
      <IndustriesServedCMS />
      <WhyKumarPowerCMS />
      <NumbersCredibilityCMS />
      <SelectedProjectsCMS />
      <PartnerCertificationsCMS />
      <ConsultationFormCMS />
      <FooterCMS />
    </section>
  );
}
