import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 1. Get the dynamic API URL from your Vercel Environment Variables
  const API_URL = import.meta.env.VITE_API_URL;

  // Data Lists
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Note Upload States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Note");
  const [medium, setMedium] = useState("Sinhala");
  const [selectedLevel, setSelectedLevel] = useState("O/L"); 
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState(null); 

  // Teacher Upload States
  const [tName, setTName] = useState("");
  const [tSubject, setTSubject] = useState("");
  const [tContact, setTContact] = useState("");
  const [tDesc, setTDesc] = useState("");
  const [tPhoto, setTPhoto] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Security: Kick out non-admins
  useEffect(() => { 
    if (!user || user.role !== "admin") navigate("/"); 
  }, [user, navigate]);

  // Main Data Fetcher
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, nRes, tRes] = await Promise.all([
          axios.get(`${API_URL}/api/subjects/`),
          axios.get(`${API_URL}/api/notes/`),
          axios.get(`${API_URL}/api/teachers/`)
        ]);
        
        setSubjects(sRes.data); 
        setNotes(nRes.data); 
        setTeachers(tRes.data);
        
        setSelectedSubject(prev => {
          if (prev) return prev;
          const filtered = sRes.data.filter(s => s.level === selectedLevel);
          return filtered.length > 0 ? filtered[0]._id : "";
        });
      } catch (err) { 
        console.error("Fetch error:", err); 
      }
    };
    fetchData();
  }, [refreshTrigger, selectedLevel, API_URL]);

  const handleNoteUpload = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title); 
    fd.append("category", category);
    fd.append("medium", medium); 
    fd.append("subject", selectedSubject);
    if (file) fd.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/notes/add`, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("✅ Content Uploaded successfully!");
      setTitle(""); setFile(null); setRefreshTrigger(p => p + 1);
    } catch (err) { 
      console.error("Upload error:", err);
      alert("❌ Upload Failed. Check file size or connection."); 
    }
  };

  const handleTeacherUpload = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", tName); 
    fd.append("subject", tSubject);
    fd.append("contact", tContact); 
    fd.append("description", tDesc);
    if (tPhoto) fd.append("photo", tPhoto);

    try {
      await axios.post(`${API_URL}/api/teachers/add`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("✅ Professional Added to Cloud!");
      setTName(""); setTSubject(""); setTContact(""); setTDesc(""); setTPhoto(null);
      setRefreshTrigger(p => p + 1);
    } catch (err) { 
      console.error("Teacher add error:", err);
      alert("❌ Failed to add professional"); 
    }
  };

  const deleteTeacher = async (id) => {
    if (window.confirm("Remove this professional from the cloud?")) {
      try {
        await axios.delete(`${API_URL}/api/teachers/${id}`);
        setRefreshTrigger(p => p + 1);
      } catch (err) { 
        console.error("Delete error:", err);
        alert("Delete failed"); 
      }
    }
  };

  const deleteNote = async (id) => {
    if (window.confirm("Delete this content permanently?")) {
      try {
        await axios.delete(`${API_URL}/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setRefreshTrigger(p => p + 1);
      } catch (err) {
        console.error("Note delete error:", err);
      }
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 space-y-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LECTURER FORM */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-600">
          <h2 className="text-3xl font-black mb-8 text-gray-800">Add Professional</h2>
          <form onSubmit={handleTeacherUpload} className="space-y-4">
            <input type="text" placeholder="Lecturer Name" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={tName} onChange={e => setTName(e.target.value)} required />
            <input type="text" placeholder="Subject Specialty" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={tSubject} onChange={e => setTSubject(e.target.value)} required />
            <input type="text" placeholder="Contact Phone" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={tContact} onChange={e => setTContact(e.target.value)} required />
            <textarea placeholder="Description / Bio" className="w-full border p-3 rounded-xl h-24 focus:ring-2 focus:ring-blue-500 outline-none" value={tDesc} onChange={e => setTDesc(e.target.value)} required />
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300">
              <label className="block text-sm font-bold text-gray-600 mb-2">Profile Photo (Will save to Cloudinary)</label>
              <input type="file" accept="image/*" onChange={e => setTPhoto(e.target.files[0])} required className="text-sm" />
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition transform active:scale-95">Save Professional</button>
          </form>
        </div>

        {/* CONTENT UPLOAD FORM */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-green-600">
          <h2 className="text-3xl font-black mb-8 text-gray-800">Upload Note / Paper</h2>
          <form onSubmit={handleNoteUpload} className="space-y-4">
            <input type="text" placeholder="File Title" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <select value={category} onChange={e => setCategory(e.target.value)} className="border p-3 rounded-xl font-bold bg-green-50">
                <option value="Note">Upload as Note</option>
                <option value="Paper">Upload as Paper</option>
              </select>
              <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)} className="border p-3 rounded-xl font-bold bg-blue-50">
                <option value="O/L">GCE O/L</option>
                <option value="A/L">GCE A/L</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="border p-3 rounded-xl outline-none" required>
                {subjects.filter(s => s.level === selectedLevel).map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
              <select value={medium} onChange={e => setMedium(e.target.value)} className="border p-3 rounded-xl outline-none">
                <option value="Sinhala">Sinhala</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300">
              <label className="block text-sm font-bold text-gray-600 mb-2">PDF Document</label>
              <input type="file" accept="application/pdf" className="text-sm" onChange={e => setFile(e.target.files[0])} required />
            </div>
            <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-green-700 transition transform active:scale-95">Upload to Cloud</button>
          </form>
        </div>
      </div>

      {/* MANAGE PROFESSIONALS */}
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-black mb-8 text-gray-800">Current Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(t => (
            <div key={t._id} className="flex items-center justify-between p-4 border rounded-2xl bg-gray-50 hover:shadow-md transition">
              <div className="flex items-center space-x-4">
                {/* FIXED: Using Cloudinary full URL directly */}
                <img src={t.photo} className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white" alt={t.name} />
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-blue-600 font-bold uppercase">{t.subject}</p>
                </div>
              </div>
              <button onClick={() => deleteTeacher(t._id)} className="text-red-500 hover:text-red-700 font-bold px-3 py-1">Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* MANAGE CONTENT (NOTES/PAPERS) */}
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-black mb-8 text-gray-800">Manage Uploaded Files</h2>
        <div className="space-y-3">
          {notes.map(n => (
            <div key={n._id} className="border-b py-4 flex justify-between items-center hover:bg-gray-50 transition px-4 rounded-xl">
              <div>
                <p className="font-bold text-gray-900 text-lg">{n.title}</p>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-tight">
                  <span className={n.category === "Note" ? "text-blue-600" : "text-red-600"}>{n.category}</span> • {n.subject?.name} ({n.subject?.level})
                </p>
              </div>
              <button onClick={() => deleteNote(n._id)} className="bg-red-50 text-red-500 font-bold py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}