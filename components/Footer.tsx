import React from "react";
import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin, Heart } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Official new X logo!

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-700 text-white flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Book<span className="text-primary-700 dark:text-primary-400">Nook</span>
              </span>
            </Link>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              BookNook is your warm community haven for discovering timeless stories, sharing cherished books, and borrowing with complete ease. Add a book, borrow a book, return a book.
            </p>
            {/* Social Links with the new X logo */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:bg-[#0077b5] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:bg-[#1877f2] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/add-book" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  Add New Book
                </Link>
              </li>
              <li>
                <Link href="/my-borrows" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  My Borrowed Shelf
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Book Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/books?category=Fiction" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  Fiction & Novels
                </Link>
              </li>
              <li>
                <Link href="/books?category=Science" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  Science & Exploration
                </Link>
              </li>
              <li>
                <Link href="/books?category=History" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  History & Biography
                </Link>
              </li>
              <li>
                <Link href="/books?category=Kids" className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                  Kids & Youth Fiction
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary-600 shrink-0" />
                <span>42 Reader Lane, Literary District, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-600 shrink-0" />
                <span>+1 (800) 266-5665 (BOOK-NOOK)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-600 shrink-0" />
                <span>support@booknook-library.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© {new Date().getFullYear()} BookNook Online Library. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for book lovers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
