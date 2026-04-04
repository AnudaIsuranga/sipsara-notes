import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200 transition-transform group-hover:scale-105">
                S
              </div>
              <div className="absolute -inset-1 bg-blue-500/10 blur-xl rounded-2xl -z-10"></div>
            </div>

            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400 font-bold">
                Sri Lanka Education
              </div>
              <div className="text-2xl font-black tracking-tight text-slate-900">
                SIPSARA<span className="text-blue-600">NOTES</span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <NavLink to="/" active={isActive("/")} label="Home" />
                <NavLink to="/notes" active={isActive("/notes")} label="Notes" />
                <NavLink to="/papers" active={isActive("/papers")} label="Papers" />
                <NavLink
                  to="/professionals"
                  active={isActive("/professionals")}
                  label="Professionals"
                />

                <div className="w-px h-8 bg-slate-200 mx-2"></div>

                {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    className={`px-4 py-2.5 rounded-2xl font-black transition ${
                      isActive("/admin")
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition ${
                      isActive("/dashboard")
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 text-slate-900 font-black flex items-center justify-center text-sm shadow-sm">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="font-black max-w-[120px] truncate">{user.name}</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="ml-2 px-5 py-2.5 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-black transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className={`px-5 py-2.5 rounded-2xl font-bold transition ${
                    isActive("/login")
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-11 h-11 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-current rounded"></span>
              <span className="block w-5 h-0.5 bg-current rounded"></span>
              <span className="block w-5 h-0.5 bg-current rounded"></span>
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-5">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-4 space-y-3">
              {user ? (
                <>
                  <MobileNavLink to="/" label="Home" onClick={closeMobile} />
                  <MobileNavLink to="/notes" label="Notes" onClick={closeMobile} />
                  <MobileNavLink to="/papers" label="Papers" onClick={closeMobile} />
                  <MobileNavLink
                    to="/professionals"
                    label="Professionals"
                    onClick={closeMobile}
                  />

                  {user.role === "admin" ? (
                    <MobileNavLink to="/admin" label="Admin Panel" onClick={closeMobile} />
                  ) : (
                    <MobileNavLink
                      to="/dashboard"
                      label="My Dashboard"
                      onClick={closeMobile}
                    />
                  )}

                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 text-slate-900 font-black flex items-center justify-center">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-slate-900 truncate">{user.name}</p>
                        <p className="text-sm text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-black transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <MobileNavLink to="/login" label="Login" onClick={closeMobile} />
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="block text-center py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2.5 rounded-2xl font-bold transition ${
        active
          ? "bg-slate-900 text-white shadow-md"
          : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-3 px-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-100 transition"
    >
      {label}
    </Link>
  );
}