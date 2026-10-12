import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  User,
  ShieldAlert,
  LogOut,
  Columns3,
  BookOpen,
  Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCompare } from '../context/CompareContext';

export default function Navbar({ activePage, setActivePage, onOpenQuiz }) {
  const { user, logout, openAuth } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { selectedProfessors } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Explore & Search' },
    { id: 'courses', label: 'Courses' },
    { id: 'leaderboard', label: 'Leaderboard' },
  ];

  return (
    <nav className="sticky top-0 z-40 glass-nav transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-slate-900 dark:text-slate-50 tracking-tight">
                Prof<span className="text-emerald-500">Pulse</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 -mt-1 font-medium tracking-wide">
                TEACHING STYLE INSIGHTS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activePage === item.id
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Compare shortcut badge */}
            <button
              onClick={() => setActivePage('compare')}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePage === 'compare'
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Compare</span>
              {selectedProfessors.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {selectedProfessors.length}
                </span>
              )}
            </button>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* "Best for You" Quiz CTA */}
            <button
              onClick={onOpenQuiz}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:from-emerald-500/20 hover:to-teal-500/20 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Best For You Quiz</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User Account / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                    {(user?.name || 'S').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[100px]">
                    {(user?.name || 'Student').split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    onClick={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => setActivePage('dashboard')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-500" />
                      Student Dashboard
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => setActivePage('admin')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Admin Moderation
                      </button>
                    )}

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 transition-all"
                >
                  Join (.edu)
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                activePage === item.id
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setActivePage('compare'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Columns3 className="w-4 h-4 text-emerald-500" />
              Compare Professors
            </span>
            {selectedProfessors.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                {selectedProfessors.length}
              </span>
            )}
          </button>
          <button
            onClick={() => { onOpenQuiz(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40"
          >
            <Sparkles className="w-4 h-4" />
            "Best For You" Quiz
          </button>
        </div>
      )}
    </nav>
  );
}
