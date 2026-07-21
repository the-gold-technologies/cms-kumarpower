"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import toast from "react-hot-toast";

interface QualityCommitmentSectionCMSProps {
  saveUrl?: string;
  responseKey?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function QualityCommitmentSectionCMS({
  saveUrl = "/api/our-profile",
  responseKey = "quality",
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: QualityCommitmentSectionCMSProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: any) => {
    if (controlledOnToggle) controlledOnToggle();
    else setInternalIsOpen(typeof val === "function" ? val(internalIsOpen) : val);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [qualityTitle, setQualityTitle] = useState("");
  const [cards, setCards] = useState<Array<{ id: string; title: string; description: string }>>([
    { id: "card-1", title: "Timely Delivery", description: "We understand the critical nature of power solutions and ensure on-time delivery and installation." },
    { id: "card-2", title: "Expert Engineering", description: "Our team of qualified engineers ensures robust design and flawless implementation of all projects." },
    { id: "card-3", title: "Business Continuity", description: "Our solutions are designed to provide uninterrupted power supply, ensuring your operations never stop." }
  ]);
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyStatement, setPolicyStatement] = useState("");
  const [bullet1, setBullet1] = useState("");
  const [bullet2, setBullet2] = useState("");
  const [bullet3, setBullet3] = useState("");
  const [bullet4, setBullet4] = useState("");
  const [isoCertImg, setIsoCertImg] = useState("");
  const [kirloskarCertImg, setKirloskarCertImg] = useState("");

  useEffect(() => {
    fetchWithCache(saveUrl)
      .then((json) => {
        if (json.success && json.data) {
          const q = responseKey ? json.data?.[responseKey] : json.data;
          if (q) {
            if (q.qualityTitle !== undefined) setQualityTitle(q.qualityTitle);
            if (Array.isArray(q.cards) && q.cards.length > 0) setCards(q.cards);
            if (q.policyTitle !== undefined) setPolicyTitle(q.policyTitle);
            if (q.policyStatement !== undefined) setPolicyStatement(q.policyStatement);
            if (q.bullet1 !== undefined) setBullet1(q.bullet1);
            if (q.bullet2 !== undefined) setBullet2(q.bullet2);
            if (q.bullet3 !== undefined) setBullet3(q.bullet3);
            if (q.bullet4 !== undefined) setBullet4(q.bullet4);
            if (q.isoCertImg !== undefined) setIsoCertImg(q.isoCertImg);
            if (q.kirloskarCertImg !== undefined) setKirloskarCertImg(q.kirloskarCertImg);
          }
        }
      })
      .catch(console.error);
  }, [saveUrl, responseKey]);

  const updateCard = (index: number, field: "title" | "description", value: string) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    setCards(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { qualityTitle, cards, policyTitle, policyStatement, bullet1, bullet2, bullet3, bullet4, isoCertImg, kirloskarCertImg };
      const res = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: responseKey, content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      clearCache(saveUrl);
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
        description="Manage Quality Policy statement, Commitment Cards, bullet points & certificate images."
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
            <h4 className="font-semibold text-slate-800 text-sm">Quality Commitment Cards (3 Pillars)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map((card, idx) => (
                <div key={card.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <InputField
                    label={`Card ${idx + 1} Title`}
                    value={card.title}
                    onChange={(e) => updateCard(idx, "title", e.target.value)}
                  />
                  <TextAreaField
                    label={`Card ${idx + 1} Description`}
                    value={card.description}
                    onChange={(e) => updateCard(idx, "description", e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>

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
