import { useState, useEffect } from "react";
import axios from "axios";

function ProfessionalCard({ teacher }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/50 blur-2xl transition-all duration-300 group-hover:bg-blue-200/70" />

      <div className="relative">
        <div className="relative h-72 overflow-hidden bg-slate-100">
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x500?text=No+Image";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/10 to-transparent" />

          <div className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-blue-700 backdrop-blur-md shadow-sm">
            Professional
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="inline-flex max-w-full rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg">
              <span className="truncate">{teacher.subject}</span>
            </div>
          </div>
        </div>

        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                {teacher.name}
              </h2>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                Expert Educator
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
              👨‍🏫
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-600 italic">
              “{teacher.description}”
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Contact Info
              </p>
              <p className="mt-2 truncate text-lg font-black text-slate-900">
                {teacher.contact}
              </p>
            </div>

            <a
              href={`tel:${teacher.contact}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:bg-blue-700"
            >
              Call Now
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
        👨‍🏫
      </div>
      <p className="text-xl font-bold italic text-slate-400">
        No professionals added yet.
      </p>
    </div>
  );
}

export default function Professionals() {
  const [teachers, setTeachers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/teachers`)
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Error fetching professionals:", err));
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#f8fbff,white)] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 px-6 py-10 text-white md:px-10 md:py-14">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-100">
                Professional Network
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                Learn From The Best
              </h1>

              <p className="mt-5 max-w-3xl text-base text-blue-100 md:text-lg leading-8">
                Meet experienced lecturers and subject specialists who help students
                succeed with expert guidance, trusted support, and high-quality
                teaching experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                  Verified Educators
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                  Subject Experts
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
                  Student Focused
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-400">
              Faculty Directory
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Our Professionals
            </h2>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full bg-blue-50 px-5 py-3 text-sm font-black uppercase tracking-[0.15em] text-blue-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
              {teachers.length}
            </span>
            Total Professionals
          </div>
        </div>

        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {teachers.map((teacher) => (
              <ProfessionalCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}