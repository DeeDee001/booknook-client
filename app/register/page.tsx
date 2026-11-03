"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Password validation criteria
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isMinLength = password.length >= 6;
  const isPasswordValid = hasUpperCase && hasLowerCase && isMinLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Please enter your full name.");
      toast.error("Name is required");
      return;
    }

    if (!email.trim()) {
      setFormError("Please enter a valid email address.");
      toast.error("Email is required");
      return;
    }

    // Strict Password Validation per prompt requirements
    if (!isPasswordValid) {
      const errorMsg =
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.";
      setFormError(errorMsg);
      toast.error("Password does not meet required security criteria");
      return;
    }

    setLoading(true);
    try {
      const defaultPhoto = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}`;

      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password: password,
        image: defaultPhoto,
      });

      if (result.error) {
        const errorText = result.error.message || "Failed to create account. Email may already be in use.";
        setFormError(errorText);
        toast.error(errorText);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully! Please login with your credentials.");
      // Redirect to Login page as specified in requirements
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } catch (err: any) {
      const msg = err.message || "An unexpected error occurred during registration.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setFormError(null);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err: any) {
      toast.error(err.message || "Google sign-up could not be completed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-xl bg-primary-700 text-white flex items-center justify-center shadow-md">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Join BookNook
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Create an account to borrow books and share your library
        </p>
      </div>

      {/* Form Error Banner */}
      {formError && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{formError}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Austen"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane.austen@booknook.com"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Real-time Password Validation Badges */}
          <div className="pt-2 space-y-1.5 bg-stone-50 dark:bg-stone-800/60 p-3 rounded-xl border border-stone-100 dark:border-stone-800">
            <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
              Password Requirements:
            </p>
            <div className="grid grid-cols-1 gap-1 text-xs">
              <div className="flex items-center gap-2">
                {hasUpperCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-stone-400" />
                )}
                <span className={hasUpperCase ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-stone-500"}>
                  At least one uppercase letter (A-Z)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {hasLowerCase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-stone-400" />
                )}
                <span className={hasLowerCase ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-stone-500"}>
                  At least one lowercase letter (a-z)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isMinLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-stone-400" />
                )}
                <span className={isMinLength ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-stone-500"}>
                  Minimum 6 characters in length
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading || !isPasswordValid}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Create BookNook Account</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-stone-200 dark:border-stone-800 w-full" />
        <span className="bg-white dark:bg-stone-900 px-3 text-xs uppercase text-stone-400 font-medium absolute">
          Or Continue With
        </span>
      </div>

      {/* Google Social Login Button */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/60 text-stone-700 dark:text-stone-200 font-medium text-sm transition-all shadow-sm"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-stone-600" />
        ) : (
          <FcGoogle className="w-5 h-5" />
        )}
        <span>Sign up with Google</span>
      </button>

      {/* Login Link */}
      <p className="text-center text-xs text-stone-600 dark:text-stone-400">
        Already have a BookNook account?{" "}
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="font-bold text-primary-700 dark:text-primary-400 hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </div>
  );
}
