import React from 'react';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-slate-900 dark:text-slate-100">
                Prof<span className="text-emerald-500">Pulse</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering college students with transparent teaching-style analytics, semester trends, and verified peer feedback.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified .edu student community</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActivePage('search')} className="hover:text-emerald-500">
                  Search Professors
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('courses')} className="hover:text-emerald-500">
                  Course Syllabi & Notes
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('leaderboard')} className="hover:text-emerald-500">
                  Top Rated & Trending
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('compare')} className="hover:text-emerald-500">
                  Side-by-Side Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Popular Fields
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Computer Science & AI</li>
              <li>Mathematics & Statistics</li>
              <li>Mechanical Engineering</li>
              <li>Biology & Chemistry</li>
              <li>Economics & Business</li>
            </ul>
          </div>

          {/* Moderation & Academic Integrity */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Standards
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              All reviews are subject to profanity scrubbers, rate-limiting (1 review/prof/semester), and strict identity shielding.
            </p>
            <span className="inline-block px-2.5 py-1 text-[11px] rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
              Metropolitan University Campus Edition
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ProfPulse. Built with React & Tailwind CSS.</p>
          <p className="flex items-center gap-1">
            Made for college students with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
