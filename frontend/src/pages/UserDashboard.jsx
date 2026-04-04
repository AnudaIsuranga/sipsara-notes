import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-100/60 blur-2xl transition-all duration-300 group-hover:bg-blue-200/80" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
          {icon}
        </div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
          {title}
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
          {value}
        </h3>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, text }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
        {icon}
      </div>
      <h3 className="text-xl font-black tracking-tight text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>
      <div className="group relative">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-indigo-500/0 opacity-0 blur-xl transition-opacity duration-300 group-focus-within:opacity-100" />
        <div className="relative flex items-center rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-300 group-focus-within:border-blue-500 group-focus-within:bg-white group-focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.08)]">
          <input
            type={show ? "text" : "password"}
            required
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-2xl bg-transparent px-4 py-4 text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={onToggle}
            className="mr-3 rounded-xl px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[linear-gradient(to_bottom,#f8fbff,white)] px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
          <p className="text-xl font-bold text-slate-500">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#f8fbff,white)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 px-6 py-10 text-white md:px-10 md:py-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-100">
                  Student Dashboard
                </p>
                <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                  Welcome back, {user.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
                  Manage your profile, keep your account secure, and continue
                  learning with premium educational resources.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.15em] text-white backdrop-blur-md">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-xs text-slate-900">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                {user.role} Account
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            icon="👤"
            title="Profile"
            value={user.name}
            subtitle="Your registered student account"
          />
          <StatCard
            icon="📧"
            title="Email"
            value={user.email}
            subtitle="Connected email for login and access"
          />
          <StatCard
            icon="🎓"
            title="Account Type"
            value={user.role}
            subtitle="Premium learning access enabled"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
                    Overview
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                    Your Learning Space
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
                  ✨
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <p className="text-base leading-8 text-slate-600">
                  You now have access to a modern digital learning platform with
                  notes, past papers, and professional academic guidance. Use the
                  navigation bar to browse resources and continue your preparation
                  with confidence.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <QuickActionCard
                  icon="📘"
                  title="Explore Notes"
                  text="Find subject-wise study materials prepared for better revision."
                />
                <QuickActionCard
                  icon="📄"
                  title="Practice Papers"
                  text="Access past papers and improve your exam confidence."
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">
                    Security
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                    Update Password
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
                  🔒
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-5 max-w-2xl">
                <PasswordInput
                  label="Current Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  show={showOld}
                  onToggle={() => setShowOld((prev) => !prev)}
                  placeholder="Enter current password"
                />

                <PasswordInput
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  show={showNew}
                  onToggle={() => setShowNew((prev) => !prev)}
                  placeholder="Enter new password"
                />

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-black text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 md:w-auto"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">
                  Profile Card
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">
                  Student Identity
                </h3>
              </div>

              <div className="p-6 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 text-4xl font-black text-white shadow-xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <h4 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
                  {user.name}
                </h4>
                <p className="mt-2 text-slate-500">{user.email}</p>

                <div className="mt-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-black uppercase tracking-[0.15em] text-green-700">
                  Active {user.role}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-400">
                Tips
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                Study Better
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-[1.25rem] bg-slate-50 p-4">
                  <p className="text-sm font-bold leading-7 text-slate-600">
                    Use subject-wise notes to keep revision focused and structured.
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-slate-50 p-4">
                  <p className="text-sm font-bold leading-7 text-slate-600">
                    Practice regularly with past papers to improve exam speed.
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-slate-50 p-4">
                  <p className="text-sm font-bold leading-7 text-slate-600">
                    Keep your password secure and update it when needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}