"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column } from "@/components/DataTable";
import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { SelectField } from "@/components/SelectField";
import { ImagePickerField } from "@/components/ImagePickerField";
import { SaveButton } from "@/components/SaveButton";
import { useCMSStore } from "@/lib/cms-store";
import { ProductItem } from "@/lib/mock-data/initialData";
import toast from "react-hot-toast";

export default function ProductsCMSPage() {
  const { products, saveProducts } = useCMSStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ProductItem, "id">>({
    name: "",
    category: "Kirloskar Diesel Generator",
    powerRating: "",
    phase: "3 Phase",
    cooling: "Liquid Cooled",
    fuelType: "Diesel",
    description: "",
    image: "",
    status: "In Stock",
    popular: false,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Kirloskar Diesel Generator",
      powerRating: "",
      phase: "3 Phase",
      cooling: "Liquid Cooled",
      fuelType: "Diesel",
      description: "",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      status: "In Stock",
      popular: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ProductItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      powerRating: item.powerRating,
      phase: item.phase,
      cooling: item.cooling,
      fuelType: item.fuelType,
      description: item.description,
      image: item.image,
      status: item.status,
      popular: item.popular || false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (item: ProductItem) => {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      const updated = products.filter((p) => p.id !== item.id);
      saveProducts(updated);
      toast.success("Product deleted successfully");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please enter a product name");
      return;
    }

    if (editingId) {
      const updated = products.map((p) =>
        p.id === editingId ? { ...formData, id: editingId } : p
      );
      saveProducts(updated);
      toast.success("Product updated successfully!");
    } else {
      const newProduct: ProductItem = {
        ...formData,
        id: `prod-${Date.now()}`,
      };
      saveProducts([newProduct, ...products]);
      toast.success("Product added successfully!");
    }

    setIsModalOpen(false);
  };

  const columns: Column<ProductItem>[] = [
    {
      header: "Product Detail",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={row.image}
            alt={row.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <div className="font-extrabold text-slate-900 text-xs">{row.name}</div>
            <div className="text-[10px] font-bold text-slate-400">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Power Rating",
      accessorKey: "powerRating",
    },
    {
      header: "Specs",
      cell: (row) => (
        <div className="text-[11px] text-slate-600 font-medium">
          {row.fuelType} • {row.phase}
        </div>
      ),
    },
    {
      header: "Availability",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
            row.status === "In Stock"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-amber-50 text-amber-600 border border-amber-200"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Products Catalogue Management"
        description="Add, edit, and organize Kirloskar Silent Diesel Generators, Gas Generators, Portable Gensets, AMF & LT Panels."
      />

      <DataTable
        title="All Products Fleet"
        description={`${products.length} Products registered in system`}
        data={products}
        columns={columns}
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
        addLabel="Add Product"
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900">
                {editingId ? "Edit Product" : "Add New Product"}
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
                label="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kirloskar CPCB IV+ 125 kVA Silent DG Set"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as any })
                  }
                  options={[
                    { label: "Kirloskar Diesel Generator", value: "Kirloskar Diesel Generator" },
                    { label: "Kirloskar Gas Generator", value: "Kirloskar Gas Generator" },
                    { label: "Portable Generator", value: "Portable Generator" },
                    { label: "AMF & LT Panels", value: "AMF & LT Panels" },
                    { label: "Servo Stabilizers", value: "Servo Stabilizers" },
                    { label: "Transformers", value: "Transformers" },
                  ]}
                />

                <InputField
                  label="Power Rating"
                  value={formData.powerRating}
                  onChange={(e) =>
                    setFormData({ ...formData, powerRating: e.target.value })
                  }
                  placeholder="e.g. 125 kVA"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="Phase"
                  value={formData.phase}
                  onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                  placeholder="e.g. 3 Phase"
                />

                <InputField
                  label="Fuel Type"
                  value={formData.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                  placeholder="e.g. Diesel / PNG"
                />

                <SelectField
                  label="Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                  options={[
                    { label: "In Stock", value: "In Stock" },
                    { label: "Available on Order", value: "Available on Order" },
                    { label: "Out of Stock", value: "Out of Stock" },
                  ]}
                />
              </div>

              <TextAreaField
                label="Product Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />

              <ImagePickerField
                label="Product Image URL"
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
                <SaveButton label={editingId ? "Update Product" : "Save Product"} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
