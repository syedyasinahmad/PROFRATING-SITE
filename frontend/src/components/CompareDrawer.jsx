import React from 'react';
import { Columns3, X, ArrowRight } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import RatingStars from './RatingStars';

export default function CompareDrawer({ onOpenComparePage }) {
  const { selectedProfessors, removeProfessor, clearAll, isDrawerOpen, setIsDrawerOpen } = useCompare();

  if (selectedProfessors.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 ring-1 ring-black/5 dark:ring-white/10">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Columns3 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Compare Professors ({selectedProfessors.length}/3)
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Side-by-side teaching styles & ratings
            </p>
          </div>
        </div>

        {/* Selected Avatars and chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedProfessors.map(prof => (
            <div
              key={prof.id}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            >
              <img
                src={prof.avatar_url}
                alt={prof.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[90px]">
                {(prof.name || 'Professor').split(' ').slice(-1)[0]}
              </span>
              <button
                onClick={() => removeProfessor(prof.id)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearAll}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
          >
            Clear
          </button>
          <button
            onClick={onOpenComparePage}
            disabled={selectedProfessors.length < 2}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
