
const HeroSkeleton = () => {
  return (
    <section className="max-w mx-auto px-2 sm:px-4 md:px-6 pt-2 sm:pt-6 md:pt-8 animate-pulse">
      <div className="grid lg:grid-cols-[2fr_420px] gap-8 items-stretch">
        
        <div className="relative h-[480px] sm:h-[520px] md:h-[580px] lg:h-[650px] overflow-hidden rounded-[34px] sm:rounded-3xl md:rounded-[36px] bg-slate-200 dark:bg-slate-800 p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-end">
          <div className="max-w-3xl space-y-4">
          
            <div className="h-6 w-28 rounded-full bg-slate-300 dark:bg-slate-700" />

            <div className="space-y-2 pt-2">
              <div className="h-8 sm:h-10 md:h-12 w-11/12 rounded-lg bg-slate-300 dark:bg-slate-700" />
              <div className="h-8 sm:h-10 md:h-12 w-3/4 rounded-lg bg-slate-300 dark:bg-slate-700" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-4 sm:h-5 w-full rounded bg-slate-300 dark:bg-slate-700" />
              <div className="h-4 sm:h-5 w-2/3 rounded bg-slate-300 dark:bg-slate-700" />
            </div>

            <div className="pt-6 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="h-4 w-24 rounded bg-slate-300 dark:bg-slate-700" />
                <div className="h-4 w-20 rounded bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="h-10 w-32 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-[480px] sm:h-[520px] md:h-[580px] lg:h-[650px] rounded-[34px] border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-[#111827]">
          <div>
            <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3 h-7 w-40 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="mt-6 flex flex-col gap-4 overflow-y-auto pr-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex gap-4"
              >
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 sm:mt-5 md:mt-8">
            <div className="h-6 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;