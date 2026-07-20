"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { SaveButton } from "@/components/SaveButton";
import { ImagePickerField } from "@/components/ImagePickerField";
import toast from "react-hot-toast";

export default function CertificationsCMSPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [certs, setCerts] = useState([
    {
      title: "ISO 9001:2015 Quality Management System",
      issuer: "International Standards Organization",
      validity: "Valid through 2028",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "CPCB IV+ Emission Compliance Certificate",
      issuer: "Central Pollution Control Board India",
      validity: "Mandatory CPCB IV+ Norms",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "KOEL Authorized Dealer Certificate",
      issuer: "Kirloskar Oil Engines Limited",
      validity: "Authorized Channel Partner",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    },
  ]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Certifications page saved!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Certifications & Compliance CMS"
        description="Manage ISO 9001:2015, CPCB IV+ emission compliance, and Kirloskar authorized dealer credentials."
        action={
          <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
        }
      />

      <div className="space-y-4">
        {certs.map((c, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#2D6FBA]">Certificate {idx + 1}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Certificate Name"
                value={c.title}
                onChange={(e) => {
                  const copy = [...certs];
                  copy[idx].title = e.target.value;
                  setCerts(copy);
                }}
              />
              <InputField
                label="Issuing Authority"
                value={c.issuer}
                onChange={(e) => {
                  const copy = [...certs];
                  copy[idx].issuer = e.target.value;
                  setCerts(copy);
                }}
              />
            </div>
            <ImagePickerField
              label="Certificate Document Image"
              value={c.image}
              onChange={(val) => {
                const copy = [...certs];
                copy[idx].image = val;
                setCerts(copy);
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}
