export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar skeleton */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-5 w-full max-w-screen-xl px-4" />
      
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <div className="w-full max-w-6xl space-y-12">
          {/* Hero Banner Skeleton */}
          <div className="flex flex-col items-center justify-center w-full h-auto min-h-[400px] md:h-360 bg-background rounded-2xl animate-pulse" />
          
          {/* Category Sections Skeleton */}
          {["OPINION", "FEATURE", "LITERARY", "SPORTS"].map((cat) => (
            <div key={cat} className="space-y-6 animate-pulse">
              <div className="h-8 w-48 bg-text/10 rounded" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 bg-background rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}