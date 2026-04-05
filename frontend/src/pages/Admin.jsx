import { DashboardStatSkeleton } from "../components/Skeletons";
import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

function ButtonSpinner() {
  return (
    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Note");
  const [medium, setMedium] = useState("Sinhala");
  const [selectedLevel, setSelectedLevel] = useState("O/L");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState(null);

  const [tName, setTName] = useState("");
  const [tSubject, setTSubject] = useState("");
  const [tContact, setTContact] = useState("");
  const [tDesc, setTDesc] = useState("");
  const [tPhoto, setTPhoto] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState("upload");
  const [loading, setLoading] = useState(true);

  const [isUploadingNote, setIsUploadingNote] = useState(false);
  const [isUploadingTeacher, setIsUploadingTeacher] = useState(false);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [sRes, nRes, tRes] = await Promise.all([
          axios.get(`${API_URL}/api/subjects`),
          axios.get(`${API_URL}/api/notes`),
          axios.get(`${API_URL}/api/teachers`),
        ]);

        setSubjects(sRes.data);
        setNotes(nRes.data);
        setTeachers(tRes.data);

        setSelectedSubject((prev) => {
          if (prev) return prev;
          const filtered = sRes.data.filter((s) => s.level === selectedLevel);
          return filtered.length > 0 ? filtered[0]._id : "";
        });
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger, selectedLevel, API_URL]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => s.level === selectedLevel);
  }, [subjects, selectedLevel]);

  const noteCount = notes.filter((n) => n.category === "Note").length;
  const paperCount = notes.filter((n) => n.category === "Paper").length;

  const handleNoteUpload = async (e) => {
    e.preventDefault();
    if (isUploadingNote) return;

    if (!file) {
      toast.error("Please choose a PDF file.");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("category", category);
    fd.append("medium", medium);
    fd.append("subject", selectedSubject);
    fd.append("file", file);

    const uploadToast = toast.loading("Uploading PDF...");

    try {
      setIsUploadingNote(true);
      const token = localStorage.getItem("token");

      await axios.post(`${API_URL}/api/notes/add`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("PDF uploaded successfully!", { id: uploadToast });
      setTitle("");
      setCategory("Note");
      setMedium("Sinhala");
      setFile(null);
      setRefreshTrigger((p) => p + 1);
    } catch (err) {
      console.error("PDF upload error:", err);
      toast.error(err.response?.data?.message || "PDF upload failed", {
        id: uploadToast,
      });
    } finally {
      setIsUploadingNote(false);
    }
  };

  const handleTeacherUpload = async (e) => {
    e.preventDefault();
    if (isUploadingTeacher) return;

    if (!tPhoto) {
      toast.error("Please choose a teacher photo.");
      return;
    }

    const fd = new FormData();
    fd.append("name", tName);
    fd.append("subject", tSubject);
    fd.append("contact", tContact);
    fd.append("description", tDesc);
    fd.append("photo", tPhoto);

    const uploadToast = toast.loading("Saving professional...");

    try {
      setIsUploadingTeacher(true);
      const token = localStorage.getItem("token");

      await axios.post(`${API_URL}/api/teachers/add`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Professional added successfully!", { id: uploadToast });
      setTName("");
      setTSubject("");
      setTContact("");
      setTDesc("");
      setTPhoto(null);
      setRefreshTrigger((p) => p + 1);
    } catch (err) {
      console.error("Teacher add error:", err);
      toast.error(err.response?.data?.message || "Failed to add professional", {
        id: uploadToast,
      });
    } finally {
      setIsUploadingTeacher(false);
    }
  };

  const deleteTeacher = async (id) => {
    if (deletingTeacherId) return;
    if (!window.confirm("Remove this professional?")) return;

    const deleteToast = toast.loading("Removing professional...");

    try {
      setDeletingTeacherId(id);
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Professional removed successfully!", { id: deleteToast });
      setRefreshTrigger((p) => p + 1);
    } catch (err) {
      console.error("Delete teacher error:", err);
      toast.error(err.response?.data?.message || "Delete failed", {
        id: deleteToast,
      });
    } finally {
      setDeletingTeacherId(null);
    }
  };

  const deleteNote = async (id) => {
    if (deletingNoteId) return;
    if (!window.confirm("Delete this file permanently?")) return;

    const deleteToast = toast.loading("Deleting file...");

    try {
      setDeletingNoteId(id);
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("File deleted successfully!", { id: deleteToast });
      setRefreshTrigger((p) => p + 1);
    } catch (err) {
      console.error("Delete note error:", err);
      toast.error(err.response?.data?.message || "Delete failed", {
        id: deleteToast,
      });
    } finally {
      setDeletingNoteId(null);
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em]">
              Admin Panel
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              SipsaraNotes Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Manage lecturers, notes, papers, and uploaded content in one place.
            </p>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-2xl px-5 py-4 shadow-lg">
            <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">
              Logged in as
            </p>
            <p className="font-black text-lg">{user.name}</p>
            <p className="text-sm text-slate-300">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <DashboardStatSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard title="Total Subjects" value={subjects.length} color="blue" icon="📚" />
            <StatCard title="Total Professionals" value={teachers.length} color="emerald" icon="👨‍🏫" />
            <StatCard title="Total Notes" value={noteCount} color="amber" icon="📝" />
            <StatCard title="Total Papers" value={paperCount} color="rose" icon="📄" />
          </div>
        )}

        <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-200 flex flex-wrap gap-3">
          <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")} label="Upload Center" />
          <TabButton active={activeTab === "teachers"} onClick={() => setActiveTab("teachers")} label="Manage Professionals" />
          <TabButton active={activeTab === "files"} onClick={() => setActiveTab("files")} label="Manage Files" />
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500 font-semibold shadow-sm">
            Loading dashboard...
          </div>
        ) : (
          <>
            {activeTab === "upload" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
                      Professionals
                    </p>
                    <h2 className="text-2xl font-black mt-1">Add New Professional</h2>
                  </div>

                  <form onSubmit={handleTeacherUpload} className="p-6 space-y-5">
                    <InputField label="Lecturer Name" value={tName} onChange={setTName} placeholder="Enter lecturer name" />
                    <InputField label="Subject Specialty" value={tSubject} onChange={setTSubject} placeholder="Ex: Combined Maths" />
                    <InputField label="Contact Phone" value={tContact} onChange={setTContact} placeholder="Enter contact number" />

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Description / Bio
                      </label>
                      <textarea
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition h-28 resize-none"
                        value={tDesc}
                        onChange={(e) => setTDesc(e.target.value)}
                        placeholder="Write a short professional description"
                        required
                      />
                    </div>

                    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Profile Photo
                      </label>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={(e) => setTPhoto(e.target.files[0])}
                        required
                        className="block w-full text-sm text-slate-600"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        Upload JPG, JPEG, PNG, or WEBP
                      </p>
                    </div>

                    <button
                      disabled={isUploadingTeacher}
                      className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-xl font-black text-white transition ${
                        isUploadingTeacher
                          ? "cursor-not-allowed bg-blue-400"
                          : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
                      }`}
                    >
                      {isUploadingTeacher ? (
                        <>
                          <ButtonSpinner />
                          Saving...
                        </>
                      ) : (
                        "Save Professional"
                      )}
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-100">
                      Documents
                    </p>
                    <h2 className="text-2xl font-black mt-1">Upload Note / Paper</h2>
                  </div>

                  <form onSubmit={handleNoteUpload} className="p-6 space-y-5">
                    <InputField label="File Title" value={title} onChange={setTitle} placeholder="Enter document title" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField
                        label="Category"
                        value={category}
                        onChange={setCategory}
                        options={[
                          { label: "Upload as Note", value: "Note" },
                          { label: "Upload as Paper", value: "Paper" },
                        ]}
                      />

                      <SelectField
                        label="Academic Level"
                        value={selectedLevel}
                        onChange={(value) => {
                          setSelectedLevel(value);
                          setSelectedSubject("");
                        }}
                        options={[
                          { label: "GCE O/L", value: "O/L" },
                          { label: "GCE A/L", value: "A/L" },
                        ]}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Subject
                        </label>
                        <select
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:bg-white transition"
                          required
                        >
                          <option value="">Select Subject</option>
                          {filteredSubjects.map((s) => (
                            <option key={s._id} value={s._id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <SelectField
                        label="Medium"
                        value={medium}
                        onChange={setMedium}
                        options={[
                          { label: "Sinhala", value: "Sinhala" },
                          { label: "English", value: "English" },
                          { label: "Tamil", value: "Tamil" },
                        ]}
                      />
                    </div>

                    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        PDF Document
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                        className="block w-full text-sm text-slate-600"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        Upload only PDF files
                      </p>
                    </div>

                    <button
                      disabled={isUploadingNote}
                      className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-xl font-black text-white transition ${
                        isUploadingNote
                          ? "cursor-not-allowed bg-emerald-400"
                          : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                      }`}
                    >
                      {isUploadingNote ? (
                        <>
                          <ButtonSpinner />
                          Uploading...
                        </>
                      ) : (
                        "Upload PDF"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "teachers" && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                      Directory
                    </p>
                    <h2 className="text-2xl font-black text-slate-900">
                      Current Professionals
                    </h2>
                  </div>
                  <div className="text-sm text-slate-500 font-semibold">
                    {teachers.length} professional{teachers.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="p-6">
                  {teachers.length === 0 ? (
                    <EmptyState text="No professionals added yet." />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {teachers.map((t) => (
                        <div
                          key={t._id}
                          className="rounded-3xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-lg transition"
                        >
                          <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-600" />
                          <div className="px-6 pb-6 -mt-14">
                            <img
                              src={t.photo}
                              alt={t.name}
                              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/200?text=No+Image";
                              }}
                            />

                            <div className="mt-4 space-y-2">
                              <h3 className="text-xl font-black text-slate-900">{t.name}</h3>
                              <p className="inline-block text-xs font-black uppercase bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                {t.subject}
                              </p>
                              <p className="text-sm text-slate-600 leading-relaxed min-h-[72px]">
                                {t.description}
                              </p>
                              <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                                <p className="text-xs uppercase font-bold tracking-widest text-slate-400">
                                  Contact
                                </p>
                                <p className="font-bold text-slate-800">{t.contact}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => deleteTeacher(t._id)}
                              disabled={deletingTeacherId === t._id}
                              className={`mt-5 flex w-full items-center justify-center gap-3 rounded-2xl py-3 font-black transition ${
                                deletingTeacherId === t._id
                                  ? "cursor-not-allowed bg-red-400 text-white"
                                  : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                              }`}
                            >
                              {deletingTeacherId === t._id ? (
                                <>
                                  <ButtonSpinner />
                                  Removing...
                                </>
                              ) : (
                                "Remove Professional"
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "files" && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                      Library
                    </p>
                    <h2 className="text-2xl font-black text-slate-900">Manage Uploaded Files</h2>
                  </div>
                  <div className="text-sm text-slate-500 font-semibold">
                    {notes.length} file{notes.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="p-6">
                  {notes.length === 0 ? (
                    <EmptyState text="No notes or papers uploaded yet." />
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {notes.map((n) => (
                        <div
                          key={n._id}
                          className="rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:shadow-md transition"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 min-w-0">
                              <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                                  n.category === "Note"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-rose-100 text-rose-700"
                                }`}
                              >
                                {n.category === "Note" ? "📝" : "📄"}
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-lg font-black text-slate-900 truncate">
                                  {n.title}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                  {n.subject?.name || "No Subject"} ({n.subject?.level || "N/A"})
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <span
                                    className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                                      n.category === "Note"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-rose-100 text-rose-700"
                                    }`}
                                  >
                                    {n.category}
                                  </span>
                                  <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-slate-200 text-slate-700">
                                    {n.medium}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => deleteNote(n._id)}
                              disabled={deletingNoteId === n._id}
                              className={`shrink-0 rounded-xl px-4 py-2 font-black transition ${
                                deletingNoteId === n._id
                                  ? "cursor-not-allowed bg-red-400 text-white"
                                  : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                              }`}
                            >
                              {deletingNoteId === n._id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  const colorMap = {
    blue: "from-blue-600 to-indigo-600",
    emerald: "from-emerald-600 to-teal-600",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-600",
  };

  return (
    <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-white">
      <div className={`h-2 bg-gradient-to-r ${colorMap[color]}`} />
      <div className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{title}</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{value}</h3>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-2xl font-black transition ${
        active
          ? "bg-slate-900 text-white shadow-md"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition"
        required
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
      <p className="text-slate-400 text-lg font-bold">{text}</p>
    </div>
  );
}