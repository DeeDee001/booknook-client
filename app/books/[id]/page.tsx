"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { fetchBookById, borrowBook, Book } from "@/lib/api";
import { CustomModal } from "@/components/CustomModal";
import {
  BookOpen,
  User,
  Mail,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  BookmarkPlus,
  ArrowLeft,
  Loader2,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const bookId = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [borrowModalOpen, setBorrowModalOpen] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState<string>("");
  const [borrowing, setBorrowing] = useState<boolean>(false);

  // Set default return date to 7 days from now
  useEffect(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setReturnDate(nextWeek.toISOString().split("T")[0]);
  }, []);

  const loadBook = async () => {
    if (!bookId) return;
    setLoading(true);
    try {
      const res = await fetchBookById(bookId);
      if (res.success && res.data) {
        setBook(res.data);
      } else {
        toast.error(res.message || "Book not found");
      }
    } catch (err) {
      toast.error("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const handleBorrowClick = () => {
    if (!user) {
      toast.info("Please sign in to borrow this book.");
      router.push(`/login?callbackUrl=/books/${bookId}`);
      return;
    }
    setBorrowModalOpen(true);
  };

  const handleConfirmBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book || !user || !token) {
      toast.error("Authentication required to borrow this book");
      return;
    }

    if (!returnDate) {
      toast.error("Please specify a return date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (returnDate < today) {
      toast.error("Return date must be today or a future date");
      return;
    }

    setBorrowing(true);
    try {
      const res = await borrowBook(
        {
          bookId: book._id,
          bookTitle: book.title,
          bookImage: book.image,
          userEmail: user.email,
          userName: user.name,
          borrowDate: today,
          returnDate: returnDate,
        },
        token
      );

      if (res.success) {
        toast.success(res.message || "Book borrowed successfully!");
        setBorrowModalOpen(false);
        // Refresh book data to reflect decremented copies
        await loadBook();
      } else {
        toast.error(res.message || "Failed to borrow book");
      }
    } catch (err: any) {
      toast.error(err.message || "Error borrowing book");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          Loading book details...
        </p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          Book Not Found
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          The requested book could not be found or may have been removed by its contributor.
        </p>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 text-white font-semibold text-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Books</span>
        </Link>
      </div>
    );
  }

  const isAvailable = (book.totalCopies ?? 0) > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library Catalog</span>
        </Link>
      </div>

      {/* Main Book Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md">
        {/* Left Column: Book Image */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 aspect-[3/4]">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
              }}
            />

            {/* Category tag */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900/80 backdrop-blur-md text-white border border-white/10 shadow">
                <Layers className="w-3.5 h-3.5 text-primary-400" />
                {book.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Book Information & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Title & Author */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
                {book.title}
              </h1>
              <p className="mt-2 text-base sm:text-lg font-medium text-primary-700 dark:text-primary-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Written by {book.author}</span>
              </p>
            </div>

            {/* Availability Stock Status */}
            <div className="flex items-center gap-3 pt-1">
              {isAvailable ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    In Stock: {book.totalCopies} {book.totalCopies === 1 ? "Copy" : "Copies"} Available
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  <AlertCircle className="w-4 h-4" />
                  <span>Not Available (0 Copies in Stock)</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Book Overview
              </h3>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Added By User Card */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Contributed To Library By
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 pt-1">
                <span className="font-semibold">{book.userName}</span>
                <span className="hidden sm:inline text-stone-400">•</span>
                <span className="flex items-center gap-1.5 text-stone-500">
                  <Mail className="w-3.5 h-3.5" />
                  {book.userEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Action: Borrow Button */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={handleBorrowClick}
              disabled={!isAvailable}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                isAvailable
                  ? "bg-primary-700 hover:bg-primary-800 text-white shadow-primary-700/20 hover:-translate-y-0.5 active:translate-y-0"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 cursor-not-allowed"
              }`}
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>{isAvailable ? "Borrow This Book" : "Not Available to Borrow"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Borrow Confirmation Modal */}
      <CustomModal
        isOpen={borrowModalOpen}
        onClose={() => setBorrowModalOpen(false)}
        title={`Borrow "${book.title}"`}
        maxWidth="md"
      >
        <form onSubmit={handleConfirmBorrow} className="space-y-4">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Please verify your reader information and select when you intend to return this book.
          </p>

          {/* User Name (Read-only) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Reader Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* User Email (Read-only) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Reader Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Return Date Picker */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Expected Return Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={returnDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setBorrowModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={borrowing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              {borrowing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Confirm Borrow</span>
                </>
              )}
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}
