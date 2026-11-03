import React from "react";
import Link from "next/link";
import { Book } from "@/lib/api";
import { BookOpen, User, Layers, CheckCircle2, AlertCircle } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isAvailable = (book.totalCopies ?? 0) > 0;

  return (
    <div className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-primary-500/40 transition-all duration-300">
      {/* Book Cover Image Container */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Graceful fallback image if external link is broken
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900/80 backdrop-blur-md text-white border border-white/10 shadow">
            <Layers className="w-3 h-3 text-primary-400" />
            {book.category}
          </span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 backdrop-blur-md text-white shadow">
              <CheckCircle2 className="w-3 h-3" />
              {book.totalCopies} {book.totalCopies === 1 ? "Copy" : "Copies"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-600/90 backdrop-blur-md text-white shadow">
              <AlertCircle className="w-3 h-3" />
              Not Available
            </span>
          )}
        </div>
      </div>

      {/* Book Metadata & Action */}
      <div className="flex-1 flex flex-col p-5 justify-between space-y-4">
        <div className="space-y-2">
          <h3
            className="text-lg font-bold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
            <User className="w-3.5 h-3.5 text-primary-600 shrink-0" />
            <span className="truncate">{book.author}</span>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
          <Link
            href={`/books/${book._id}`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-stone-100 hover:bg-primary-700 text-stone-800 hover:text-white dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-primary-600 dark:hover:text-white transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
