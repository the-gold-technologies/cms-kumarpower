"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { InputField } from "@/components/InputField";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ClientsCMSPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [clients, setClients] = useState([
    { name: "Air India", category: "Aviation & Logistics" },
    { name: "Apollo Hospitals", category: "Healthcare" },
    { name: "GMR Infrastructure", category: "Airports & Infrastructure" },
    { name: "Honeywell India", category: "Technology & Industrial" },
    { name: "NBCC Limited", category: "Government Construction" },
    { name: "British Paints", category: "Manufacturing" },
    { name: "Vistara Airlines", category: "Aviation" },
    { name: "MES (Military Engineer Services)", category: "Defense Infrastructure" },
  ]);

  const addClient = () => {
    setClients([...clients, { name: "New Client", category: "Industry" }]);
  };

  const removeClient = (index: number) => {
    setClients(clients.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success("Client logos & showcase updated!");
      setTimeout(() => setSaved(false), 2500);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Client Logos & Installation Showcase"
        description="Manage enterprise client portfolio logos and sector categories displayed on the website."
        action={
          <div className="flex items-center gap-3">
            <button
              onClick={addClient}
              className="flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" /> Add Client
            </button>
            <SaveButton isSaving={isSaving} saved={saved} onClick={handleSave} />
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3 relative group">
            <button
              onClick={() => removeClient(idx)}
              className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <InputField
              label={`Client Name #${idx + 1}`}
              value={c.name}
              onChange={(e) => {
                const copy = [...clients];
                copy[idx].name = e.target.value;
                setClients(copy);
              }}
            />
            <InputField
              label="Industry / Sector"
              value={c.category}
              onChange={(e) => {
                const copy = [...clients];
                copy[idx].category = e.target.value;
                setClients(copy);
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
