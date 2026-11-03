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
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

function MyBorrowsContent() {
  const { user, token } = useAuth();
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  const loadBorrows = async () => {
    if (!user?.email || !token) return;
    setLoading(true);
    try {
      const res = await fetchUserBorrows(user.email, token);
      if (res.success && res.data) {
        setBorrows(res.data);
      }
    } catch (err) {
      toast.error("Failed to fetch borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBorrows();
  }, [user?.email, token]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-3">
          <BookmarkCheck className="w-8 h-8 text-primary-700 dark:text-primary-400" />
          <span>My Borrowed Shelf</span>
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Track books you currently have on loan and easily return them when finished.
        </p>
      </div>

      {/* Borrow Records Table */}
      {loading ? (
        <div className="min-h-[350px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Fetching your borrowed reading list...
          </p>
        </div>
      ) : borrows.length > 0 ? (
        <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
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
                          className="w-14 h-20 object-cover rounded-lg border border-stone-200 dark:border-stone-800 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80";
                          }}
                        />
                      </td>

                      {/* Title */}
                      <td className="py-4 px-6 font-semibold text-stone-900 dark:text-stone-100">
                        <Link
                          href={`/books/${borrow.bookId}`}
                          className="hover:text-primary-700 dark:hover:text-primary-400 hover:underline transition-colors"
                        >
                          {borrow.bookTitle}
                        </Link>
                      </td>

                      {/* Borrow Date */}
                      <td className="py-4 px-6 text-stone-600 dark:text-stone-300">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                          <Calendar className="w-4 h-4 text-primary-600" />
                          <span>{borrow.borrowDate}</span>
                        </div>
                      </td>

                      {/* Return Date */}
                      <td className="py-4 px-6 text-stone-600 dark:text-stone-300">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span className="font-medium">{borrow.returnDate}</span>
                        </div>
                      </td>

                      {/* Return Action Button */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleReturnBook(borrow._id, borrow.bookTitle)}
                          disabled={isProcessing}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 hover:bg-primary-700 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white border border-primary-200 dark:border-primary-800/80 shadow-sm transition-all"
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
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            You currently have no borrowed books
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Explore the library catalog to find fascinating stories, memoirs, and guides to borrow.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            <span>Browse Library Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
