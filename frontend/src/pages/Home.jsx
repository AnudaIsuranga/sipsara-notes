import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  end,
  duration = 1800,
  suffix = "",
  prefix = "",
  startAnimation = false,
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, startAnimation]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function StatCard({
  icon,
  value,
  suffix,
  label,
  description,
  startAnimation,
  accent,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 backdrop-blur-xl p-8 shadow-[0_15px_50px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)]">
      <div className={`absolute inset-x-0 top-0 h-1 ${accent}`}></div>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/40 blur-2xl group-hover:bg-blue-200/50 transition-all"></div>

      <div className="relative">
        <div className="flex items-center justify-between mb-7">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-lg">
            {icon}
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">
            Live Data
          </span>
        </div>

        <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          <AnimatedCounter
            end={value}
            suffix={suffix}
            startAnimation={startAnimation}
          />
        </h3>

        <p className="mt-3 text-xl font-black text-slate-800">{label}</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-7">{desc}</p>
    </div>
  );
}

export default function Home() {
  const statsRef = useRef(null);
  const [startStatsAnimation, setStartStatsAnimation] = useState(false);

  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartStatsAnimation(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HERO */}
      <section
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "110%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/88 via-slate-900/72 to-blue-950/78"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.28),transparent_28%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.22),transparent_30%)]"></div>

        <div className="absolute left-[-120px] top-[120px] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute right-[-100px] bottom-[80px] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-24">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-xl shadow-lg hero-fade-up">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-100">
                  Premium Digital Learning
                </span>
              </div>

              <h1 className="mt-7 text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] hero-fade-up-delay-1">
                Learn with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-500">
                  Clarity.
                </span>
                <span className="block">Score with Confidence.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg md:text-2xl text-slate-200 leading-relaxed hero-fade-up-delay-2">
                A premium study platform for Sri Lankan GCE O/L and A/L students.
                Explore high-quality notes, past papers, and expert lecturer support
                in one modern digital space.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 hero-fade-up-delay-3">
                <Link
                  to="/notes"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-black text-white shadow-2xl shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-700"
                >
                  Explore Notes
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>

                <Link
                  to="/professionals"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/18 bg-white/10 px-8 py-4 text-lg font-black text-white backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white/16"
                >
                  Meet Lecturers
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 hero-fade-up-delay-3">
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-slate-100 backdrop-blur-md">
                  O/L Resources
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-slate-100 backdrop-blur-md">
                  A/L Materials
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-slate-100 backdrop-blur-md">
                  Professional Guidance
                </span>
              </div>
            </div>

            <div className="relative hidden xl:block">
              <div className="relative hero-float">
                <div className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_25px_80px_rgba(15,23,42,0.45)]">
                  <div className="rounded-[2rem] bg-white/95 p-7 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] font-black text-slate-400">
                          Learning Dashboard
                        </p>
                        <h3 className="mt-2 text-3xl font-black text-slate-900">
                          Smart Revision Experience
                        </h3>
                      </div>
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg">
                        ✦
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                          Notes
                        </p>
                        <p className="mt-2 text-3xl font-black text-slate-900">500+</p>
                        <p className="mt-1 text-sm text-slate-500">Ready to explore</p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                          Access
                        </p>
                        <p className="mt-2 text-3xl font-black text-slate-900">24/7</p>
                        <p className="mt-1 text-sm text-slate-500">Anytime learning</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-500">
                            Student Progress
                          </p>
                          <p className="mt-2 text-xl font-black text-slate-900">
                            Faster revision. Better focus.
                          </p>
                        </div>
                        <div className="text-4xl">📈</div>
                      </div>

                      <div className="mt-5 h-3 w-full rounded-full bg-white">
                        <div className="h-3 w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      </div>

                      <div className="mt-2 flex justify-between text-sm font-semibold text-slate-500">
                        <span>Preparation score</span>
                        <span>78%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-8 -left-10 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white backdrop-blur-xl shadow-xl hero-float-slow">
                  <p className="text-[11px] uppercase tracking-[0.24em] font-black text-slate-200">
                    contact
                  </p>
                  <p className="mt-1 text-lg font-black">Top Lecturers</p>
                </div>

                <div className="absolute -bottom-8 -right-8 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white backdrop-blur-xl shadow-xl hero-float-delay">
                  <p className="text-[11px] uppercase tracking-[0.24em] font-black text-slate-200">
                    Premium Access
                  </p>
                  <p className="mt-1 text-lg font-black">O/L + A/L Resources</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 hero-fade-up-delay-3">
            <div className="inline-flex items-center gap-3 text-slate-300 text-sm font-bold uppercase tracking-[0.24em]">
              <span className="inline-block h-px w-10 bg-white/30"></span>
              Scroll to explore
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        ref={statsRef}
        className="relative py-28 bg-[linear-gradient(to_bottom,#f8fbff,white)] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-90px] top-24 w-72 h-72 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute right-[-80px] bottom-10 w-72 h-72 rounded-full bg-indigo-100/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-slate-400 font-black uppercase tracking-[0.28em] text-xs md:text-sm mb-5">
              Empowering Success Across The Island
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-5">
              Trusted By Students Everywhere
            </h2>

            <p className="max-w-3xl mx-auto text-slate-500 text-lg leading-8">
              A powerful and modern learning experience designed for students who
              want faster access to reliable academic resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
            <StatCard
              icon="🎓"
              value={20}
              suffix="k+"
              label="Active Students"
              description="A growing student community using the platform for daily revision."
              startAnimation={startStatsAnimation}
              accent="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"
            />

            <StatCard
              icon="📚"
              value={500}
              suffix="+"
              label="Free Resources"
              description="Carefully arranged notes, papers, and study materials."
              startAnimation={startStatsAnimation}
              accent="bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500"
            />

            <StatCard
              icon="📈"
              value={98}
              suffix="%"
              label="Pass Rate"
              description="Built to support strong academic performance and exam success."
              startAnimation={startStatsAnimation}
              accent="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
            />

            <StatCard
              icon="⚡"
              value={24}
              suffix="/7"
              label="Access"
              description="Study anytime with a platform designed for modern learners."
              startAnimation={startStatsAnimation}
              accent="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-black uppercase tracking-[0.25em] text-xs md:text-sm mb-4">
              Why Choose SipsaraNotes
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-5">
              A Better Way To Study
            </h2>
            <p className="max-w-3xl mx-auto text-slate-500 text-lg leading-8">
              More than just a notes website — this is a full digital learning space
              built for today’s students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            <FeatureCard
              icon="📝"
              title="Quality Notes"
              desc="Find well-organized theory notes that help you revise faster and understand clearly."
            />
            <FeatureCard
              icon="📄"
              title="Past Papers"
              desc="Access important exam papers in one place and practice with confidence."
            />
            <FeatureCard
              icon="👨‍🏫"
              title="Top Lecturers"
              desc="Connect with trusted professionals and learn from experienced educators."
            />
            <FeatureCard
              icon="📱"
              title="Modern Access"
              desc="Use a clean, mobile-friendly digital platform that feels smooth and professional."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-32 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/85"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_45%)]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <span className="inline-block mb-5 text-blue-200 uppercase tracking-[0.25em] text-xs md:text-sm font-black">
            Your Success Starts Here
          </span>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Stop Searching.
            <br />
            Start Scoring.
          </h2>

          <p className="text-xl text-blue-100 mb-12 font-medium leading-8 max-w-3xl mx-auto">
            Join a smarter digital library designed specially for Sri Lankan students.
            Everything you need, from theory to exam preparation, is only a few clicks away.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/register"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl hover:-translate-y-1"
            >
              Register for Free
            </Link>

            <Link
              to="/professionals"
              className="inline-block bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all hover:-translate-y-1"
            >
              Meet Lecturers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}