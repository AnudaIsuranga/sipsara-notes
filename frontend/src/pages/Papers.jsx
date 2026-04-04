import { useState, useEffect } from "react";
import axios from "axios";

function SubjectCard({ sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-red-500 to-orange-400" />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-100/50 blur-2xl transition-all duration-300 group-hover:bg-rose-200/70" />

      <div className="relative">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl font-black text-rose-600 transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white">
          {sub.name.charAt(0)}
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          {sub.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-slate-500">
          View available past papers
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-rose-600">
          Open Subject
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </button>
  );
}

function PaperCard({ paper }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-orange-400" />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-100/50 blur-2xl transition-all duration-300 group-hover:bg-rose-200/70" />

      <div className="relative p-7">
        <div className="mb-5 flex items-center justify-between">
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-rose-700">
            {paper.medium}
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-lg">
            📄
          </div>
        </div>

        <h3 className="min-h-[64px] text-2xl font-black leading-tight tracking-tight text-slate-900">
          {paper.title}
        </h3>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          Practice with past papers and improve exam confidence.
        </p>

        <div className="mt-7 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Exam Material
          </div>

          <a
            href={paper.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:bg-rose-700"
          >
            Open Paper
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="col-span-full rounded-[2rem] border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
        📭
      </div>
      <p className="text-xl font-bold italic text-slate-400">{text}</p>
    </div>
  );
}

export default function Papers() {
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/subjects`);
        setSubjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubjects();
  }, [API_URL]);

  useEffect(() => {
    if (!selectedSubject) return;

    const fetchPapers = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/notes?subjectId=${selectedSubject._id}&category=Paper`
        );
        setPapers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPapers();
  }, [selectedSubject, API_URL]);

  const goBack = () => {
    if (selectedSubject) setSelectedSubject(null);
    else setSelectedLevel(null);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#fff8f8,white)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-red-600 to-slate-900 px-6 py-10 text-white md:px-10 md:py-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange-300/10 blur-3xl" />

            <div className="relative">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-rose-100">
                <span
                  className="cursor-pointer transition hover:text-white"
                  onClick={() => {
                    setSelectedLevel(null);
                    setSelectedSubject(null);
                  }}
                >
                  Archives
                </span>

                {selectedLevel && (
                  <>
                    <span>/</span>
                    <span>{selectedLevel}</span>
                  </>
                )}

                {selectedSubject && (
                  <>
                    <span>/</span>
                    <span className="text-white">{selectedSubject.name}</span>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-100">
                    Exam Preparation
                  </p>

                  <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                    {selectedSubject
                      ? `${selectedSubject.name} Papers`
                      : selectedLevel
                      ? `${selectedLevel} Papers`
                      : "Past Papers"}
                  </h1>

                  <p className="mt-4 max-w-2xl text-base text-rose-100 md:text-lg">
                    Practice smarter with organized past papers for Sri Lankan
                    GCE O/L and A/L students.
                  </p>
                </div>

                {selectedLevel && (
                  <button
                    onClick={goBack}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    ← Go Back
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {!selectedLevel && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <button
              onClick={() => setSelectedLevel("O/L")}
              className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-500 via-red-600 to-red-800 p-10 text-left text-white shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-100">
                  Ordinary Level
                </p>
                <h2 className="mt-4 text-5xl font-black tracking-tight">GCE O/L</h2>
                <p className="mt-3 max-w-md text-lg text-rose-100">
                  Explore O/L past papers for focused exam preparation.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                  Enter Papers
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedLevel("A/L")}
              className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-red-700 via-rose-700 to-slate-900 p-10 text-left text-white shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-red-100">
                  Advanced Level
                </p>
                <h2 className="mt-4 text-5xl font-black tracking-tight">GCE A/L</h2>
                <p className="mt-3 max-w-md text-lg text-red-100">
                  Find advanced level exam papers in a clean digital archive.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                  Enter Papers
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </button>
          </div>
        )}

        {selectedLevel && !selectedSubject && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects
              .filter((s) => s.level === selectedLevel)
              .map((sub) => (
                <SubjectCard
                  key={sub._id}
                  sub={sub}
                  onClick={() => setSelectedSubject(sub)}
                />
              ))}
          </div>
        )}

        {selectedSubject && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {papers.length > 0 ? (
              papers.map((paper) => <PaperCard key={paper._id} paper={paper} />)
            ) : (
              <EmptyState text="No past papers found for this subject." />
            )}
          </div>
        )}
      </div>
    </div>
  );
}