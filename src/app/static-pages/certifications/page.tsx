"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type CertificateItem = {
  id: string;
  name: string;
  year: string;
  description: string;
  issuer: string;
  image: string;
};

const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    name: "Authorisation Certification",
    year: "2024",
    description: "Kumar Generator House is our authorised KOEL Green Dealer for sale of KOEL Green Diesel Generating Sets and Chhota Chilli Range of generators",
    issuer: "Authorisation certificate",
    image: "",
  },
  {
    id: "cert-2",
    name: "Certificate of Excellence",
    year: "2012-2013",
    description: "Environmental Management System certification, demonstrating our commitment to environmental responsibility.",
    issuer: "KOEL Pune",
    image: "",
  },
  {
    id: "cert-3",
    name: "Certification of Highest Growth",
    year: "2013",
    description: "Presented to M/s Kumar Generator House, Delhi for highest growth & highest nos. of KIRLOSKAR GREEN DG sets sold in FY 2013.",
    issuer: "KOEL-JAKPOWER-KGD Conference, Goa",
    image: "",
  },
  {
    id: "cert-4",
    name: "Certificate for Highest in MHP generators (2014)",
    year: "2014",
    description: "Awarded to Kumar Generator House, Delhi for highest volume in MHP generators in FY 14.",
    issuer: "Kirloskar Conference Awards - Pune",
    image: "",
  },
  {
    id: "cert-5",
    name: "Certificate for Highest in HHP generators (2014)",
    year: "2014",
    description: "Awarded to Kumar Generator House, Delhi for highest volume in HHP generators in FY 14.",
    issuer: "Kirloskar Conference Awards - Pune",
    image: "",
  },
  {
    id: "cert-6",
    name: "Certificate for Highest Sale (2015)",
    year: "2015",
    description: "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 15.",
    issuer: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
    image: "",
  },
  {
    id: "cert-7",
    name: "KOEL-JAKPOWER-KGD & SD Conference Awards Gangtok",
    year: "2015",
    description: "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 18-19.",
    issuer: "KOEL JAKPOWER KGD & SD Conference Awards Gangtok",
    image: "",
  },
  {
    id: "cert-8",
    name: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
    year: "2015",
    description: "Presented to M/s Kumar Generator House, Delhi for highest nos. of KIRLOSKAR GREEN DG sets sold in FY 16-17.",
    issuer: "KOEL JAKPOWER KGD & SD Conference Awards Rajasthan",
    image: "",
  },
];

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
  const [heroTitle, setHeroTitle] = useState("Awards and Certifications");
  const [heroSub, setHeroSub] = useState("Recognized for excellence in power solutions and industry leadership");

  // Certificate List
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);

  // Why Certifications Matter Section
  const [whySectionTitle, setWhySectionTitle] = useState("Why Certifications Matter");
  const [whyCard1Title, setWhyCard1Title] = useState("Quality Assurance");
  const [whyCard1Desc, setWhyCard1Desc] = useState("Our certifications serve as third-party validation of our commitment to maintaining high-quality standards.");
  const [whyCard2Title, setWhyCard2Title] = useState("Compliance");
  const [whyCard2Desc, setWhyCard2Desc] = useState("We adhere to industry regulations and standards, ensuring our operations are fully compliant.");
  const [whyCard3Title, setWhyCard3Title] = useState("Customer Trust");
  const [whyCard3Desc, setWhyCard3Desc] = useState("Our certifications provide customers with confidence in our products, services, and business practices.");

  // Commitment Banner
  const [commitTitle, setCommitTitle] = useState("Our Commitment to Excellence");
  const [commitText, setCommitText] = useState(
    "At Kumar Power, we believe that maintaining certifications and industry partnerships is more than just fulfilling requirements—it's about our ongoing commitment to excellence in everything we do. We continuously strive to improve our processes, enhance our services, and exceed industry standards."
  );
  const [btn1Label, setBtn1Label] = useState("Contact Us");
  const [btn1Url, setBtn1Url] = useState("/contact");
  const [btn2Label, setBtn2Label] = useState("View Products");
  const [btn2Url, setBtn2Url] = useState("/products");

  const handleCertChange = (id: string, field: keyof CertificateItem, val: string) => {
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

  const handleSaveHero = () => {
    setSavingHero(true);
    setTimeout(() => {
      setSavingHero(false);
      setSavedHero(true);
      toast.success("Header section saved!");
      setTimeout(() => setSavedHero(false), 2000);
    }, 400);
  };

  const handleSaveCerts = () => {
    setSavingCerts(true);
    setTimeout(() => {
      setSavingCerts(false);
      setSavedCerts(true);
      toast.success("Certificates list saved!");
      setTimeout(() => setSavedCerts(false), 2000);
    }, 400);
  };

  const handleSaveWhy = () => {
    setSavingWhy(true);
    setTimeout(() => {
      setSavingWhy(false);
      setSavedWhy(true);
      toast.success("Why Certifications Matter section saved!");
      setTimeout(() => setSavedWhy(false), 2000);
    }, 400);
  };

  const handleSaveCommit = () => {
    setSavingCommit(true);
    setTimeout(() => {
      setSavingCommit(false);
      setSavedCommit(true);
      toast.success("Commitment banner saved!");
      setTimeout(() => setSavedCommit(false), 2000);
    }, 400);
  };

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
            <InputField label="Main Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
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
            <InputField label="Section Title" value={whySectionTitle} onChange={(e) => setWhySectionTitle(e.target.value)} />

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
            <InputField label="Banner Title" value={commitTitle} onChange={(e) => setCommitTitle(e.target.value)} />
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
