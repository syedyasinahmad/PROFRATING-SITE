import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0, max = 5, size = 'sm', showScore = false }) {
  const numRating = Number(rating) || 0;
  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const currentSize = starSizes[size] || starSizes.sm;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = numRating >= star;
          const half = !filled && numRating >= star - 0.5;

          return (
            <div key={star} className="relative">
              <Star
                className={`${currentSize} ${
                  filled
                    ? 'text-amber-400 fill-amber-400'
                    : half
                    ? 'text-amber-400 fill-amber-400/40'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            </div>
          );
        })}
      </div>
      {showScore && (
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm ml-0.5">
          {numRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
