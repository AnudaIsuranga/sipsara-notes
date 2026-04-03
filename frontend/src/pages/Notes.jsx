import { useState, useEffect } from "react";
import axios from "axios";

export default function Notes() {
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [selectedSubject, setSelectedSubject] = useState(null);

  // 1. Get the dynamic API URL for Vercel
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/subjects/`);
        setSubjects(res.data);
      } catch (err) { console.error("Error loading subjects", err); }
    };
    fetchSubjects();
  }, [API_URL]);

  useEffect(() => {
    if (selectedSubject) {
      const fetchNotes = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/notes?subjectId=${selectedSubject._id}&category=Note`);
          setNotes(res.data);
        } catch (err) { console.error("Error loading notes", err); }
      };
      fetchNotes();
    }
  }, [selectedSubject, API_URL]);

  const goBack = () => {
    if (selectedSubject) setSelectedSubject(null);
    else setSelectedLevel(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & BREADCRUMBS */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => {setSelectedLevel(null); setSelectedSubject(null)}}>Library</span>
            {selectedLevel && <><span>/</span> <span className="text-gray-600">{selectedLevel}</span></>}
            {selectedSubject && <><span>/</span> <span className="text-blue-600">{selectedSubject.name}</span></>}
          </div>
          
          <div className="flex justify-between items-end">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              {selectedSubject ? selectedSubject.name : selectedLevel ? `${selectedLevel} Notes` : "Study Notes"}
            </h1>
            {selectedLevel && (
              <button onClick={goBack} className="bg-white border-2 border-gray-200 px-6 py-2 rounded-xl font-black text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">
                ← Go Back
              </button>
            )}
          </div>
        </div>

        {/* STEP 1: SELECT LEVEL */}
        {!selectedLevel && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => setSelectedLevel("O/L")} 
              className="group relative h-64 bg-blue-600 rounded-[2rem] shadow-2xl overflow-hidden cursor-pointer transform transition hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800 opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white">
                <span className="text-8xl font-black opacity-20 absolute -right-4 -bottom-4 italic">OL</span>
                <h2 className="text-6xl font-black">GCE O/L</h2>
                <p className="font-bold text-blue-100 mt-2">Ordinary Level Study Materials</p>
              </div>
            </div>

            <div 
              onClick={() => setSelectedLevel("A/L")} 
              className="group relative h-64 bg-indigo-600 rounded-[2rem] shadow-2xl overflow-hidden cursor-pointer transform transition hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-indigo-800 opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white">
                <span className="text-8xl font-black opacity-20 absolute -right-4 -bottom-4 italic">AL</span>
                <h2 className="text-6xl font-black">GCE A/L</h2>
                <p className="font-bold text-indigo-100 mt-2">Advanced Level Study Materials</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT SUBJECT */}
        {selectedLevel && !selectedSubject && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.filter(s => s.level === selectedLevel).map(sub => (
              <button 
                key={sub._id} 
                onClick={() => setSelectedSubject(sub)} 
                className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-blue-600 hover:shadow-xl transition-all text-left group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 font-black group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {sub.name.charAt(0)}
                </div>
                <h3 className="text-xl font-black text-gray-800">{sub.name}</h3>
                <p className="text-sm text-gray-400 font-bold mt-1">View Lessons</p>
              </button>
            ))}
          </div>
        )}

        {/* STEP 3: FILE LIST */}
        {selectedSubject && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.length > 0 ? notes.map(note => (
              <div key={note._id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all">
                <div className="h-3 bg-blue-600"></div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-blue-50 text-blue-600 text-xs font-black px-3 py-1 rounded-lg uppercase">{note.medium}</span>
                    <span className="text-gray-300 text-2xl">📄</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight h-16 overflow-hidden">
                    {note.title}
                  </h3>
                  {/* FIX: Removed localhost. Using Cloudinary link directly */}
                  <a 
                    href={note.fileUrl || note.file} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-gray-900 text-white text-center py-4 rounded-2xl font-black hover:bg-blue-600 transition-colors block shadow-lg"
                  >
                    Open Document
                  </a>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                <p className="text-gray-400 text-xl font-bold italic">No notes found for this subject yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}