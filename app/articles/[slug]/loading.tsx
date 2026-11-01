export default function ArticleLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-5 w-full max-w-screen-xl px-4" />
      
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-4">
        <article className="w-full max-w-3xl space-y-8 animate-pulse">
          <div className="h-6 w-32 bg-text/10 rounded-full" />
          <div className="h-12 w-3/4 bg-text/10 rounded" />
          <div className="aspect-video w-full bg-background rounded-2xl" />
          <div className="flex gap-4">
            <div className="h-5 w-24 bg-text/10 rounded" />
            <div className="h-5 w-24 bg-text/10 rounded" />
            <div className="h-5 w-32 bg-text/10 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 w-full bg-text/10 rounded" />
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}