import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          <div className="xl:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">
                S
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 font-bold">
                  Sri Lanka Education
                </p>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  SIPSARA<span className="text-blue-600">NOTES</span>
                </h2>
              </div>
            </div>

            <p className="text-slate-600 leading-7 max-w-xl">
              A modern digital learning platform for Sri Lankan O/L and A/L students.
              Access notes, past papers, and expert academic guidance in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
                O/L Resources
              </span>
              <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold">
                A/L Materials
              </span>
              <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold">
                Expert Guidance
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-600 hover:text-blue-600 font-semibold transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-slate-600 hover:text-blue-600 font-semibold transition">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/papers" className="text-slate-600 hover:text-blue-600 font-semibold transition">
                  Papers
                </Link>
              </li>
              <li>
                <Link
                  to="/professionals"
                  className="text-slate-600 hover:text-blue-600 font-semibold transition"
                >
                  Professionals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 mb-5">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-semibold transition">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-slate-600 hover:text-blue-600 font-semibold transition"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-600 hover:text-blue-600 font-semibold transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-600 hover:text-blue-600 font-semibold transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} SipsaraNotes Sri Lanka. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              Modern Learning
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              Student Focused
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}