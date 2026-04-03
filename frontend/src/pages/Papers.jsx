import { useState, useEffect } from "react";
import axios from "axios";

export default function Papers() {
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subjects/");
        setSubjects(res.data);
      } catch (err) { console.error(err); }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      const fetchPapers = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/notes?subjectId=${selectedSubject._id}&category=Paper`);
          setPapers(res.data);
        } catch (err) { console.error(err); }
      };
      fetchPapers();
    }
  }, [selectedSubject]);

  const goBack = () => {
    if (selectedSubject) setSelectedSubject(null);
    else setSelectedLevel(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & BREADCRUMBS */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-sm text-red-300 font-bold uppercase tracking-widest mb-4">
            <span className="hover:text-red-600 cursor-pointer" onClick={() => {setSelectedLevel(null); setSelectedSubject(null)}}>Archives</span>
            {selectedLevel && <><span>/</span> <span className="text-gray-400">{selectedLevel}</span></>}
            {selectedSubject && <><span>/</span> <span className="text-red-600">{selectedSubject.name}</span></>}
          </div>
          
          <div className="flex justify-between items-end">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              {selectedSubject ? `${selectedSubject.name} Papers` : selectedLevel ? `${selectedLevel} Papers` : "Past Papers"}
            </h1>
            {selectedLevel && (
              <button onClick={goBack} className="bg-white border-2 border-gray-100 px-6 py-2 rounded-xl font-black text-gray-600 hover:border-red-600 hover:text-red-600 transition-all shadow-sm">
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
              className="group relative h-64 bg-red-600 rounded-[2rem] shadow-2xl overflow-hidden cursor-pointer transform transition hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-800 opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
                <span className="text-8xl font-black opacity-10 absolute left-4 top-4 italic uppercase">Archives</span>
                <h2 className="text-6xl font-black">GCE O/L</h2>
                <p className="font-bold text-red-100 mt-2">Official Past Paper Collections</p>
              </div>
            </div>

            <div 
              onClick={() => setSelectedLevel("A/L")} 
              className="group relative h-64 bg-red-900 rounded-[2rem] shadow-2xl overflow-hidden cursor-pointer transform transition hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-black opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
                <span className="text-8xl font-black opacity-10 absolute left-4 top-4 italic uppercase">Archives</span>
                <h2 className="text-6xl font-black">GCE A/L</h2>
                <p className="font-bold text-red-200 mt-2">Advanced Level Exam Papers</p>
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
                className="bg-white p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-red-600 hover:shadow-xl transition-all text-left group"
              >
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4 font-black group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {sub.name.charAt(0)}
                </div>
                <h3 className="text-xl font-black text-gray-800">{sub.name}</h3>
                <p className="text-sm text-gray-400 font-bold mt-1">Explore Papers</p>
              </button>
            ))}
          </div>
        )}

        {/* STEP 3: FILE LIST */}
        {selectedSubject && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {papers.length > 0 ? papers.map(paper => (
              <div key={paper._id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all">
                <div className="h-3 bg-red-600"></div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-red-50 text-red-600 text-xs font-black px-3 py-1 rounded-lg uppercase">{paper.medium}</span>
                    <span className="text-gray-300 text-2xl font-bold">PDF</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight h-16 overflow-hidden uppercase tracking-tight">
                    {paper.title}
                  </h3>
                  <a 
                    href={`http://localhost:5000${paper.fileUrl}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full bg-red-600 text-white text-center py-4 rounded-2xl font-black hover:bg-red-700 transition-colors block shadow-lg"
                  >
                    Download Paper
                  </a>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-red-50">
                <p className="text-gray-300 text-xl font-bold italic">No past papers found for this subject.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}