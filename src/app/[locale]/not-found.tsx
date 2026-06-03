import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-gray-500 dark:text-gray-400">Page not found</p>
      <Link
        href="/"
        className="rounded-full bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Go home
      </Link>
    </div>
  );
}
