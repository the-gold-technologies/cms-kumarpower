"use client";

import { PageHeader } from "@/components/PageHeader";
import { HeroSectionCMS } from "./components/HeroSectionCMS";
import { AboutSectionCMS } from "./components/AboutSectionCMS";
import { GeneratorRangeSectionCMS } from "./components/GeneratorRangeSectionCMS";
import { CTASectionCMS } from "./components/CTASectionCMS";
import { PowerSolutionsSectionCMS } from "./components/PowerSolutionsSectionCMS";
import { UseCasesSectionCMS } from "./components/UseCasesSectionCMS";
import { GallerySectionCMS } from "./components/GallerySectionCMS";
import { TestimonialsSectionCMS } from "./components/TestimonialsSectionCMS";
import { FooterCMS } from "@/components/FooterCMS";

export default function HomeCMSPage() {
  return (
    <section className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Home Page Layout Content"
        description="Manage all layout sections of your homepage (Hero, About, Generator Range, Power Solutions, Use Cases, Gallery, Testimonials & Footer). Expand any section to edit its details."
      />

      <HeroSectionCMS />
      <AboutSectionCMS />
      <GeneratorRangeSectionCMS />
      <CTASectionCMS />
      <PowerSolutionsSectionCMS />
      <UseCasesSectionCMS />
      <GallerySectionCMS />
      <TestimonialsSectionCMS />
      <FooterCMS />
    </section>
  );
}
