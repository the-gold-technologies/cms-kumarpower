"use client";

import React, { useState } from "react";
import { Search, Plus, Trash2, Edit3, Eye, ArrowUpDown } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  addLabel?: string;
}

export function DataTable<T extends { id: string }>({
  title,
  description,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  addLabel = "Add Item",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-xl text-slate-900 tracking-tight">{title}</h3>
          {description && (
            <p className="text-xs font-medium text-slate-400 mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#2D6FBA] focus:outline-none w-48 sm:w-64"
            />
          </div>

          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 bg-[#2D6FBA] hover:bg-blue-600 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-md shadow-[#2D6FBA]/20 cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{addLabel}</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase tracking-wider bg-slate-50/50">
              {columns.map((col, idx) => (
                <th key={idx} className="py-3.5 px-4">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="py-3.5 px-4 text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="py-12 text-center text-slate-400 italic text-xs"
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="py-4 px-4 text-slate-800">
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? (row[col.accessorKey] as any)
                        : null}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="py-4 px-4 text-right space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-[#2D6FBA] hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
