import React, { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Star,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import RatingStars from '../components/RatingStars';
import StyleTagBadge from '../components/StyleTagBadge';

export default function StudentDashboardPage({
  onSelectProfessor,
  onWriteReview
}) {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    setLoading(true);
    api.getMe()
      .then(res => {
        setProfileData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-sm text-slate-400">Loading student dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="py-24 text-center space-y-3">
        <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Student Portal Access
        </h2>
        <p className="text-xs text-slate-500">Please sign in with your college credentials to view your dashboard.</p>
      </div>
    );
  }

  const myReviews = profileData?.my_reviews || [];
  const followedProfs = profileData?.followed_professors_data || [];

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto">
      {/* Student Profile Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-emerald-500/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-2xl text-slate-900 dark:text-slate-100">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Verified Student
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Campus Domain: @{user.college_domain || 'college.edu'}
            </p>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs font-semibold text-slate-400 block">Reviews Written</span>
            <span className="text-xl font-heading font-black text-emerald-600 dark:text-emerald-400">
              {myReviews.length}
            </span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs font-semibold text-slate-400 block">Followed Faculty</span>
            <span className="text-xl font-heading font-black text-emerald-600 dark:text-emerald-400">
              {followedProfs.length}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Followed Faculty & My Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Followed Professors (with notification alerts) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Followed Professors
            </h2>
            <span className="text-xs text-slate-400">{followedProfs.length} followed</span>
          </div>

          {followedProfs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-xs text-slate-400">
              You haven't followed any professors yet. Click the bell icon on any professor profile to receive email updates when new reviews are posted.
            </div>
          ) : (
            <div className="space-y-3">
              {followedProfs.map(prof => (
                <div
                  key={prof.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prof.avatar_url}
                      alt={prof.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <h4
                        onClick={() => onSelectProfessor(prof.id)}
                        className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 cursor-pointer transition-colors line-clamp-1"
                      >
                        {prof.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">{prof.department}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          {Number(prof.overall_rating).toFixed(1)} ★
                        </span>
                        <span className="text-[10px] text-slate-400">({prof.total_reviews} revs)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProfessor(prof.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title="View Profile"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: My Posted Reviews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-emerald-500" />
              My Submitted Reviews
            </h2>
            <span className="text-xs text-slate-400">{myReviews.length} posted</span>
          </div>

          {myReviews.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-xs text-slate-400">
              You haven't submitted any course evaluations yet. Visit a professor profile to share your feedback!
            </div>
          ) : (
            <div className="space-y-4">
              {myReviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {rev.course_name}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {rev.semester} {rev.year} • {rev.is_anonymous ? 'Anonymous to public' : 'Public attribution'}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {rev.ratings?.overall || 5} ★
                      </span>
                      {rev.grade_received && (
                        <span className="block text-[10px] text-slate-400 mt-1">
                          Grade: {rev.grade_received}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.review_text}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                    <div className="flex gap-1">
                      {(rev.teaching_style_tags || []).map(t => (
                        <StyleTagBadge key={t} tag={t} size="xs" />
                      ))}
                    </div>
                    <span>{rev.helpful_upvotes || 0} students found helpful</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
