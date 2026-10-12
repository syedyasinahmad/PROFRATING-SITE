import React from 'react';
import { Columns3, Check, ArrowUpRight, BookOpen } from 'lucide-react';
import RatingStars from './RatingStars';
import StyleTagBadge from './StyleTagBadge';
import { useCompare } from '../context/CompareContext';

export default function ProfessorCard({ professor, onSelect }) {
  const { toggleProfessor, isSelected } = useCompare();
  const selectedForCompare = isSelected(professor.id);

  // Top 3 teaching style tags from distribution
  const topStyles = Object.entries(professor.teaching_style_distribution || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-emerald-500/40">
      <div>
        {/* Top Header: Avatar, Name, Department & Overall Rating */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={professor.avatar_url}
              alt={professor.name}
              className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-emerald-500/40 transition-all shrink-0"
            />
            <div>
              <h3
                onClick={() => onSelect(professor.id)}
                className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 cursor-pointer transition-colors line-clamp-1"
              >
                {professor.name}
              </h3>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {professor.department}
              </p>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {professor.title}
              </p>
            </div>
          </div>

          {/* Rating Pill */}
          <div className="text-right shrink-0">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80">
              <span className="font-heading font-extrabold text-sm text-emerald-700 dark:text-emerald-300">
                {Number(professor.overall_rating).toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-400">/ 5</span>
            </div>
            <span className="block text-[10px] text-slate-400 mt-0.5">
              {professor.total_reviews} reviews
            </span>
          </div>
        </div>

        {/* Bio snippet */}
        {professor.bio && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {professor.bio}
          </p>
        )}

        {/* Secondary Metrics: Difficulty & Would Take Again */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs mb-3">
          <div>
            <span className="text-[10px] text-slate-400 block">Difficulty</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {Number(professor.difficulty_avg).toFixed(1)} / 5.0
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Would Take Again</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {professor.would_take_again_pct}%
            </span>
          </div>
        </div>

        {/* Top Teaching Style Tags */}
        {topStyles.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topStyles.map(tag => (
              <StyleTagBadge key={tag} tag={tag} size="xs" />
            ))}
          </div>
        )}
      </div>

      {/* Footer Controls: Compare Button + View Profile */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => toggleProfessor(professor)}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            selectedForCompare
              ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {selectedForCompare ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Columns3 className="w-3.5 h-3.5" />}
          <span>{selectedForCompare ? 'In Compare' : 'Compare'}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelect(professor.id)}
          className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Insights</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
