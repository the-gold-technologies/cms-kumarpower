"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import { ImagePickerField } from "@/components/ImagePickerField";
import { SaveButton } from "@/components/SaveButton";
import { useCMSStore } from "@/lib/cms-store";
import { RentalItem } from "@/lib/mock-data/initialData";
import toast from "react-hot-toast";

export default function RentalsCMSPage() {
  const { rentals, saveRentals } = useCMSStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<RentalItem, "id">>({
    title: "",
    kvaCapacity: "",
    fuelType: "Diesel",
    dailyRate: "",
    monthlyRate: "",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      kvaCapacity: "",
      fuelType: "Diesel",
      dailyRate: "₹ 3,500 / day",
      monthlyRate: "₹ 45,000 / month",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: RentalItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      kvaCapacity: item.kvaCapacity,
      fuelType: item.fuelType,
      dailyRate: item.dailyRate,
      monthlyRate: item.monthlyRate,
      availability: item.availability,
      image: item.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (item: RentalItem) => {
    if (confirm(`Delete rental fleet item "${item.title}"?`)) {
      const updated = rentals.filter((r) => r.id !== item.id);
      saveRentals(updated);
      toast.success("Rental unit removed!");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Please enter a title");
      return;
    }

    if (editingId) {
      const updated = rentals.map((r) =>
        r.id === editingId ? { ...formData, id: editingId } : r
      );
      saveRentals(updated);
      toast.success("Rental unit updated!");
    } else {
      const newRental: RentalItem = {
        ...formData,
        id: `rent-${Date.now()}`,
      };
      saveRentals([newRental, ...rentals]);
      toast.success("Rental unit added!");
    }

    setIsModalOpen(false);
  };

  const columns: Column<RentalItem>[] = [
    {
      header: "Fleet Unit",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.image}
            alt={row.title}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <div className="font-extrabold text-slate-900 text-xs">{row.title}</div>
            <div className="text-[10px] text-slate-400 font-bold">{row.kvaCapacity} Capacity</div>
          </div>
        </div>
      ),
    },
    {
      header: "Daily Rate",
      accessorKey: "dailyRate",
    },
    {
      header: "Monthly Rate",
      accessorKey: "monthlyRate",
    },
    {
      header: "Availability",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
            row.availability === "Available"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : row.availability === "On Hire"
              ? "bg-blue-50 text-[#2D6FBA] border border-blue-200"
              : "bg-rose-50 text-rose-600 border border-rose-200"
          }`}
        >
          {row.availability}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Generator Rentals Fleet"
        description="Manage silent diesel generator rental fleet, kVA capacities, daily/monthly rates, and hire availability."
      />

      <DataTable
        title="Rental Fleet Catalog"
        description={`${rentals.length} Generator units in rental inventory`}
        data={rentals}
        columns={columns}
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
        addLabel="Add Rental Unit"
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900">
                {editingId ? "Edit Rental Unit" : "Add Rental Unit"}
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
                label="Rental Unit Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 62.5 kVA Soundproof Genset on Hire"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="kVA Capacity"
                  value={formData.kvaCapacity}
                  onChange={(e) =>
                    setFormData({ ...formData, kvaCapacity: e.target.value })
                  }
                  placeholder="e.g. 62.5 kVA"
                />

                <SelectField
                  label="Availability Status"
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value as any })
                  }
                  options={[
                    { label: "Available", value: "Available" },
                    { label: "On Hire", value: "On Hire" },
                    { label: "Maintenance", value: "Maintenance" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Daily Hire Rate"
                  value={formData.dailyRate}
                  onChange={(e) =>
                    setFormData({ ...formData, dailyRate: e.target.value })
                  }
                  placeholder="e.g. ₹ 4,500 / day"
                />

                <InputField
                  label="Monthly Hire Rate"
                  value={formData.monthlyRate}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyRate: e.target.value })
                  }
                  placeholder="e.g. ₹ 65,000 / month"
                />
              </div>

              <ImagePickerField
                label="Genset Image"
                value={formData.image}
                onChange={(val) => setFormData({ ...formData, image: val })}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <SaveButton label="Save Unit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
