import React from 'react';
import StyleTagBadge from './StyleTagBadge';

export default function TeachingStyleRadar({ distribution = {} }) {
  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-slate-400">
        No style tags recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map(([tag, percentage]) => {
        return (
          <div key={tag} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <StyleTagBadge tag={tag} size="xs" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
