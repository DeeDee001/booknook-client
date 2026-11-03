import React from "react";
import { Search, BookmarkPlus, RotateCcw, ShieldCheck, HeartHandshake, BookOpenCheck } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Discover Your Read",
      description:
        "Browse curated genres including Fiction, Science, History, and Kids. Filter by availability or search directly by your favorite authors.",
    },
    {
      step: "02",
      icon: BookmarkPlus,
      title: "One-Click Borrowing",
      description:
        "Select an available book, set your preferred return date, and instantly reserve it. The library inventory updates dynamically.",
    },
    {
      step: "03",
      icon: RotateCcw,
      title: "Return & Share the Love",
      description:
        "Finished reading? Return the book via your borrow dashboard in one tap so fellow readers can enjoy it next.",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">
          Seamless Experience
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          How Borrowing Works at BookNook
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
          A straightforward three-step reading system designed to make borrowing and returning books effortless for every reader.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative rounded-2xl p-6 sm:p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 flex items-center justify-center shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-stone-200 dark:text-stone-800">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>

                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 dark:border-stone-800/60 mt-6 flex items-center gap-2 text-xs font-semibold text-primary-700 dark:text-primary-400">
                <BookOpenCheck className="w-4 h-4" />
                <span>Step {index + 1} of 3</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
