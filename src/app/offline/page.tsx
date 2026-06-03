"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="text-6xl">📡</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">You are offline</h1>
      <p className="text-center text-gray-500 dark:text-gray-400">
        Some content is available offline. Check your connection to see everything.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-full bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Try Again
      </button>
    </div>
  );
}
