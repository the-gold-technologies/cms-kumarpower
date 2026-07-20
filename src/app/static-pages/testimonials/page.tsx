"use client";

import { useState, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2, Upload, UploadCloud, X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

type TestimonialCard = {
  id: string;
  authorName: string;
  roleCompany: string;
  logo: string;
  quote: string;
};

type ClientLogo = {
  id: string;
  url: string;
  alt: string;
};

const INITIAL_TESTIMONIALS: TestimonialCard[] = [
  {
    id: "test-1",
    authorName: "Khushi Aggarwal",
    roleCompany: "Founder, Platter Me Crazy",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902468/Screenshot_2025-10-31_144115_lybhem.png",
    quote:
      "I, Khushi Aggarwal, Founder of Platter Me Crazy, a brand synonymous with culinary artistry and luxury dining experiences. We curate exquisite charcuterie boards and handcrafted artisanal foods that elevate every occasion into a memorable indulgence. Our signature creations include gourmet flavoured butters, silky-smooth hummus blends, and wholesome baked crisps, each crafted with uncompromising freshness and zero preservatives. Whether for intimate soirées, premium gifting, or grand corporate gatherings, we bring an unmatched blend of flavor, finesse and sophistication to the table.",
  },
  {
    id: "test-2",
    authorName: "Kaustubh Jain",
    roleCompany: "TEAM Construction Chemicals (TEAMCC) | BNI Lakshay",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902466/Screenshot_2025-10-31_144303_wgqqaq.png",
    quote:
      "I am Kaustubh Jain representing the category marble adhesives and coatings. At TEAMCC we specialise in high-performance epoxy adhesives, polyester adhesives, tile adhesives and marble coatings.\n\nI have had the pleasure of knowing Mr. Jasjot Singh, and I can confidently say he is a true professional in the generator industry. Representing the trusted Kirloskar brand, Jasjot ensures top-quality products backed by exceptional service. His deep knowledge of power solutions, combined with his commitment to delivering the right generator for every requirement, makes him a go-to expert.\n\nWhether it's for commercial, industrial, or residential needs, Jasjot's guidance is reliable and his follow-up impeccable. If you're looking for a dependable generator partner who values both quality and customer satisfaction, I highly recommend Mr. Jasjot Singh.",
  },
  {
    id: "test-3",
    authorName: "Atul Jewellers (Jain, Proprietor)",
    roleCompany: "Proprietor, Defence Colony New Delhi (Dated: 28th Dec 2018)",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902462/Screenshot_2025-10-31_144354_iiu1nu.png",
    quote:
      "We at Atul Jewellers, are engaged in retail & wholesale of precious gemstones, diamonds & fine jewellery for almost five decades. We are the only jewellery house in Delhi, with in-house state of art gem testing & diamond grading laboratory, and we also provide this facility to almost 500 retailers across Delhi NCR.\n\nI wish to record our appreciation and acknowledgement, for R.S. Kumar of Kumar Generator House, who has provided gensets, for our new store at Defence Colony.\n\nMr. Kumar and his team is extremely professional in their approach and suggested valuable tips to plan the load distribution, making optimum utilization of energy generated. The rates charged were reasonable and delivery provided in promised time with excellent back up support.\n\nWe recommend Kumar Generator House to all my colleagues for power backup facilitation and wish R.S. Kumar & his team all round success in all its endeavors.",
  },
  {
    id: "test-4",
    authorName: "Bharat Anand",
    roleCompany: "Director, Brown Gold",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902474/Gemini_Generated_Image_1je1r11je1r11je1_ksybnh.png",
    quote:
      "We at Brown Gold are a team of young and dynamic interior designers engaged in the business of providing complete design solutions for our clients, be it individual, architects or corporate for the last 3 decades. We have a passion of interiors which enables us in providing quality and timely delivery of our design services and products for our clients pan India.\n\nWe would like to place on record our appreciation for Mr. R. S. Kumar of Kumar Generator House.\n\nWe had taken their services for our 40 KVA Kirloskar generator & a small genset of 7 KVA. We would like to take this opportunity to thank you for providing excellent advice, excellent products & excellent service. We would not hesitate to recommend Kumar Generator House to prospective clients, looking for a high level of professional service, with attention on a long term client focused relationship.\n\nWe are extremely pleased and look forward to increasing our level of business with yourselves in the coming years. Thank you Mr. R. S. Kumar for your positive & professional approach.",
  },
  {
    id: "test-5",
    authorName: "RENT IT BAE",
    roleCompany: "Luxury Fashion Rental Service (New Delhi)",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902462/Screenshot_2025-10-31_144806_gklejh.png",
    quote:
      "RENT IT BAE is a luxury fashion rental service offering Ethnic, Western & Accessories from designer labels at a fraction of MRP. Servicing 15 cities via Website, m-site, Android & iOS apps. First to introduce Monthly Fashion Subscription in the country. The company has its 2 Flagship Stores in New Delhi (Rajouri Garden and Greater Kailash-1). RENT IT BAE has taken the media limelight for building country's first tech driven store.\n\nWe highly appreciate the fast and seamless service provided by your company. The installation of invertors for RENT IT BAE's South Delhi Flagship Store at Greater Kailash seemed a fluid task with your service. The requirement for a power back up is a must for all companies now days especially in the retail sector. You understood the requirement and delivered the apt products at a reasonable price. All was done post one phone call. No follow up were required. The products were delivered and installed within 24 hours. We would be happy to recommend your products and service.",
  },
  {
    id: "test-6",
    authorName: "K.K. Setia",
    roleCompany: "Olympus, Intown Realtors Pvt Ltd (3rd March, 2025)",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1761902462/Screenshot_2025-10-31_145022_ffeb43.png",
    quote:
      "I K.K. Setia, Director of Intown Realtors, have been in commercial Real Estate business for the last 18 years. I have been a member of BNI Olympus Noida since December 2015.\n\n\"I recently needed a generator for my Sector 18 office building and reached out to my fellow BNI member, Mr. Manjot Singh Kumar. His team promptly inspected the site, provided a tailored solution, and even assisted with the necessary approvals. The generator was delivered and installed within the promised timeframe, and the team ensured that everything was functioning perfectly before they left. I am thoroughly impressed with the professionalism and efficiency displayed by Kumar Generator House. I highly recommend their services to anyone in need of reliable power solutions.\"",
  },
  {
    id: "test-7",
    authorName: "Shivani Saini",
    roleCompany: "Owner, Anytime Fitness (Sec 29, Gurugram - 26 Sep 2025)",
    logo: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762064945/Screenshot_2025-11-02_115831_lgqzrn.png",
    quote:
      "As fitness industry in India is rising rapidly, Anytime Fitness has marked its biggest presence in this field and possesses more than 160 clubs pan-India with 80+ within Delhi NCR. The club is open 24/7 which gives its members the flexibility to workout at any hour of the day as per their schedule.\n\nThe biggest challenge an Anytime Fitness Club faces is uninterrupted 24/7 power supply for its customers. For the same, the club is reliant on an efficient power back up system. During the setting up of Anytime Fitness Sec 29, Gurugram I, Shivani Saini, owner of the club, got the reference of Mr Jasjot Singh of M/s Kumar Generator House from a trustworthy friend.\n\nI write this testimonial to express my deep gratitude to Mr Jasjot Singh of guiding me towards the trusted Kirloskar Brand and explaining me the complete process of installation in great details. He personally visited the site and I must compliment his eye for details and the experience he carries in this field. As a true professional Mr Jasjot and his team ensured a smooth installation and thereafter a continuous follow up till such time the machine got fully functional. The equipment is top notch and has been performing flawlessly during power outages. The customer support has been outstanding, addressing all our concerns promptly. I am truly indebted to services of Kumar Generator House and I would highly recommend Mr Jasjot Singh for any kind of Generator Services in Delhi NCR.",
  },
];

const INITIAL_LOGOS: ClientLogo[] = [
  { id: "logo-1", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg", alt: "GMR Infra" },
  { id: "logo-2", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg", alt: "SIS Security" },
  { id: "logo-3", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928655/5d8a7ffc-390a-42d8-bee8-2a5c353e5d05_abj0u1.jpg", alt: "Vistara Airlines" },
  { id: "logo-4", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1762928656/68724243-11f2-42ec-85dc-69c153744f3c_n1154o.jpg", alt: "Honeywell" },
];

export default function TestimonialsStaticPageCMS() {
  const bulkLogoInputRef = useRef<HTMLInputElement>(null);

  // Section Open states
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isLogosOpen, setIsLogosOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Saving states per section
  const [savingHero, setSavingHero] = useState(false);
  const [savedHero, setSavedHero] = useState(false);

  const [savingGrid, setSavingGrid] = useState(false);
  const [savedGrid, setSavedGrid] = useState(false);

  const [savingLogos, setSavingLogos] = useState(false);
  const [savedLogos, setSavedLogos] = useState(false);

  const [savingStats, setSavingStats] = useState(false);
  const [savedStats, setSavedStats] = useState(false);

  // Hero Section
  const [heroHeading, setHeroHeading] = useState("POWERING INDIA'S SUCCESS STORIES");
  const [heroSubtitle, setHeroSubtitle] = useState("Testimonials from industry leaders");
  const [heroBgImage, setHeroBgImage] = useState("");

  // Testimonials Cards
  const [testimonials, setTestimonials] = useState<TestimonialCard[]>(INITIAL_TESTIMONIALS);

  // Client Logos
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(INITIAL_LOGOS);

  // Stats Section
  const [stat1Num, setStat1Num] = useState("100+");
  const [stat1Text, setStat1Text] = useState("Video Testimonials");
  const [stat2Num, setStat2Num] = useState("25+");
  const [stat2Text, setStat2Text] = useState("Industries Served");
  const [stat3Num, setStat3Num] = useState("10000+");
  const [stat3Text, setStat3Text] = useState("Installations Nationwide");

  // Bottom CTA
  const [ctaTitle, setCtaTitle] = useState("Ready to join India's most reliable power network?");
  const [ctaDesc, setCtaDesc] = useState(
    "From hospitals to data centers, from factories to airports — Kumar power delivers uninterrupted power solutions tailored to your needs."
  );
  const [whatsappPhone, setWhatsappPhone] = useState("+919773877796");
  const [helplinePhone, setHelplinePhone] = useState("01140191273");
  const [brochurePdf, setBrochurePdf] = useState("");

  const handleTestimonialChange = (id: string, field: keyof TestimonialCard, val: string) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
  };

  const addTestimonialCard = () => {
    setTestimonials((prev) => [
      ...prev,
      { id: `test-${Date.now()}`, authorName: "", roleCompany: "", logo: "", quote: "" },
    ]);
    toast.success("New testimonial added!");
  };

  const removeTestimonialCard = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial removed");
  };

  const handleLogoFileUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setClientLogos((prev) =>
        prev.map((l) => (l.id === id ? { ...l, url: result } : l))
      );
      toast.success("Logo image updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleBulkLogoFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setClientLogos((prev) => [
          ...prev,
          { id: `logo-${Date.now()}-${Math.random()}`, url: result, alt: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
    toast.success("Logos added successfully!");
  };

  const removeClientLogo = (id: string) => {
    setClientLogos((prev) => prev.filter((l) => l.id !== id));
    toast.success("Client logo removed");
  };

  const handleSaveHero = () => {
    setSavingHero(true);
    setTimeout(() => {
      setSavingHero(false);
      setSavedHero(true);
      toast.success("Hero section saved!");
      setTimeout(() => setSavedHero(false), 2000);
    }, 400);
  };

  const handleSaveGrid = () => {
    setSavingGrid(true);
    setTimeout(() => {
      setSavingGrid(false);
      setSavedGrid(true);
      toast.success("Testimonial stories saved!");
      setTimeout(() => setSavedGrid(false), 2000);
    }, 400);
  };

  const handleSaveLogos = () => {
    setSavingLogos(true);
    setTimeout(() => {
      setSavingLogos(false);
      setSavedLogos(true);
      toast.success("Trusted client logos saved!");
      setTimeout(() => setSavedLogos(false), 2000);
    }, 400);
  };

  const handleSaveStats = () => {
    setSavingStats(true);
    setTimeout(() => {
      setSavingStats(false);
      setSavedStats(true);
      toast.success("Metrics & CTA section saved!");
      setTimeout(() => setSavedStats(false), 2000);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <PageHeader
        title="Testimonials Static Page CMS (/about/Testimonials)"
        description="Manage customer reviews, hero banner, client stories, trusted partner logos, metrics & conversion callouts. Expand any section to edit its content."
      />

      {/* 1. Hero Banner Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="1. Hero Banner Section ('Powering India's Success Stories')"
          description="Manage banner title, subtitle tagline & background showcase image."
          isOpen={isHeroOpen}
          onToggle={() => setIsHeroOpen(!isHeroOpen)}
        />
        <div className={`grid transition-all duration-300 ${isHeroOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-4 pt-1">
            <InputField label="Hero Main Heading" value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)} />
            <InputField label="Hero Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
            <ImageUploadField label="Hero Banner Background Image" value={heroBgImage} onChange={(val) => setHeroBgImage(val)} />

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingHero} saved={savedHero} onClick={handleSaveHero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Testimonial Stories Grid */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`2. Client Success Stories (${testimonials.length} Testimonials)`}
          description="Manage customer testimonial cards (Author name, designation, company logo & quote)."
          isOpen={isGridOpen}
          onToggle={() => setIsGridOpen(!isGridOpen)}
        />
        <div className={`grid transition-all duration-300 ${isGridOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addTestimonialCard}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] text-white text-xs font-bold rounded-xl hover:bg-[#22548e] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Testimonial Card
              </button>
            </div>

            <div className="space-y-4">
              {testimonials.map((t, idx) => (
                <div key={t.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Testimonial #{idx + 1}
                    </span>
                    <button type="button" onClick={() => removeTestimonialCard(t.id)} className="text-slate-400 hover:text-red-500 transition cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Author Name" value={t.authorName} onChange={(e) => handleTestimonialChange(t.id, "authorName", e.target.value)} placeholder="e.g. Khushi Aggarwal" />
                    <InputField label="Role / Designation / Company" value={t.roleCompany} onChange={(e) => handleTestimonialChange(t.id, "roleCompany", e.target.value)} placeholder="e.g. Founder, Platter Me Crazy" />
                  </div>
                  <TextAreaField label="Full Testimonial Quote / Story" value={t.quote} onChange={(e) => handleTestimonialChange(t.id, "quote", e.target.value)} rows={5} />
                  <ImageUploadField label="Client Logo Image" value={t.logo} onChange={(val) => handleTestimonialChange(t.id, "logo", val)} />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingGrid} saved={savedGrid} onClick={handleSaveGrid} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Trusted Client Logos Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title={`3. Trusted Partner & Client Logos (${clientLogos.length} client logos)`}
          description="Manage scrolling brand logos shown in the 'Trusted by India's Leading Organizations' section."
          isOpen={isLogosOpen}
          onToggle={() => setIsLogosOpen(!isLogosOpen)}
        />
        <div className={`grid transition-all duration-300 ${isLogosOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Trusted By Logos ({clientLogos.length} client logos)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Upload client brand logos to display in the scrolling marquee banner
                </p>
              </div>
              <button
                type="button"
                onClick={() => bulkLogoInputRef.current?.click()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Logos
              </button>
            </div>

            {/* Drag & Drop Bulk Uploader Banner */}
            <div
              onClick={() => bulkLogoInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.length) handleBulkLogoFiles(e.dataTransfer.files);
              }}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100/80 flex flex-col items-center justify-center p-6 lg:p-8 transition-colors cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-white shadow-xs ring-1 ring-gray-100 mb-3 text-[#2D6FBA] group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" strokeWidth={2} />
              </div>
              <p className="text-gray-500 text-sm mb-1 text-center font-medium">
                <span className="text-[#2D6FBA] font-semibold hover:underline mr-1">Click to upload</span> or drag & drop client logo images
              </p>
              <p className="text-gray-400 text-xs text-center font-medium">PNG, JPG, SVG or WebP supported</p>
            </div>

            <input
              ref={bulkLogoInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleBulkLogoFiles(e.target.files)}
            />

            {/* List of uploaded logos */}
            <div className="space-y-2.5">
              {clientLogos.map((logo, idx) => (
                <div
                  key={logo.id}
                  className="bg-slate-50/70 border border-slate-200/70 rounded-2xl px-4 py-3 flex items-center justify-between transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {logo.url ? (
                        <img src={logo.url} alt="Client Logo" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {logo.alt || `Client Logo #${idx + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {logo.url ? (logo.url.startsWith("data:") ? "Local File" : "Cloud / Remote") : "No file uploaded"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <label className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#2D6FBA] hover:border-[#2D6FBA]/40 rounded-xl text-xs font-semibold cursor-pointer transition shadow-2xs">
                      {logo.url ? "Replace" : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoFileUpload(logo.id, file);
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => removeClientLogo(logo.id)}
                      className="w-8 h-8 rounded-full border border-slate-200/80 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition cursor-pointer shadow-2xs"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingLogos} saved={savedLogos} onClick={handleSaveLogos} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Statistics & CTA Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
        <SectionHeader
          title="4. Key Metrics & Bottom CTA Banner"
          description="Manage 3 metric stats (100+ Video Testimonials, etc.), CTA title & hotline phone numbers."
          isOpen={isStatsOpen}
          onToggle={() => setIsStatsOpen(!isStatsOpen)}
        />
        <div className={`grid transition-all duration-300 ${isStatsOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"}`}>
          <div className="overflow-hidden flex flex-col gap-6 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <InputField label="Stat 1 Number" value={stat1Num} onChange={(e) => setStat1Num(e.target.value)} />
                <InputField label="Stat 1 Label" value={stat1Text} onChange={(e) => setStat1Text(e.target.value)} />
              </div>
              <div className="space-y-2">
                <InputField label="Stat 2 Number" value={stat2Num} onChange={(e) => setStat2Num(e.target.value)} />
                <InputField label="Stat 2 Label" value={stat2Text} onChange={(e) => setStat2Text(e.target.value)} />
              </div>
              <div className="space-y-2">
                <InputField label="Stat 3 Number" value={stat3Num} onChange={(e) => setStat3Num(e.target.value)} />
                <InputField label="Stat 3 Label" value={stat3Text} onChange={(e) => setStat3Text(e.target.value)} />
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100">
              <InputField label="Bottom CTA Title" value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} />
              <TextAreaField label="Bottom CTA Description" value={ctaDesc} onChange={(e) => setCtaDesc(e.target.value)} rows={2} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="WhatsApp Support Phone" value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} />
                <InputField label="Helpline Phone" value={helplinePhone} onChange={(e) => setHelplinePhone(e.target.value)} />
              </div>
              <PDFUploadField label="Download Brochure PDF File" value={brochurePdf} onChange={(val) => setBrochurePdf(val)} />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <SaveButton isSaving={savingStats} saved={savedStats} onClick={handleSaveStats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
