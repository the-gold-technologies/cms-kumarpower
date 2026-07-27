"use client";

import { useState, useEffect } from "react";
import { fetchWithCache, clearCache } from "@/lib/apiCache";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { uploadFilesDeep } from "@/lib/uploadHelpers";

type CertificateItem = {
  id: string;
  name: string;
  year: string;
  description: string;
  issuer: string;
  image: string | File;
};

export default function CertificationsCMSPage() {
  // Section Open states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isCertsOpen, setIsCertsOpen] = useState(false);
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [isCommitOpen, setIsCommitOpen] = useState(false);

  // Section saving states
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingCerts, setSavingCerts] = useState(false);
  const [savedCerts, setSavedCerts] = useState(false);

  const [savingWhy, setSavingWhy] = useState(false);
  const [savedWhy, setSavedWhy] = useState(false);

  const [savingCommit, setSavingCommit] = useState(false);
  const [savedCommit, setSavedCommit] = useState(false);

  // Hero Section
  const [heroTitle, setHeroTitle] = useState("");
  const [heroTitlePart1, setHeroTitlePart1] = useState("");
  const [heroTitlePart2, setHeroTitlePart2] = useState("");
  const [heroSub, setHeroSub] = useState("");

  // Certificate List
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  // Why Certifications Matter Section
  const [whySectionTitle, setWhySectionTitle] = useState("");
  const [whyTitlePart1, setWhyTitlePart1] = useState("");
  const [whyTitlePart2, setWhyTitlePart2] = useState("");
  const [whyCard1Title, setWhyCard1Title] = useState("");
  const [whyCard1Desc, setWhyCard1Desc] = useState("");
  const [whyCard2Title, setWhyCard2Title] = useState("");
  const [whyCard2Desc, setWhyCard2Desc] = useState("");
  const [whyCard3Title, setWhyCard3Title] = useState("");
  const [whyCard3Desc, setWhyCard3Desc] = useState("");

  // Commitment Banner
  const [commitTitle, setCommitTitle] = useState("");
  const [commitTitlePart1, setCommitTitlePart1] = useState("");
  const [commitTitlePart2, setCommitTitlePart2] = useState("");
  const [commitText, setCommitText] = useState("");
  const [btn1Label, setBtn1Label] = useState("");
  const [btn1Url, setBtn1Url] = useState("");
  const [btn2Label, setBtn2Label] = useState("");
  const [btn2Url, setBtn2Url] = useState("");

  useEffect(() => {
    fetchWithCache("/api/certifications")
      .then((json) => {
        if (json.success && json.data) {
          const certs = json.data.certifications || json.data["certifications"] || json.data;
          if (certs.heroTitlePart1 !== undefined) setHeroTitlePart1(certs.heroTitlePart1);
          if (certs.heroTitlePart2 !== undefined) setHeroTitlePart2(certs.heroTitlePart2);
          if (certs.heroTitle !== undefined) setHeroTitle(certs.heroTitle);
          if (certs.heroSub !== undefined) setHeroSub(certs.heroSub);
          if (Array.isArray(certs.certificates)) setCertificates(certs.certificates);
          if (certs.whyTitlePart1 !== undefined) setWhyTitlePart1(certs.whyTitlePart1);
          if (certs.whyTitlePart2 !== undefined) setWhyTitlePart2(certs.whyTitlePart2);
          if (certs.whySectionTitle !== undefined) setWhySectionTitle(certs.whySectionTitle);
          if (certs.whyCard1Title !== undefined) setWhyCard1Title(certs.whyCard1Title);
          if (certs.whyCard1Desc !== undefined) setWhyCard1Desc(certs.whyCard1Desc);
          if (certs.whyCard2Title !== undefined) setWhyCard2Title(certs.whyCard2Title);
          if (certs.whyCard2Desc !== undefined) setWhyCard2Desc(certs.whyCard2Desc);
          if (certs.whyCard3Title !== undefined) setWhyCard3Title(certs.whyCard3Title);
          if (certs.whyCard3Desc !== undefined) setWhyCard3Desc(certs.whyCard3Desc);
          if (certs.commitTitlePart1 !== undefined) setCommitTitlePart1(certs.commitTitlePart1);
          if (certs.commitTitlePart2 !== undefined) setCommitTitlePart2(certs.commitTitlePart2);
          if (certs.commitTitle !== undefined) setCommitTitle(certs.commitTitle);
          if (certs.commitText !== undefined) setCommitText(certs.commitText);
          if (certs.btn1Label !== undefined) setBtn1Label(certs.btn1Label);
          if (certs.btn1Url !== undefined) setBtn1Url(certs.btn1Url);
          if (certs.btn2Label !== undefined) setBtn2Label(certs.btn2Label);
          if (certs.btn2Url !== undefined) setBtn2Url(certs.btn2Url);
        }
      })
      .catch(console.error);
  }, []);

  const saveAllToDB = async () => {
    const rawPayload = {
      heroTitle: `${heroTitlePart1} ${heroTitlePart2}`.trim() || heroTitle,
      heroTitlePart1,
      heroTitlePart2,
      heroSub, certificates,
      whySectionTitle: `${whyTitlePart1} ${whyTitlePart2}`.trim() || whySectionTitle,
      whyTitlePart1,
      whyTitlePart2,
      whyCard1Title, whyCard1Desc, whyCard2Title, whyCard2Desc,
      whyCard3Title, whyCard3Desc,
      commitTitle: `${commitTitlePart1} ${commitTitlePart2}`.trim() || commitTitle,
      commitTitlePart1,
      commitTitlePart2,
      commitText,
      btn1Label, btn1Url, btn2Label, btn2Url
    };
    
    // Upload any File objects deep within the payload before saving
    const payload = await uploadFilesDeep(rawPayload);
    // Sync local state with uploaded URLs so previews remain valid
    if (payload.certificates) setCertificates(payload.certificates);

    const res = await fetch("/api/certifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "certifications", content: payload }),
    });
    if (!res.ok) throw new Error("Save failed");
    clearCache("/api/certifications");
  };

  const handleCertChange = (id: string, field: keyof CertificateItem, val: string | File) => {
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const addCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      { id: `cert-${Date.now()}`, name: "", year: "2024", description: "", issuer: "", image: "" },
    ]);
    toast.success("New certificate added!");
  };

  const removeCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    toast.success("Certificate removed");
  };

  const handleSaveHero = async () => { setSavingHero(true); try { await saveAllToDB(); setSavedHero(true); toast.success("Header section saved!"); setTimeout(() => setSavedHero(false), 2000); } catch { toast.error("Save failed"); } finally { setSavingHero(false); } };

  const handleSaveCerts = async () => { setSavingCerts(true); try { await saveAllToDB(); setSavedCerts(true); toast.success("Certificates list saved!"); setTimeout(() => setSavedCerts(false), 2000); } catch { toast.error("Save failed"); } finally { setSavingCerts(false); } };

  const handleSaveWhy = async () => { setSavingWhy(true); try { await saveAllToDB(); setSavedWhy(true); toast.success("Why Certifications section saved!"); setTimeout(() => setSavedWhy(false), 2000); } catch { toast.error("Save failed"); } finally { setSavingWhy(false); } };

  const handleSaveCommit = async () => { setSavingCommit(true); try { await saveAllToDB(); setSavedCommit(true); toast.success("Commitment banner saved!"); setTimeout(() => setSavedCommit(false), 2000); } catch { toast.error("Save failed"); } finally { setSavingCommit(false); } };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Certifications & Awards Static Page CMS (/about/Certifications)"
        description="Manage certificate awards list, Why Certifications Matter section, compliance descriptions, and commitment banner. Expand any section to edit its content."
      />

      {/* 1. Hero Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Header Section ('Awards and Certifications')"
          description="Manage header main title & subtitle description."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Header Title (Regular Part)" value={heroTitlePart1} onChange={(e) => setHeroTitlePart1(e.target.value)} placeholder="Awards and" />
              <InputField label="Header Title (Colored Part)" value={heroTitlePart2} onChange={(e) => setHeroTitlePart2(e.target.value)} placeholder="Certifications" />
            </div>
            <TextAreaField label="Subtitle Description" value={heroSub} onChange={(e) => setHeroSub(e.target.value)} rows={2} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Certificate Cards */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Awards & Certificates (${certificates.length} items)`}
          description="Manage individual award cards, certificate images & issuing authorities."
          isOpen={isCertsOpen}
          onToggle={() => setIsCertsOpen(!isCertsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isCertsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addCertificate}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Certificate
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {certificates.map((cert, idx) => (
                <div key={cert.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                      Certificate #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeCertificate(cert.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Certificate Name" value={cert.name} onChange={(e) => handleCertChange(cert.id, "name", e.target.value)} placeholder="e.g. Authorisation Certification" />
                    <InputField label="Year / Year Range" value={cert.year} onChange={(e) => handleCertChange(cert.id, "year", e.target.value)} placeholder="e.g. 2024" />
                  </div>
                  <TextAreaField label="Certificate Description" value={cert.description} onChange={(e) => handleCertChange(cert.id, "description", e.target.value)} rows={2} />
                  <InputField label="Issued By" value={cert.issuer} onChange={(e) => handleCertChange(cert.id, "issuer", e.target.value)} placeholder="e.g. KOEL Pune" />
                  <ImageUploadField label="Certificate Image Upload" value={cert.image} onChange={(val) => handleCertChange(cert.id, "image", val)} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingCerts} saved={savedCerts} onClick={handleSaveCerts} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Why Certifications Matter Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="3. 'Why Certifications Matter' Value Grid"
          description="Manage headline & 3 value cards (Quality Assurance, Compliance & Customer Trust)."
          isOpen={isWhyOpen}
          onToggle={() => setIsWhyOpen(!isWhyOpen)}
        />
        <div className={`grid transition-all duration-300 ${isWhyOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Section Title (Regular Part)" value={whyTitlePart1} onChange={(e) => setWhyTitlePart1(e.target.value)} placeholder="Why" />
              <InputField label="Section Title (Colored Part)" value={whyTitlePart2} onChange={(e) => setWhyTitlePart2(e.target.value)} placeholder="Certifications Matter" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                  Card #1
                </span>
                <InputField label="Card 1 Title" value={whyCard1Title} onChange={(e) => setWhyCard1Title(e.target.value)} />
                <TextAreaField label="Card 1 Description" value={whyCard1Desc} onChange={(e) => setWhyCard1Desc(e.target.value)} rows={3} />
              </div>

              {/* Card 2 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                  Card #2
                </span>
                <InputField label="Card 2 Title" value={whyCard2Title} onChange={(e) => setWhyCard2Title(e.target.value)} />
                <TextAreaField label="Card 2 Description" value={whyCard2Desc} onChange={(e) => setWhyCard2Desc(e.target.value)} rows={3} />
              </div>

              {/* Card 3 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA]">
                  Card #3
                </span>
                <InputField label="Card 3 Title" value={whyCard3Title} onChange={(e) => setWhyCard3Title(e.target.value)} />
                <TextAreaField label="Card 3 Description" value={whyCard3Desc} onChange={(e) => setWhyCard3Desc(e.target.value)} rows={3} />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingWhy} saved={savedWhy} onClick={handleSaveWhy} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Commitment Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="4. Commitment to Excellence Banner"
          description="Manage banner title, description copy & action button target URLs."
          isOpen={isCommitOpen}
          onToggle={() => setIsCommitOpen(!isCommitOpen)}
        />
        <div className={`grid transition-all duration-300 ${isCommitOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Banner Title (Regular Part)" value={commitTitlePart1} onChange={(e) => setCommitTitlePart1(e.target.value)} placeholder="Our Commitment to" />
              <InputField label="Banner Title (Colored Part)" value={commitTitlePart2} onChange={(e) => setCommitTitlePart2(e.target.value)} placeholder="Excellence" />
            </div>
            <TextAreaField label="Description Paragraph" value={commitText} onChange={(e) => setCommitText(e.target.value)} rows={4} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Button 1 Text" value={btn1Label} onChange={(e) => setBtn1Label(e.target.value)} />
              <InputField label="Button 1 URL" value={btn1Url} onChange={(e) => setBtn1Url(e.target.value)} />
              <InputField label="Button 2 Text" value={btn2Label} onChange={(e) => setBtn2Label(e.target.value)} />
              <InputField label="Button 2 URL" value={btn2Url} onChange={(e) => setBtn2Url(e.target.value)} />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingCommit} saved={savedCommit} onClick={handleSaveCommit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
