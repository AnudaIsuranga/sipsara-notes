import { useState, useEffect } from "react";
import axios from "axios";

export default function Professionals() {
  const [teachers, setTeachers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/teachers/`)
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Error fetching professionals:", err));
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Our <span className="text-blue-600">Professionals</span>
          </h1>
          <p className="text-gray-600 text-lg">Learn from the best educators in the country.</p>
        </div>

        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teachers.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {t.subject}
                  </div>
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 uppercase tracking-tight">
                    {t.name}
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-6 h-20 overflow-y-auto italic">
                    "{t.description}"
                  </p>

                  <div className="flex items-center justify-between border-t pt-6">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Contact Info</p>
                      <p className="text-gray-900 font-black">{t.contact}</p>
                    </div>

                    <a
                      href={`tel:${t.contact}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-md active:scale-95"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-medium">No professionals added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}