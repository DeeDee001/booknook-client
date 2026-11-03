"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";
import { fetchBooks, updateBook, deleteBook, Book } from "@/lib/api";
import { CATEGORIES } from "@/lib/utils";
import { CustomModal } from "@/components/CustomModal";
import {
  Library,
  PlusCircle,
  Edit3,
  Trash2,
  BookOpen,
  User,
  Layers,
  Copy,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

function MyBooksContent() {
  const { user, token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCategory, setEditCategory] = useState("Fiction");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTotalCopies, setEditTotalCopies] = useState<number>(1);
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete State
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);

  const loadUserBooks = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetchBooks({ email: user.email });
      if (res.success && res.data) {
        setBooks(res.data);
      }
    } catch (err) {
      toast.error("Failed to load your books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserBooks();
  }, [user?.email]);

  // Open Edit Modal with old data pre-filled
  const handleOpenEdit = (book: Book) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditCategory(book.category);
    setEditImage(book.image);
    setEditDescription(book.description);
    setEditTotalCopies(book.totalCopies || 1);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook || !token) return;

    setSavingEdit(true);
    try {
      const res = await updateBook(
        editingBook._id,
        {
          title: editTitle.trim(),
          author: editAuthor.trim(),
          category: editCategory,
          image: editImage.trim(),
          description: editDescription.trim(),
          totalCopies: Number(editTotalCopies),
        },
        token
      );

      if (res.success) {
        toast.success("Book updated successfully!");
        setEditingBook(null);
        await loadUserBooks();
      } else {
        toast.error(res.message || "Failed to update book.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error updating book.");
    } finally {
      setSavingEdit(false);
    }
  };

  // Confirm and Execute Delete (Custom modal, NOT default alert/confirm)
  const handleConfirmDelete = async () => {
    if (!deletingBook || !token) return;

    setConfirmDeleteLoading(true);
    try {
      const res = await deleteBook(deletingBook._id, token);
      if (res.success) {
        toast.success(`"${deletingBook.title}" has been deleted.`);
        setBooks((prev) => prev.filter((b) => b._id !== deletingBook._id));
        setDeletingBook(null);
      } else {
        toast.error(res.message || "Failed to delete book.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error deleting book.");
    } finally {
      setConfirmDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-3">
            <Library className="w-8 h-8 text-primary-700 dark:text-primary-400" />
            <span>My Added Books</span>
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Manage, update, and monitor the books you have contributed to BookNook.
          </p>
        </div>

        <Link
          href="/add-book"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Book List / Cards */}
      {loading ? (
        <div className="min-h-[350px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Loading your contributed books...
          </p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="flex flex-col rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden"
            >
              <div className="flex p-4 gap-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-xl border border-stone-200 dark:border-stone-800 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80";
                  }}
                />

                <div className="flex-1 min-w-0 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary-100 dark:bg-primary-950/60 text-primary-800 dark:text-primary-300">
                      {book.category}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 truncate mt-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      By {book.author}
                    </p>
                  </div>

                  <div className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                    Copies Available: <span className="font-bold">{book.totalCopies}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div className="grid grid-cols-2 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40">
                <button
                  onClick={() => handleOpenEdit(book)}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border-r border-stone-100 dark:border-stone-800"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingBook(book)}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            You haven't added any books yet
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Help grow the BookNook community by contributing your favorite books to our shared shelves.
          </p>
          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      )}

      {/* Edit Book Modal */}
      <CustomModal
        isOpen={!!editingBook}
        onClose={() => setEditingBook(null)}
        title="Edit Book Details"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Book Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Author Name
              </label>
              <input
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Category
              </label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Total Copies
            </label>
            <input
              type="number"
              min={0}
              value={editTotalCopies}
              onChange={(e) => setEditTotalCopies(Math.max(0, parseInt(e.target.value, 10) || 0))}
              required
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Cover Image URL
            </label>
            <input
              type="url"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Short Description
            </label>
            <textarea
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={() => setEditingBook(null)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savingEdit}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              {savingEdit ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Custom Confirmation Modal for Deletion (No default browser confirm!) */}
      <CustomModal
        isOpen={!!deletingBook}
        onClose={() => setDeletingBook(null)}
        title="Confirm Book Deletion"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-rose-600">
            <AlertTriangle className="w-8 h-8 shrink-0" />
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-stone-900 dark:text-stone-100">
                "{deletingBook?.title}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={() => setDeletingBook(null)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={confirmDeleteLoading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              {confirmDeleteLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Book</span>
                </>
              )}
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default function MyBooksPage() {
  return (
    <AuthGuard>
      <MyBooksContent />
    </AuthGuard>
  );
}
