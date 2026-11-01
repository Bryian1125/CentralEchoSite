export default function CategoryLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-5 w-full max-w-screen-xl px-4" />
      
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <div className="w-full max-w-6xl space-y-12 animate-pulse">
          <div className="h-32 w-full" />
          <div className="h-8 w-64 bg-text/10 rounded" />
          <div className="h-90 w-full max-w-4xl bg-background rounded-2xl" />
          <div className="h-8 w-48 bg-text/10 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-80 bg-background rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}