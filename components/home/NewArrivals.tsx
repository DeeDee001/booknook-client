"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { fetchBooks, Book } from "@/lib/api";
import { BookOpen, Sparkles, ArrowRight, Loader2 } from "lucide-react";

export const NewArrivals: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadNewArrivals() {
      try {
        const res = await fetchBooks({ limit: 6, sort: "newest" });
        if (res.success && res.data) {
          setBooks(res.data);
        }
      } catch (err) {
        console.error("Error loading new arrivals:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNewArrivals();
  }, []);

  return (
    <section className="py-6 sm:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">
            <Sparkles className="w-4 h-4" />
            <span>Fresh Off The Shelves</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            New Arrivals
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
            The latest additions to our community library, ready for you to explore and borrow.
          </p>
        </div>

        <Link
          href="/books"
          className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="min-h-[280px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Fetching latest new arrivals...
          </p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            No books in the library catalog yet
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Be the pioneer reader! Add the first book to BookNook and let the community start borrowing.
          </p>
          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      )}

      {/* Mobile "See All Books" button */}
      <div className="mt-6 sm:mt-10 text-center md:hidden">
        <Link
          href="/books"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold shadow-sm transition-colors"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
