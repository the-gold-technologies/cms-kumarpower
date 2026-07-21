"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { ImageUploadField } from "@/components/ImageUploadField";
import { SectionHeader } from "@/components/SectionHeader";
import { SaveButton } from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
};

export function OurStorySectionCMS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [storyTitle, setStoryTitle] = useState("");
  const [storySub, setStorySub] = useState("");
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch("/api/pages/our-profile")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const story = json.data.story || {};
          if (story.storyTitle !== undefined) setStoryTitle(story.storyTitle);
          if (story.storySub !== undefined) setStorySub(story.storySub);
          if (Array.isArray(story.timeline)) setTimeline(story.timeline);
        }
      })
      .catch(console.error);
  }, []);

  const handleTimelineChange = (id: string, field: keyof TimelineItem, val: string) => {
    setTimeline((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
  };

  const addTimelineItem = () => {
    setTimeline((prev) => [
      ...prev,
      { id: `time-${Date.now()}`, year: "2024", title: "", description: "", image: "" },
    ]);
    toast.success("New milestone added!");
  };

  const removeTimelineItem = (id: string) => {
    setTimeline((prev) => prev.filter((t) => t.id !== id));
    toast.success("Milestone removed");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { storyTitle, storySub, timeline };
      const res = await fetch("/api/pages/our-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "story", content: payload }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Story section saved!");
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
        title="2. Our Story & Timeline Section"
        description="Manage the timeline story section title, subtitle, and dynamic milestone cards (Add/Remove)."
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
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
          />
          <TextAreaField
            label="Section Subtitle"
            value={storySub}
            onChange={(e) => setStorySub(e.target.value)}
            rows={2}
          />

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                  Timeline Milestones ({timeline.length} items)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Click 'Add Milestone Card' to add new timeline events
                </p>
              </div>
              <button
                type="button"
                onClick={addTimelineItem}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Milestone
              </button>
            </div>

            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6FBA] bg-blue-50 px-2 py-0.5 rounded-md">
                      Milestone #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTimelineItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Year Badge"
                      value={item.year}
                      onChange={(e) => handleTimelineChange(item.id, "year", e.target.value)}
                      placeholder="e.g. 1995"
                    />
                    <InputField
                      label="Milestone Title"
                      value={item.title}
                      onChange={(e) => handleTimelineChange(item.id, "title", e.target.value)}
                      placeholder="e.g. Foundation"
                    />
                  </div>

                  <TextAreaField
                    label="Milestone Description"
                    value={item.description}
                    onChange={(e) =>
                      handleTimelineChange(item.id, "description", e.target.value)
                    }
                    rows={2}
                  />

                  <ImageUploadField
                    label="Milestone Image"
                    value={item.image}
                    onChange={(val) => handleTimelineChange(item.id, "image", val)}
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
