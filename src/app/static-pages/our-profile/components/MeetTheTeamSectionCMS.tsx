"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export function MeetTheTeamSectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [teamTitle, setTeamTitle] = useState("");
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/pages/our-profile")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const leadership = json.data.leadership || {};
          if (leadership.teamTitle !== undefined) setTeamTitle(leadership.teamTitle);
          if (Array.isArray(leadership.team)) setTeam(leadership.team);
        }
      })
      .catch(console.error);
  }, []);

  const handleTeamChange = (id: string, field: keyof TeamMember, val: string) => {
    setTeam((prev) => prev.map((tm) => (tm.id === id ? { ...tm, [field]: val } : tm)));
  };

  const addTeamMember = () => {
    setTeam((prev) => [
      ...prev,
      { id: `team-${Date.now()}`, name: "", role: "(Director)", bio: "", image: "" },
    ]);
    toast.success("New team leader added!");
  };

  const removeTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((tm) => tm.id !== id));
    toast.success("Leader removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { teamTitle, team };
      const res = await fetch("/api/pages/our-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "leadership", content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Team section saved!");
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
        title="3. Meet the Team Section ('Meet the Visionaries')"
        description="Manage the team section heading and leadership cards (RS Kumar, MS Kumar, JS Kumar) with Add/Remove buttons."
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
            label="Section Title"
            value={teamTitle}
            onChange={(e) => setTeamTitle(e.target.value)}
          />

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Leadership Cards ({team.length} Leaders)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Manage leadership portraits, designations & bio copy
                </p>
              </div>
              <button
                type="button"
                onClick={addTeamMember}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Leader
              </button>
            </div>

            <div className="space-y-4">
              {team.map((member, idx) => (
                <div
                  key={member.id}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Leader Card #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTeamMember(member.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Leader Name"
                      value={member.name}
                      onChange={(e) => handleTeamChange(member.id, "name", e.target.value)}
                      placeholder="e.g. RS KUMAR"
                    />
                    <InputField
                      label="Role / Designation"
                      value={member.role}
                      onChange={(e) => handleTeamChange(member.id, "role", e.target.value)}
                      placeholder="e.g. (Founder)"
                    />
                  </div>

                  <TextAreaField
                    label="Leader Bio Paragraph"
                    value={member.bio}
                    onChange={(e) => handleTeamChange(member.id, "bio", e.target.value)}
                    rows={3}
                  />

                  <ImageUploadField
                    label="Leader Portrait Photo"
                    value={member.image}
                    onChange={(val) => handleTeamChange(member.id, "image", val)}
                  />
                </div>
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
