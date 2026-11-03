import React from "react";
import Link from "next/link";
import { BookOpen, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-6">
      <div className="relative flex items-center justify-center">
        <div className="w-28 h-28 rounded-3xl bg-primary-100 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 flex items-center justify-center shadow-lg">
          <BookOpen className="w-14 h-14" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow">
          404
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
          The page or book you are looking for has wandered off our library shelves or no longer exists.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 font-semibold text-sm shadow-sm hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Browse Library</span>
        </Link>
      </div>
    </div>
  );
}
