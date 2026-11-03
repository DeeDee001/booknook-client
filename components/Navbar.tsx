"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  PlusCircle,
  BookmarkCheck,
  Library,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

export const Navbar: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    toast.success("Successfully logged out of BookNook");
  };

  const navLinks = [
    { name: "Home", href: "/", public: true },
    { name: "All Books", href: "/books", public: true },
    { name: "Add Book", href: "/add-book", public: false },
    { name: "My Books", href: "/my-books", public: false },
    { name: "My Borrows", href: "/my-borrows", public: false },
  ];

  const visibleLinks = navLinks.filter((link) => link.public || !!user);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Website Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
            Book<span className="text-primary-700 dark:text-primary-400">Nook</span>
          </span>
        </Link>

        {/* Center / Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-primary-50 dark:bg-primary-950/50 text-primary-800 dark:text-primary-300 shadow-sm"
                    : "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Auth / Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-stone-600 hover:-rotate-12 transition-transform" />
              )}
            </button>
          )}

          {/* User Auth Section */}
          {isLoading ? (
            <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-700 animate-pulse" />
          ) : user ? (
            /* Logged in: User Photo with Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary-500/30 transition-all focus:outline-none"
                aria-expanded={profileDropdownOpen}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary-600/40"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary-700 text-white flex items-center justify-center font-semibold text-sm shadow">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2.5 border-b border-stone-100 dark:border-stone-800">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                      My Profile
                    </div>
                    <Link
                      href="/my-books"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      <Library className="w-4 h-4 text-primary-600" />
                      My Added Books
                    </Link>
                    <Link
                      href="/my-borrows"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      <BookmarkCheck className="w-4 h-4 text-primary-600" />
                      My Borrowed Books
                    </Link>
                  </div>

                  <div className="border-t border-stone-100 dark:border-stone-800 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged out: Login and Register buttons */
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary-700 hover:bg-primary-800 text-white shadow-sm transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-3 pb-6 space-y-2">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 dark:bg-primary-950/50 text-primary-800 dark:text-primary-300 font-semibold"
                    : "text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {!user && !isLoading && (
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-base font-medium border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-base font-medium bg-primary-700 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
