export function ProfileSkeleton() {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-4 py-10 sm:py-16">
      <div className="flex flex-col items-center">
        <div className="lf-skeleton h-24 w-24 rounded-full sm:h-28 sm:w-28" />
        <div className="lf-skeleton mt-5 h-7 w-44 rounded-lg" />
        <div className="lf-skeleton mt-2 h-4 w-24 rounded" />
      </div>

      <div className="lf-skeleton mt-4 h-5 w-72 rounded" />
      <div className="lf-skeleton mt-2 h-4 w-32 rounded" />

      <div className="mt-6 flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="lf-skeleton h-11 w-11 rounded-xl" />
        ))}
      </div>

      <div className="mt-8 flex w-full flex-col gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="lf-skeleton h-16 w-full" style={{ borderRadius: 'var(--lf-radius)' }} />
        ))}
      </div>
    </div>
  );
}
