import React from 'react';

const TAG_STYLES = {
  'Theory-heavy': {
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    dot: 'bg-indigo-500'
  },
  'Practical-oriented': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    dot: 'bg-emerald-500'
  },
  'Slides-based': {
    bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    dot: 'bg-blue-500'
  },
  'Board-work': {
    bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    dot: 'bg-amber-500'
  },
  'Project-based': {
    bg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    dot: 'bg-purple-500'
  },
  'Discussion-driven': {
    bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    dot: 'bg-rose-500'
  },
  'Fast-paced': {
    bg: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
    dot: 'bg-orange-500'
  },
  'Beginner-friendly': {
    bg: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    dot: 'bg-teal-500'
  }
};

export default function StyleTagBadge({ tag, size = 'sm', active = false, onClick }) {
  const style = TAG_STYLES[tag] || {
    bg: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    dot: 'bg-slate-400'
  };

  const isClickable = !!onClick;

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-150 ${
        size === 'xs' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'
      } ${style.bg} ${
        isClickable ? 'cursor-pointer hover:shadow-sm hover:scale-105 active:scale-95' : ''
      } ${active ? 'ring-2 ring-emerald-500 font-semibold' : ''}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {tag}
    </span>
  );
}
