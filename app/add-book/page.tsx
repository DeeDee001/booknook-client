"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";
import { addBook } from "@/lib/api";
import { CATEGORIES } from "@/lib/utils";
import {
  BookOpen,
  User,
  Mail,
  Layers,
  FileText,
  UploadCloud,
  PlusCircle,
  Loader2,
  Copy,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

function AddBookContent() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<string>("Fiction");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Upload image to ImgBB
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      // ImgBB API key from env or default client key
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "e7ceb6bf43fa58a62fef7645fc30da79";
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.data?.url) {
        setImage(data.data.url);
        toast.success("Cover image uploaded successfully to ImgBB!");
      } else {
        // Fallback: create an object URL or show helpful guidance
        const localPreview = URL.createObjectURL(file);
        setImage(localPreview);
        toast.info("Image preview loaded. You can also paste an image URL directly.");
      }
    } catch (err) {
      console.error("ImgBB upload error:", err);
      toast.error("Could not upload to ImgBB. You can paste an image URL directly.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !category || !image.trim() || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (totalCopies < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    if (!user || !token) {
      toast.error("Please ensure you are logged in to add a book.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await addBook(
        {
          title: title.trim(),
          author: author.trim(),
          category,
          image: image.trim(),
          description: description.trim(),
          userName: user.name,
          userEmail: user.email,
          totalCopies: Number(totalCopies),
        },
        token
      );

      if (res.success) {
        toast.success(res.message || "Book added to BookNook successfully!");
        router.push("/books");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to add book.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error submitting book.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-xl bg-primary-700 text-white flex items-center justify-center shadow-md">
          <PlusCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Add a Book to the Library
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          Share your favorite titles with fellow BookNook readers. Fill out the details below.
        </p>
      </div>

      {/* Book Form Container */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Book Title */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Book Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Pride and Prejudice"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
                />
              </div>
            </div>

            {/* Author Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Author Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Jane Austen"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
                />
              </div>
            </div>

            {/* Category Select Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total Copies */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Total Copies in Library <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Copy className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
                />
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Copies decrement dynamically as members borrow, and increment when books are returned.
              </p>
            </div>

            {/* Book Image (Upload to imgbb / direct link) */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Book Cover Image <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upload to ImgBB */}
                <div className="border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-4 text-center hover:border-primary-500 transition-colors flex flex-col items-center justify-center gap-2 bg-stone-50 dark:bg-stone-800/40">
                  <UploadCloud className="w-8 h-8 text-stone-400" />
                  <label className="cursor-pointer text-xs font-semibold text-primary-700 dark:text-primary-400 hover:underline">
                    {uploadingImage ? "Uploading to ImgBB..." : "Click to Upload File (ImgBB)"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-stone-400">PNG, JPG, or WEBP</span>
                </div>

                {/* Direct Image URL input */}
                <div className="flex flex-col justify-center space-y-1.5">
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Or Paste Cover Image URL directly:
                  </span>
                  <div className="relative">
                    <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Preview */}
              {image && (
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={image}
                    alt="Cover Preview"
                    className="w-16 h-20 object-cover rounded-lg border border-stone-200 dark:border-stone-700 shadow-sm"
                  />
                  <div className="text-xs text-stone-600 dark:text-stone-400">
                    <p className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Cover Image Attached
                    </p>
                    <p className="truncate max-w-xs text-stone-400">{image}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Short Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the book's narrative, themes, and why readers will cherish it..."
                  required
                  className="w-full p-3.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
                />
              </div>
            </div>

            {/* Read-Only: User Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                Contributor Name (Read-Only)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Read-Only: User Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                Contributor Email (Read-Only)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Book to Library...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Book to BookNook</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddBookPage() {
  return (
    <AuthGuard>
      <AddBookContent />
    </AuthGuard>
  );
}
