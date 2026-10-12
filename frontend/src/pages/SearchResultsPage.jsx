import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import ProfessorCard from '../components/ProfessorCard';
import { api } from '../services/api';

export default function SearchResultsPage({
  initialQuery = '',
  initialDept = 'All',
  initialTag = 'All',
  onSelectProfessor
}) {
  const [search, setSearch] = useState(initialQuery);
  const [department, setDepartment] = useState(initialDept);
  const [teachingStyle, setTeachingStyle] = useState(initialTag);
  const [minRating, setMinRating] = useState(0);
  const [maxDifficulty, setMaxDifficulty] = useState(5);
  const [sortBy, setSortBy] = useState('rating_desc');
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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
    'All',
    'Theory-heavy',
    'Practical-oriented',
    'Slides-based',
    'Board-work',
    'Project-based',
    'Discussion-driven',
    'Fast-paced',
    'Beginner-friendly'
  ];

  const fetchResults = () => {
    setLoading(true);
    api.getProfessors({
      search: search || '',
      department: department === 'All' ? '' : department,
      teachingStyle: teachingStyle === 'All' ? '' : teachingStyle,
      minRating: minRating > 0 ? minRating : '',
      maxDifficulty: maxDifficulty < 5 ? maxDifficulty : '',
      sortBy
    })
      .then(res => {
        setProfessors(res.professors || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResults();
  }, [department, teachingStyle, minRating, maxDifficulty, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchResults();
  };

  const handleResetFilters = () => {
    setSearch('');
    setDepartment('All');
    setTeachingStyle('All');
    setMinRating(0);
    setMaxDifficulty(5);
    setSortBy('rating_desc');
  };

  return (
    <div className="space-y-6 py-6">
      {/* Top Header & Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
            Browse & Search Faculty
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {professors.length} professors found matching criteria
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, department, or keywords..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
          >
            Find
          </button>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Main Container: Sidebar Filters + Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Controls Sidebar (Desktop + Mobile Dropdown) */}
        <div className={`md:block space-y-6 ${mobileFilterOpen ? 'block' : 'hidden'} md:col-span-1`}>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-500" />
                Refine Filters
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] text-slate-400 hover:text-emerald-500 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Teaching Style Tag Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Primary Teaching Style
              </label>
              <select
                value={teachingStyle}
                onChange={(e) => setTeachingStyle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {styleTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Min Rating Range */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Min Overall Rating</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{minRating > 0 ? `${minRating} ★` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Max Difficulty Range */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Max Difficulty</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{maxDifficulty < 5 ? `${maxDifficulty}/5` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={maxDifficulty}
                onChange={(e) => setMaxDifficulty(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Sort Results By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="rating_desc">Highest Rating First</option>
                <option value="rating_asc">Lowest Rating First</option>
                <option value="difficulty_asc">Easiest Difficulty First</option>
                <option value="difficulty_desc">Hardest Difficulty First</option>
                <option value="reviews_desc">Most Reviews</option>
                <option value="name_asc">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="md:col-span-3 space-y-4">
          {loading ? (
            <div className="py-20 text-center text-sm text-slate-400">Loading faculty profiles...</div>
          ) : professors.length === 0 ? (
            <div className="py-20 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-8 space-y-2">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
                No matching professors found
              </h3>
              <p className="text-xs text-slate-500">
                Try loosening your filters or resetting the department search.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {professors.map(prof => (
                <ProfessorCard
                  key={prof.id}
                  professor={prof}
                  onSelect={onSelectProfessor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
