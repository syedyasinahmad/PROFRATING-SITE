import React, { useState, useEffect } from 'react';
import { Columns3, X, Plus, Star, Check, AlertCircle } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import RatingStars from '../components/RatingStars';
import StyleTagBadge from '../components/StyleTagBadge';
import { api } from '../services/api';

export default function ComparePage({ onSelectProfessor }) {
  const { selectedProfessors, removeProfessor, toggleProfessor } = useCompare();
  const [allProfessors, setAllProfessors] = useState([]);
  const [detailedProfs, setDetailedProfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProfessors()
      .then(res => setAllProfessors(res.professors || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedProfessors.length > 0) {
      setLoading(true);
      const ids = selectedProfessors.map(p => p.id);
      api.compareProfessors(ids)
        .then(res => {
          setDetailedProfs(res.professors || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setDetailedProfs([]);
      setLoading(false);
    }
  }, [selectedProfessors]);

  const handleAddProfessor = (profId) => {
    const prof = allProfessors.find(p => p.id === profId);
    if (prof) toggleProfessor(prof);
  };

  const availableToAdd = allProfessors.filter(
    p => !selectedProfessors.some(sp => sp.id === p.id)
  );

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Columns3 className="w-7 h-7 text-emerald-500" />
            Side-by-Side Professor Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compare up to 3 professors to pick the best instructor for your semester schedule.
          </p>
        </div>

        {/* Add Professor Selector */}
        {selectedProfessors.length < 3 && availableToAdd.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) handleAddProfessor(e.target.value);
                e.target.value = '';
              }}
              defaultValue=""
              className="text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="" disabled>+ Add Professor to Compare</option>
              {availableToAdd.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.department})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedProfessors.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-4">
          <Columns3 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
            No professors selected for comparison
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Browse professors on the home page or search page and click "Compare" to view them side by side.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            {allProfessors.slice(0, 2).map(p => (
              <button
                key={p.id}
                onClick={() => toggleProfessor(p)}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800"
              >
                + Add {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      ) : loading ? (
        <div className="py-20 text-center text-sm text-slate-400">Loading comparison metrics...</div>
      ) : (
        /* Comparison Grid */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-x-auto">
          <div className="min-w-[650px] grid grid-cols-4 gap-6">
            {/* Criteria Column */}
            <div className="space-y-6 pt-36 border-r border-slate-100 dark:border-slate-800 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="h-10 flex items-center">Overall Rating</div>
              <div className="h-10 flex items-center">Difficulty (out of 5)</div>
              <div className="h-10 flex items-center">Would Take Again</div>
              <div className="h-10 flex items-center">Total Reviews</div>
              <div className="h-28 flex items-start pt-2">Top Teaching Styles</div>
              <div className="h-24 flex items-start pt-2">Courses Taught</div>
              <div className="h-32 flex items-start pt-2">AI Review Summary</div>
            </div>

            {/* Professor Columns */}
            {detailedProfs.map(prof => {
              const topStyles = Object.entries(prof.teaching_style_distribution || {})
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([tag]) => tag);

              return (
                <div key={prof.id} className="space-y-6 text-xs text-slate-800 dark:text-slate-200">
                  {/* Header: Photo + Name + Remove */}
                  <div className="h-36 flex flex-col items-center text-center relative border-b border-slate-100 dark:border-slate-800 pb-4">
                    <button
                      onClick={() => removeProfessor(prof.id)}
                      className="absolute top-0 right-0 p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={prof.avatar_url}
                      alt={prof.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30 mb-2 shadow-sm"
                    />
                    <h3
                      onClick={() => onSelectProfessor(prof.id)}
                      className="font-bold text-sm text-slate-900 dark:text-slate-100 cursor-pointer hover:text-emerald-500 transition-colors line-clamp-1"
                    >
                      {prof.name}
                    </h3>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {prof.department}
                    </p>
                  </div>

                  {/* Overall Rating */}
                  <div className="h-10 flex items-center gap-2">
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      {Number(prof.overall_rating).toFixed(1)}
                    </span>
                    <RatingStars rating={prof.overall_rating} size="xs" />
                  </div>

                  {/* Difficulty */}
                  <div className="h-10 flex items-center">
                    <span className="font-bold text-amber-500 text-sm">
                      {Number(prof.difficulty_avg).toFixed(1)} / 5.0
                    </span>
                  </div>

                  {/* Would Take Again */}
                  <div className="h-10 flex items-center font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {prof.would_take_again_pct}%
                  </div>

                  {/* Total Reviews */}
                  <div className="h-10 flex items-center text-slate-600 dark:text-slate-400 font-medium">
                    {prof.total_reviews} reviews
                  </div>

                  {/* Top Teaching Styles */}
                  <div className="h-28 flex flex-col gap-1.5 pt-1">
                    {topStyles.map(tag => (
                      <StyleTagBadge key={tag} tag={tag} size="xs" />
                    ))}
                  </div>

                  {/* Courses */}
                  <div className="h-24 flex flex-wrap gap-1 content-start pt-1">
                    {(prof.courses_data || []).map(crs => (
                      <span
                        key={crs.id}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {crs.code}
                      </span>
                    ))}
                  </div>

                  {/* AI Summary */}
                  <div className="h-32 pt-1 text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed line-clamp-4">
                    "{prof.ai_sentiment_summary}"
                  </div>

                  {/* View Profile Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => onSelectProfessor(prof.id)}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-colors"
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
