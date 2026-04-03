import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  if (!user) return <p className="text-center mt-20 text-gray-600">Please log in to view your profile.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Profile Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-fit">
            <div className="flex flex-col items-center text-center">
              {/* Auto-generated Avatar (First letter of their name) */}
              <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-5xl font-bold mb-4 shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 mb-4">{user.email}</p>
              
              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                {user.role} Account
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Dashboard Content & Settings */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Welcome / Instructions Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 border-l-4 border-l-blue-500">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to SipsaraNotes!</h3>
              <p className="text-gray-600">
                You now have full access to our educational database. Click on the <strong>Notes</strong> tab in the navigation bar above to start searching, viewing, and downloading PDF materials for your studies.
              </p>
            </div>

            {/* Account Security (Change Password) Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Account Security</h3>
              
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Current Password</label>
                  <input 
                    type="password" 
                    required 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">New Password</label>
                  <input 
                    type="password" 
                    required 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Create a new password"
                  />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold transition duration-200 mt-2">
                  Update Password
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}