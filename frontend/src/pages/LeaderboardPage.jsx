import React, { useState, useEffect } from 'react';
import { Trophy, Award, Flame, TrendingUp, ArrowUpRight } from 'lucide-react';
import { api } from '../services/api';
import RatingStars from '../components/RatingStars';
import StyleTagBadge from '../components/StyleTagBadge';

export default function LeaderboardPage({ onSelectProfessor }) {
  const [data, setData] = useState({ top_rated: [], trending: [], most_improved: [] });
  const [category, setCategory] = useState('top_rated'); // 'top_rated', 'trending', 'most_improved'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboards()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const activeList = data[category] || [];

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Trophy className="w-7 h-7 text-amber-500" />
          Campus Faculty Leaderboards
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Rankings computed from student reviews across teaching quality, student engagement, and multi-semester growth.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setCategory('top_rated')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            category === 'top_rated'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Top Rated Faculty</span>
        </button>

        <button
          onClick={() => setCategory('trending')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            category === 'trending'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Trending & Most Reviewed</span>
        </button>

        <button
          onClick={() => setCategory('most_improved')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            category === 'most_improved'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Most Improved Ratings</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400">Computing rankings...</div>
      ) : (
        <div className="space-y-3">
          {activeList.map((prof, idx) => (
            <div
              key={prof.id}
              onClick={() => onSelectProfessor(prof.id)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-xl font-heading font-black text-sm flex items-center justify-center shrink-0 ${
                  idx === 0
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 ring-2 ring-amber-400'
                    : idx === 1
                    ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                    : idx === 2
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    : 'text-slate-400'
                }`}>
                  {idx + 1}
                </span>

                <img
                  src={prof.avatar_url}
                  alt={prof.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-emerald-500/40 shrink-0"
                />

                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {prof.name}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {prof.department} • <span className="text-slate-400">{prof.title}</span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-1 mt-1">
                    "{prof.ai_sentiment_summary?.split('\n')[0]}"
                  </p>
                </div>
              </div>

              {/* Metrics Column */}
              <div className="flex items-center gap-6 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <div className="text-xl font-heading font-black text-emerald-600 dark:text-emerald-400">
                    {Number(prof.overall_rating).toFixed(1)} ★
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {prof.total_reviews} reviews • {prof.would_take_again_pct}% would take again
                  </span>
                </div>

                <div className="p-2 rounded-xl text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
