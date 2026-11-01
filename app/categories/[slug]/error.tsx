"use client";

import Link from "next/link";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl md:text-6xl font-['Hefring_Slab_Bold'] text-text">
          Category Not Found
        </h1>
        <p className="text-text/70 font-['NeueHaasGrotDisp'] text-lg">
          This category doesn't exist or has no articles yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-background font-['Hefring_Slab_Bold'] rounded-full hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-primary text-primary font-['Hefring_Slab_Bold'] rounded-full hover:bg-primary hover:text-background transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}