import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Layers,
  Flame,
  Trophy
} from 'lucide-react';
import ProfessorCard from '../components/ProfessorCard';
import StyleTagBadge from '../components/StyleTagBadge';
import { api } from '../services/api';

export default function HomePage({
  onSelectProfessor,
  onSearchSubmit,
  onOpenQuiz,
  onNavigatePage
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [professors, setProfessors] = useState([]);
  const [leaderboards, setLeaderboards] = useState({ top_rated: [], trending: [], most_improved: [] });
  const [loading, setLoading] = useState(true);

  const departments = [
    'All',
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology',
    'Economics',
    'Psychology',
    'English',
    'Chemistry',
    'Mechanical Engineering'
  ];

  const styleTags = [
    "Practical-oriented",
    "Board-work",
    "Project-based",
    "Theory-heavy",
    "Discussion-driven",
    "Slides-based",
    "Beginner-friendly",
    "Fast-paced"
  ];

  useEffect(() => {
    Promise.all([
      api.getProfessors({ department: selectedDept === 'All' ? '' : selectedDept }),
      api.getLeaderboards()
    ])
      .then(([profData, leadData]) => {
        setProfessors(profData.professors || []);
        setLeaderboards(leadData || { top_rated: [], trending: [], most_improved: [] });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching home data:', err);
        setLoading(false);
      });
  }, [selectedDept]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchQuery, selectedDept);
  };

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden px-6 py-16 sm:py-20 text-center bg-gradient-to-b from-emerald-500/10 via-slate-50/50 to-transparent dark:from-emerald-950/40 dark:via-navy-900/40 dark:to-transparent border border-emerald-500/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Next-Gen Professor Ratings & Teaching Analytics
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Find Professors Who Teach <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-400/40 decoration-wavy">The Way You Learn</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Beyond standard star scores: discover board-work vs slide usage, semester-by-semester difficulty trends, syllabus links, and lecture demos.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative pt-2">
            <div className="flex items-center rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-emerald-500/5 border border-slate-200 dark:border-slate-800 p-2 ring-1 ring-black/5">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by professor name, department, or course (e.g. Alexander Wright, CS301)..."
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/30 shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Department Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {departments.slice(0, 6).map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedDept === dept
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* "Best For You" Quiz Banner Card */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Matcher
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
            Not sure which professor fits your learning style?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100">
            Take our 60-second quiz: we calculate your whiteboard, slides, or hands-on project compatibility and match you with the best instructors.
          </p>
        </div>
        <button
          onClick={onOpenQuiz}
          className="px-6 py-3.5 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 shrink-0 flex items-center gap-2"
        >
          <span>Take 60-Sec Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Teaching Style Tag Hub */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Explore by Teaching Style
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter instructors based on how they actually run lectures and grade.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {styleTags.map(tag => (
            <StyleTagBadge
              key={tag}
              tag={tag}
              size="lg"
              onClick={() => onSearchSubmit('', 'All', tag)}
            />
          ))}
        </div>
      </section>

      {/* Featured Professors Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              {selectedDept === 'All' ? 'Top Rated Faculty' : `${selectedDept} Faculty`}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comprehensive student metrics, difficulty ratings, and teaching summaries.
            </p>
          </div>
          <button
            onClick={() => onNavigatePage('search')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({professors.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Loading professors...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professors.slice(0, 6).map(prof => (
              <ProfessorCard
                key={prof.id}
                professor={prof}
                onSelect={onSelectProfessor}
              />
            ))}
          </div>
        )}
      </section>

      {/* Leaderboard Highlights: Top Rated vs Trending vs Most Improved */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              Faculty Leaderboards
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Campus rankings for highest overall ratings, active reviews, and recent improvement.
            </p>
          </div>
          <button
            onClick={() => onNavigatePage('leaderboard')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Full Rankings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Rated */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                Top Rated Faculty
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Rating</span>
            </div>
            <div className="space-y-3">
              {(leaderboards.top_rated || []).slice(0, 4).map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProfessor(p.id)}
                  className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-xs font-bold text-slate-400">{idx + 1}.</span>
                    <img src={p.avatar_url} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">{p.department}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {Number(p.overall_rating).toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                Most Reviewed & Trending
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Reviews</span>
            </div>
            <div className="space-y-3">
              {(leaderboards.trending || []).slice(0, 4).map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProfessor(p.id)}
                  className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-xs font-bold text-slate-400">{idx + 1}.</span>
                    <img src={p.avatar_url} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">{p.department}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                    {p.total_reviews}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Improved */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Most Improved
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Trend</span>
            </div>
            <div className="space-y-3">
              {(leaderboards.most_improved || []).slice(0, 4).map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProfessor(p.id)}
                  className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-xs font-bold text-slate-400">{idx + 1}.</span>
                    <img src={p.avatar_url} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">{p.department}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300">
                    +{(p.overall_rating - 4.0 > 0 ? (p.overall_rating - 4.0).toFixed(1) : '0.4')} ★
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
