"use client";

import { useState } from "react";
import { Eye, EyeOff, Save } from "lucide-react";
import toast from "react-hot-toast";

function PasswordInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "••••••••"}
        className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white transition"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

const ADMIN_EMAIL = "admin@kumarpower.com";

export default function ProfileSettingsCMSPage() {
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChangePassword = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (passwords.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (passwords.currentPassword === passwords.newPassword) {
      toast.error("New password must be different from the current password");
      return;
    }

    setIsSavingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: ADMIN_EMAIL,
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Password updated successfully!");
        setPasswords({ currentPassword: "", newPassword: "" });
      } else {
        toast.error(data.message || "Password update failed");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your personal information and security settings.
        </p>
      </div>

      {/* Admin Info Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100">
        <h2 className="text-base font-bold text-slate-900 mb-6">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              value="Administrator"
              readOnly
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              value={ADMIN_EMAIL}
              readOnly
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Security Settings Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100">
        <h2 className="text-base font-bold text-slate-900 mb-1">Change Password</h2>
        <p className="text-xs text-slate-400 mb-6">
          Minimum 8 characters. Use a strong, unique password.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Current Password
            </label>
            <PasswordInput
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              New Password
            </label>
            <PasswordInput
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              placeholder="Min. 8 characters"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleChangePassword}
            disabled={isSavingPassword}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2D6FBA] hover:bg-[#22548e] text-white text-sm font-semibold rounded-full transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {isSavingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
