"use client";

import { useState } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { PDFUploadField } from "@/components/PDFUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type GeneratorCard = {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  brochureUrl: string;
};

const CATEGORIES = [
  "CPCB4+ Diesel Generators",
  "Gas Generators",
  "Portable Generators",
  "Optiprime",
];

const INITIAL_CARDS: GeneratorCard[] = [
  {
    id: "gen-1",
    title: "Kirloskar Optiprime Generator (125 – 6600 kVA)",
    caption: "High-output Kirloskar Optiprime engineered for mission-critical facilities.",
    category: "Optiprime",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-2",
    title: "Kirloskar Gas Generator (15 – 250 kVA)",
    caption: "Clean, efficient power for commercial and industrial applications.",
    category: "Gas Generators",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-3",
    title: "Kirloskar CPCB4+ Diesel Generator (7.5 – 20 kVA)",
    caption: "Portable power for events, remote sites, and emergency backup.",
    category: "CPCB4+ Diesel Generators",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-4",
    title: "Kirloskar CPCB4+ Diesel Generator (25 – 58.5 kVA)",
    caption: "Balanced performance for medium-scale industrial needs.",
    category: "CPCB4+ Diesel Generators",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-5",
    title: "Kirloskar CPCB4+ Diesel Generator (82.5 – 160 kVA)",
    caption: "Scalable solutions with robust service network coverage.",
    category: "CPCB4+ Diesel Generators",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-6",
    title: "Kirloskar CPCB4+ Diesel Generator (200 – 250 kVA)",
    caption: "Versatile DG sets for plants, campuses, and commercial towers.",
    category: "CPCB4+ Diesel Generators",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-7",
    title: "Kirloskar CPCB4+ Diesel Generator (320 – 750 kVA)",
    caption: "Durable, high-efficiency backup for industries and campuses.",
    category: "CPCB4+ Diesel Generators",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-8",
    title: "Kirloskar CPCB4+ Diesel Generator (750 – 1500 kVA)",
    caption: "Low-emission, reliable diesel generator for versatile use.",
    category: "CPCB4+ Diesel Generators",
    image: "",
    brochureUrl: "",
  },
  {
    id: "gen-9",
    title: "Kirloskar Portable Generator (2.1 – 5 kVA)",
    caption: "Compact portable power for small-scale events, sites, and emergency use.",
    category: "Portable Generators",
    image: "",
    brochureUrl: "",
  },
];

function GeneratorCardForm({
  card,
  index,
  onChange,
  onRemove,
}: {
  card: GeneratorCard;
  index: number;
  onChange: (id: string, field: keyof GeneratorCard, value: string) => void;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      {/* Card header toggle */}
      <div className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center gap-3 text-left cursor-pointer"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
            Card {index + 1}
          </span>
          <span className="text-sm font-semibold text-slate-700 truncate max-w-xs sm:max-w-md">
            {card.title || `Generator Card ${index + 1}`}
          </span>
          <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide hidden sm:inline">
            {card.category}
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onRemove(card.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer"
            title="Delete generator card"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-1.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            {open ? (
              <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* Card form fields */}
      {open && (
        <div className="p-5 flex flex-col gap-4 bg-white border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Card Title"
              value={card.title}
              onChange={(e) => onChange(card.id, "title", e.target.value)}
              placeholder="e.g. Kirloskar CPCB4+ Diesel Generator (7.5 – 20 kVA)"
            />
            <div className="flex flex-col gap-2.5 px-0.5">
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">
                Category
              </label>
              <select
                value={card.category}
                onChange={(e) => onChange(card.id, "category", e.target.value)}
                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-800 focus:ring-2 focus:ring-[#2D6FBA]/30 focus:border-[#2D6FBA] outline-none transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <TextAreaField
            label="Card Caption"
            value={card.caption}
            onChange={(e) => onChange(card.id, "caption", e.target.value)}
            rows={2}
            placeholder="Short description shown on the card"
          />

          <ImageUploadField
            label="Generator Image"
            value={card.image}
            onChange={(val) => onChange(card.id, "image", val)}
          />

          {/* PDF Upload Field */}
          <PDFUploadField
            label="Brochure PDF Document"
            value={card.brochureUrl}
            onChange={(val) => onChange(card.id, "brochureUrl", val)}
            tooltip="Upload the downloadable PDF brochure for this generator"
          />
        </div>
      )}
    </div>
  );
}

export function GeneratorRangeSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("Explore Our Generator Range");
  const [sectionDesc, setSectionDesc] = useState(
    "Kirloskar-certified systems tailored for industrial, commercial, and backup applications. Download brochures for detailed specifications."
  );
  const [cards, setCards] = useState<GeneratorCard[]>(INITIAL_CARDS);

  const handleCardChange = (id: string, field: keyof GeneratorCard, value: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addCard = () => {
    const newId = `gen-${Date.now()}`;
    const newCard: GeneratorCard = {
      id: newId,
      title: "",
      caption: "",
      category: "CPCB4+ Diesel Generators",
      image: "",
      brochureUrl: "",
    };
    setCards((prev) => [...prev, newCard]);
    toast.success("New generator card added!");
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    toast.success("Generator card removed");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Generator Range section saved!");
      setTimeout(() => setSaved(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100/50">
      <SectionHeader
        title="Generator Range Section"
        description="Manage generator product cards — add multiple cards, titles, captions, images, categories & PDF brochures."
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

          {/* Section Header Fields */}
          <InputField
            label="Section Heading"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="e.g. Explore Our Generator Range"
          />
          <TextAreaField
            label="Section Description"
            value={sectionDesc}
            onChange={(e) => setSectionDesc(e.target.value)}
            rows={2}
          />

          {/* Generator Cards Section Header & Add Button */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                  Generator Product Cards ({cards.length} cards)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Click 'Add Generator Card' to add as many generator options as needed
                </p>
              </div>
              <button
                type="button"
                onClick={addCard}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Generator Card
              </button>
            </div>

            <div className="space-y-3">
              {cards.map((card, idx) => (
                <GeneratorCardForm
                  key={card.id}
                  card={card}
                  index={idx}
                  onChange={handleCardChange}
                  onRemove={removeCard}
                />
              ))}
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
