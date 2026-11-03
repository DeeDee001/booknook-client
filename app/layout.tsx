import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "BookNook | A Small Online Library",
    template: "%s | BookNook",
  },
  description:
    "BookNook is a warm community library to discover books, add your favorite reads, and borrow titles seamlessly. Add a book, borrow a book, return a book.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-primary-100 selection:text-primary-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="flex-1 w-full min-w-0 flex flex-col overflow-x-hidden">{children}</main>
            <Footer />
            <ToasterProvider />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
