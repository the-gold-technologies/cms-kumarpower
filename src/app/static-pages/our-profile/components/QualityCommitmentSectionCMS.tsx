"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

export function QualityCommitmentSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [qualityTitle, setQualityTitle] = useState("");
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyStatement, setPolicyStatement] = useState("");
  const [bullet1, setBullet1] = useState("");
  const [bullet2, setBullet2] = useState("");
  const [bullet3, setBullet3] = useState("");
  const [bullet4, setBullet4] = useState("");
  const [isoCertImg, setIsoCertImg] = useState("");
  const [kirloskarCertImg, setKirloskarCertImg] = useState("");

  useEffect(() => {
    fetch("/api/pages/our-profile")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const q = json.data.quality || {};
          if (q.qualityTitle !== undefined) setQualityTitle(q.qualityTitle);
          if (q.policyTitle !== undefined) setPolicyTitle(q.policyTitle);
          if (q.policyStatement !== undefined) setPolicyStatement(q.policyStatement);
          if (q.bullet1 !== undefined) setBullet1(q.bullet1);
          if (q.bullet2 !== undefined) setBullet2(q.bullet2);
          if (q.bullet3 !== undefined) setBullet3(q.bullet3);
          if (q.bullet4 !== undefined) setBullet4(q.bullet4);
          if (q.isoCertImg !== undefined) setIsoCertImg(q.isoCertImg);
          if (q.kirloskarCertImg !== undefined) setKirloskarCertImg(q.kirloskarCertImg);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { qualityTitle, policyTitle, policyStatement, bullet1, bullet2, bullet3, bullet4, isoCertImg, kirloskarCertImg };
      const res = await fetch("/api/pages/our-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "quality", content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Quality commitment section saved!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="4. Commitment to Quality & Certificates Section"
        description="Manage Quality Policy statement, bullet points & certificate images (ISO 9001:2015 and Kirloskar Authorized)."
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-6 pt-1">
          <InputField
            label="Section Main Title"
            value={qualityTitle}
            onChange={(e) => setQualityTitle(e.target.value)}
          />

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <InputField
              label="Policy Statement Title"
              value={policyTitle}
              onChange={(e) => setPolicyTitle(e.target.value)}
            />
            <TextAreaField
              label="Policy Statement Copy"
              value={policyStatement}
              onChange={(e) => setPolicyStatement(e.target.value)}
              rows={3}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Bullet Point 1"
                value={bullet1}
                onChange={(e) => setBullet1(e.target.value)}
              />
              <InputField
                label="Bullet Point 2"
                value={bullet2}
                onChange={(e) => setBullet2(e.target.value)}
              />
              <InputField
                label="Bullet Point 3"
                value={bullet3}
                onChange={(e) => setBullet3(e.target.value)}
              />
              <InputField
                label="Bullet Point 4"
                value={bullet4}
                onChange={(e) => setBullet4(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <ImageUploadField
                label="ISO 9001:2015 Certificate Image"
                value={isoCertImg}
                onChange={(val) => setIsoCertImg(val)}
              />
              <ImageUploadField
                label="Kirloskar Authorized Certificate Image"
                value={kirloskarCertImg}
                onChange={(val) => setKirloskarCertImg(val)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
