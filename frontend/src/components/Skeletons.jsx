export function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200/80 ${className}`} />;
}

export function PageHeaderSkeleton({ theme = "blue" }) {
  const themeMap = {
    blue: "from-blue-600 to-indigo-600",
    rose: "from-rose-600 to-red-600",
    emerald: "from-emerald-600 to-teal-600",
    slate: "from-slate-800 to-slate-700",
  };

  return (
    <div className="mb-12 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
      <div className={`relative overflow-hidden bg-gradient-to-r ${themeMap[theme]} px-6 py-10 md:px-10 md:py-12`}>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

        <div className="relative space-y-4">
          <SkeletonBlock className="h-4 w-36 bg-white/25" />
          <SkeletonBlock className="h-12 w-72 max-w-full bg-white/25" />
          <SkeletonBlock className="h-4 w-full max-w-2xl bg-white/20" />
          <SkeletonBlock className="h-4 w-5/6 max-w-xl bg-white/20" />
        </div>
      </div>
    </div>
  );
}

export function LevelCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-2xl border border-slate-200">
      <SkeletonBlock className="h-4 w-32 mb-4" />
      <SkeletonBlock className="h-12 w-40 mb-4" />
      <SkeletonBlock className="h-4 w-full max-w-md mb-2" />
      <SkeletonBlock className="h-4 w-4/5 max-w-sm mb-8" />
      <SkeletonBlock className="h-10 w-36" />
    </div>
  );
}

export function SubjectCardSkeleton() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <SkeletonBlock className="mb-5 h-14 w-14 rounded-2xl" />
      <SkeletonBlock className="h-7 w-3/4 mb-3" />
      <SkeletonBlock className="h-4 w-full mb-2" />
      <SkeletonBlock className="h-4 w-2/3 mb-5" />
      <SkeletonBlock className="h-5 w-28" />
    </div>
  );
}

export function ResourceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="h-1.5 bg-slate-200/80" />
      <div className="p-7">
        <div className="mb-5 flex items-center justify-between">
          <SkeletonBlock className="h-7 w-20 rounded-full" />
          <SkeletonBlock className="h-11 w-11 rounded-2xl" />
        </div>

        <SkeletonBlock className="h-8 w-5/6 mb-3" />
        <SkeletonBlock className="h-8 w-3/4 mb-4" />
        <SkeletonBlock className="h-4 w-full mb-2" />
        <SkeletonBlock className="h-4 w-2/3 mb-7" />

        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-11 w-28" />
        </div>
      </div>
    </div>
  );
}

export function ProfessionalCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="h-1.5 bg-slate-200/80" />
      <div className="h-72 bg-slate-200/70" />
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <SkeletonBlock className="h-8 w-2/3 mb-3" />
            <SkeletonBlock className="h-4 w-28" />
          </div>
          <SkeletonBlock className="h-12 w-12 rounded-2xl" />
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
          <SkeletonBlock className="h-4 w-full mb-2" />
          <SkeletonBlock className="h-4 w-full mb-2" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex-1">
            <SkeletonBlock className="h-4 w-20 mb-2" />
            <SkeletonBlock className="h-6 w-32" />
          </div>
          <SkeletonBlock className="h-11 w-28" />
        </div>
      </div>
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-white">
      <div className="h-2 bg-slate-200/80" />
      <div className="p-5 flex items-center justify-between">
        <div className="flex-1">
          <SkeletonBlock className="h-4 w-28 mb-3" />
          <SkeletonBlock className="h-9 w-20" />
        </div>
        <SkeletonBlock className="h-14 w-14 rounded-2xl" />
      </div>
    </div>
  );
}