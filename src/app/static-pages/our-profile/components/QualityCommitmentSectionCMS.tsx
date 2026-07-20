"use client";

import { useState } from "react";
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

  const [qualityTitle, setQualityTitle] = useState("Our Commitment to Quality");
  const [policyTitle, setPolicyTitle] = useState("Quality Policy Statement");
  const [policyStatement, setPolicyStatement] = useState(
    "At Kumar Power, we are committed to delivering world-class power products and turnkey solutions that exceed customer expectations. Our robust design, meticulous manufacturing, and comprehensive testing ensure reliability and performance in every installation."
  );
  const [bullet1, setBullet1] = useState("ISO 9001:2015 certified quality management system");
  const [bullet2, setBullet2] = useState("Rigorous testing protocols for all equipment");
  const [bullet3, setBullet3] = useState("Continuous improvement through customer feedback");
  const [bullet4, setBullet4] = useState("Regular training and skill enhancement for our team");
  const [isoCertImg, setIsoCertImg] = useState("");
  const [kirloskarCertImg, setKirloskarCertImg] = useState("");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Quality commitment section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
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
