import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

function BenefitCard({ icon, title, text }) {
  return (
    <div className="group flex items-start gap-4 rounded-[1.75rem] border border-white/60 bg-white/60 p-5 backdrop-blur-xl shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(37,99,235,0.12)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-black text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rightElement,
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
            type={type}
            required
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-2xl bg-transparent px-4 py-4 text-slate-900 outline-none placeholder:text-slate-400"
          />
          {rightElement ? <div className="pr-3">{rightElement}</div> : null}
        </div>
      </div>
    </div>
  );
}

function ButtonSpinner() {
  return (
    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      login(response.data);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom_right,#eff6ff,white,#eef2ff)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="absolute left-[-90px] top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-[-90px] bottom-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.10),transparent_24%)]" />

      <div className="relative mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-blue-600 backdrop-blur-xl shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Start Learning
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-slate-900 xl:text-6xl">
              Create your
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 bg-clip-text text-transparent">
                student account
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-500">
              Join a premium digital learning platform built for Sri Lankan O/L and
              A/L students who want better access to notes, papers, and expert support.
            </p>

            <div className="mt-10 space-y-4">
              <BenefitCard
                icon="✅"
                title="Quick access to resources"
                text="Explore notes, papers, and study materials in one place."
              />
              <BenefitCard
                icon="🎓"
                title="Built for exam success"
                text="Study smarter with a clean and organized learning experience."
              />
              <BenefitCard
                icon="⚡"
                title="Fast and modern platform"
                text="Use a smooth student-friendly interface designed for focus."
              />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 px-6 py-8 text-white sm:px-8">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              <p className="relative text-xs font-black uppercase tracking-[0.22em] text-blue-100">
                New Account
              </p>
              <h2 className="relative mt-3 text-4xl font-black tracking-tight">
                Register
              </h2>
              <p className="relative mt-3 text-sm leading-7 text-blue-100">
                Create your account and unlock premium study resources.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleRegister} className="space-y-5">
                <InputField
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />

                <InputField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />

                <InputField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="rounded-xl px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  }
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-black text-white shadow-lg shadow-blue-200 transition-all duration-300 ${
                    isLoading
                      ? "cursor-not-allowed bg-gradient-to-r from-blue-400 to-indigo-400"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <ButtonSpinner />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                  SipsaraNotes
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4 text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-black text-blue-600 transition hover:text-indigo-600"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Join a smarter learning platform today
          </p>
        </div>
      </div>
    </div>
  );
}