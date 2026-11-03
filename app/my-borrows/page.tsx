"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";
import { fetchUserBorrows, returnBook, Borrow } from "@/lib/api";
import {
  BookmarkCheck,
  RotateCcw,
  BookOpen,
  Calendar,
  Clock,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

function MyBorrowsContent() {
  const { user, token, isLoading: isAuthLoading } = useAuth();
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  const loadBorrows = async () => {
    if (isAuthLoading) return;
    if (!user?.email || !token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetchUserBorrows(user.email, token);
      if (res.success && res.data) {
        setBorrows(res.data);
      } else {
        toast.error(res.message || "Failed to fetch borrowed books.");
      }
    } catch (err) {
      toast.error("Failed to fetch borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBorrows();
  }, [user?.email, token, isAuthLoading]);

  const handleReturnBook = async (borrowId: string, bookTitle: string) => {
    if (!token) return;

    setReturningId(borrowId);
    try {
      const res = await returnBook(borrowId, token);
      if (res.success) {
        toast.success(`"${bookTitle}" has been returned! Thank you.`);
        // Remove from current UI state
        setBorrows((prev) => prev.filter((b) => b._id !== borrowId));
      } else {
        toast.error(res.message || "Failed to return book.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error returning book.");
    } finally {
      setReturningId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2.5 sm:gap-3">
          <BookmarkCheck className="w-7 h-7 sm:w-8 h-8 text-primary-700 dark:text-primary-400 shrink-0" />
          <span>My Borrowed Shelf</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Track books you currently have on loan and easily return them when finished.
        </p>
      </div>

      {/* Borrow Records */}
      {loading ? (
        <div className="min-h-[350px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Fetching your borrowed reading list...
          </p>
        </div>
      ) : borrows.length > 0 ? (
        <>
          {/* Mobile Card Layout (< 640px) */}
          <div className="block sm:hidden space-y-3.5">
            {borrows.map((borrow) => {
              const isProcessing = returningId === borrow._id;
              return (
                <div
                  key={borrow._id}
                  className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 shadow-sm space-y-3.5"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={borrow.bookImage}
                      alt={borrow.bookTitle}
                      className="w-16 h-22 object-cover rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <Link
                        href={`/books/${borrow.bookId}`}
                        className="text-base font-bold text-stone-900 dark:text-stone-100 hover:text-primary-700 dark:hover:text-primary-400 transition-colors line-clamp-2 leading-snug"
                      >
                        {borrow.bookTitle}
                      </Link>
                      <div className="text-xs space-y-1 text-stone-500 dark:text-stone-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>Borrowed: <strong className="text-stone-700 dark:text-stone-200 font-medium">{borrow.borrowDate}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-primary-700 dark:text-primary-400">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>Due: <strong className="font-semibold">{borrow.returnDate}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReturnBook(borrow._id, borrow.bookTitle)}
                    disabled={isProcessing}
                    className="w-full py-2.5 rounded-xl border border-primary-600 bg-primary-50 dark:bg-primary-950/40 hover:bg-primary-100 text-primary-700 dark:text-primary-300 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Returning Book...</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        <span>Return Book</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Desktop / Tablet Table View (>= 640px) */}
          <div className="hidden sm:block rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    <th className="py-4 px-6">Book Cover</th>
                    <th className="py-4 px-6">Book Title</th>
                    <th className="py-4 px-6">Borrow Date</th>
                    <th className="py-4 px-6">Return Due Date</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
                  {borrows.map((borrow) => {
                    const isProcessing = returningId === borrow._id;
                    return (
                      <tr
                        key={borrow._id}
                        className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors"
                      >
                        {/* Image */}
                        <td className="py-4 px-6">
                          <img
                            src={borrow.bookImage}
                            alt={borrow.bookTitle}
                            className="w-12 h-16 object-cover rounded-lg shadow-sm border border-stone-200 dark:border-stone-700"
                          />
                        </td>

                        {/* Title */}
                        <td className="py-4 px-6 font-semibold text-stone-900 dark:text-stone-100 max-w-xs">
                          <Link
                            href={`/books/${borrow.bookId}`}
                            className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors line-clamp-1"
                          >
                            {borrow.bookTitle}
                          </Link>
                        </td>

                        {/* Borrow Date */}
                        <td className="py-4 px-6 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            <span>{borrow.borrowDate}</span>
                          </div>
                        </td>

                        {/* Return Date */}
                        <td className="py-4 px-6 font-medium text-primary-700 dark:text-primary-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{borrow.returnDate}</span>
                          </div>
                        </td>

                        {/* Return Action */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleReturnBook(borrow._id, borrow.bookTitle)}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/40 text-primary-700 dark:text-primary-400 text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Returning...</span>
                              </>
                            ) : (
                              <>
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Return Book</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border-2 border-dashed border-stone-200 dark:border-stone-800 p-8 sm:p-12 text-center space-y-4 bg-white/50 dark:bg-stone-900/50">
          <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              No Borrowed Books Found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              Your borrowing shelf is currently empty. Explore the catalog to discover and borrow your next story.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>Explore All Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyBorrowsPage() {
  return (
    <AuthGuard>
      <MyBorrowsContent />
    </AuthGuard>
  );
}
