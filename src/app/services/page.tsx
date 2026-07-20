"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SaveButton } from "@/components/SaveButton";
import { useCMSStore } from "@/lib/cms-store";
import { ServiceItem } from "@/lib/mock-data/initialData";
import toast from "react-hot-toast";

export default function ServicesCMSPage() {
  const { services, saveServices } = useCMSStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ServiceItem, "id">>({
    title: "",
    slug: "",
    icon: "ShieldCheck",
    shortDesc: "",
    fullDesc: "",
    features: ["24/7 Breakdown Response", "OEM Genuine Spares"],
    turnaroundTime: "Within 2 Hours",
    status: "Active",
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      icon: "ShieldCheck",
      shortDesc: "",
      fullDesc: "",
      features: ["24/7 Breakdown Response", "OEM Genuine Spares"],
      turnaroundTime: "Within 2 Hours",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      icon: item.icon,
      shortDesc: item.shortDesc,
      fullDesc: item.fullDesc,
      features: item.features,
      turnaroundTime: item.turnaroundTime,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (item: ServiceItem) => {
    if (confirm(`Delete service "${item.title}"?`)) {
      const updated = services.filter((s) => s.id !== item.id);
      saveServices(updated);
      toast.success("Service deleted");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Please enter a service title");
      return;
    }

    if (editingId) {
      const updated = services.map((s) =>
        s.id === editingId ? { ...formData, id: editingId } : s
      );
      saveServices(updated);
      toast.success("Service updated!");
    } else {
      const newService: ServiceItem = {
        ...formData,
        id: `serv-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      };
      saveServices([newService, ...services]);
      toast.success("Service added!");
    }

    setIsModalOpen(false);
  };

  const columns: Column<ServiceItem>[] = [
    {
      header: "Service Title",
      cell: (row) => (
        <div>
          <div className="font-extrabold text-slate-900 text-xs">{row.title}</div>
          <div className="text-[10px] text-slate-400 font-mono">/{row.slug}</div>
        </div>
      ),
    },
    {
      header: "Short Description",
      cell: (row) => (
        <div className="text-[11px] text-slate-600 line-clamp-2 max-w-xs">
          {row.shortDesc}
        </div>
      ),
    },
    {
      header: "Turnaround SLA",
      accessorKey: "turnaroundTime",
    },
    {
      header: "Status",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Services Management"
        description="Configure AMC offerings, installation, generator repair, emergency breakdown response SLAs."
      />

      <DataTable
        title="Service Offerings"
        description={`${services.length} Active services listed`}
        data={services}
        columns={columns}
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
        addLabel="Add Service"
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900">
                {editingId ? "Edit Service" : "Add Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <InputField
                label="Service Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Annual Maintenance Contract (AMC)"
                required
              />

              <InputField
                label="Turnaround Response SLA"
                value={formData.turnaroundTime}
                onChange={(e) =>
                  setFormData({ ...formData, turnaroundTime: e.target.value })
                }
                placeholder="e.g. Within 2 Hours (Delhi NCR)"
              />

              <TextAreaField
                label="Short Description"
                value={formData.shortDesc}
                onChange={(e) =>
                  setFormData({ ...formData, shortDesc: e.target.value })
                }
                rows={2}
              />

              <TextAreaField
                label="Full Service Details"
                value={formData.fullDesc}
                onChange={(e) =>
                  setFormData({ ...formData, fullDesc: e.target.value })
                }
                rows={4}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <SaveButton label="Save Service" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
