import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg">
              S
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">
              SIPSARA<span className="text-blue-600">NOTES</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {user ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-blue-600 font-bold transition">
                  Home
                </Link>
                <Link to="/notes" className="text-gray-600 hover:text-blue-600 font-bold transition">
                  Notes
                </Link>
                <Link to="/papers" className="text-gray-600 hover:text-blue-600 font-bold transition">
                  Papers
                </Link>
                <Link
                  to="/professionals"
                  className="text-gray-600 hover:text-blue-600 font-bold transition"
                >
                  Professionals
                </Link>

                <div className="h-6 w-[1px] bg-gray-200"></div>

                {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold border border-blue-100 hover:bg-blue-100"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link to="/dashboard" className="text-gray-900 font-black flex items-center space-x-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                      👤
                    </div>
                    <span>{user.name}</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-black transition shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 font-bold hover:text-blue-600 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-black hover:bg-blue-700 transition shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}