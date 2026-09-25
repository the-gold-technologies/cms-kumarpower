"use client";

import { PageHeader } from "@/components/PageHeader";
import { ContactHeroSectionCMS } from "./components/ContactHeroSectionCMS";
import { ContactInfoSectionCMS } from "./components/ContactInfoSectionCMS";
import { ContactResumeSectionCMS } from "./components/ContactResumeSectionCMS";
import { ContactMapSectionCMS } from "./components/ContactMapSectionCMS";

export default function ContactCMSPage() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Contact Us Static Page CMS (/contact)"
        description="Manage all sections of the Contact Us page (Hero Banner, Contact Info Cards, Resume Drop & Perks, and Office Location Map). Expand any section to edit its content."
      />

      <ContactHeroSectionCMS />
      <ContactInfoSectionCMS />
      <ContactResumeSectionCMS />
      <ContactMapSectionCMS />
    </div>
  );
}
