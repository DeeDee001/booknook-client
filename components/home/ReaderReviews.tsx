import React from "react";
import { Star, Quote, Award, Users, BookOpen } from "lucide-react";

export const ReaderReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Eleanor Vance",
      role: "Literature Enthusiast",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "BookNook has completely reignited my passion for weekend reading. Being able to browse community contributions and borrow with instant stock updates is simply wonderful.",
      favoriteBook: "The Midnight Library",
    },
    {
      id: 2,
      name: "Marcus Sterling",
      role: "History & Science Reader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "The interface is so clean and intuitive! I added three books from my personal shelf and was delighted to see other readers borrowing them within days.",
      favoriteBook: "Cosmos by Carl Sagan",
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      role: "High School Educator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment:
        "I love the transparent return schedule and duplicate borrow checks. It makes borrowing books responsibly so convenient for our study group.",
      favoriteBook: "To Kill a Mockingbird",
    },
  ];

  return (
    <section className="py-6 sm:py-12 lg:py-16">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-6 sm:mb-12">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">
          Community Voices
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          Loved by Readers Everywhere
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
          Read candid thoughts from genuine readers sharing their reading journey through BookNook.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {reviews.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-2xl p-5 sm:p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-stone-300 dark:text-stone-700" />
              </div>

              {/* Review Text */}
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic">
                "{item.comment}"
              </p>
            </div>

            {/* Reviewer Details */}
            <div className="pt-6 border-t border-stone-100 dark:border-stone-800 mt-6 flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-primary-500/30"
              />
              <div className="text-left">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {item.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-8 sm:mt-12 rounded-2xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-900/50 p-5 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-primary-800 dark:text-primary-300">
              5,000+
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
              Books Cataloged & Shared
            </p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-l sm:border-r border-primary-200/60 dark:border-primary-800/60 pt-4 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-primary-800 dark:text-primary-300">
              1,200+
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
              Active Community Readers
            </p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 border-primary-200/60 dark:border-primary-800/60 pt-4 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-primary-800 dark:text-primary-300">
              100%
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium">
              Free Community Borrowing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
