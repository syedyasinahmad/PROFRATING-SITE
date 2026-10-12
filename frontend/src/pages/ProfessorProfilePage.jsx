import React, { useState, useEffect } from 'react';
import {
  Star,
  Bell,
  BellRing,
  Columns3,
  PenLine,
  BookOpen,
  Sparkles,
  TrendingUp,
  FileText,
  Check,
  CheckCircle2,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import RatingStars from '../components/RatingStars';
import StyleTagBadge from '../components/StyleTagBadge';
import SemesterHistoryChart from '../components/SemesterHistoryChart';
import TeachingStyleRadar from '../components/TeachingStyleRadar';
import VideoLectureSection from '../components/VideoLectureSection';
import ReviewCard from '../components/ReviewCard';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';

export default function ProfessorProfilePage({
  professorId,
  onWriteReview,
  onSelectCourse
}) {
  const { user, openAuth } = useAuth();
  const { toggleProfessor, isSelected } = useCompare();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followAlertMsg, setFollowAlertMsg] = useState(null);

  const fetchProfile = () => {
    setLoading(true);
    api.getProfessorById(professorId)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
    if (user && user.followed_professors) {
      setIsFollowing(user.followed_professors.includes(professorId));
    }
  }, [professorId, user]);

  const handleToggleFollow = async () => {
    if (!user) {
      openAuth('login');
      return;
    }

    try {
      const res = await api.toggleFollow(professorId);
      setIsFollowing(res.is_following);
      setFollowAlertMsg(res.message);
      setTimeout(() => setFollowAlertMsg(null), 3500);
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-sm text-slate-400">Loading professor profile & insights...</div>;
  }

  if (!data || !data.professor) {
    return <div className="py-24 text-center text-sm text-rose-500">Professor details could not be found.</div>;
  }

  const { professor, reviews } = data;
  const inCompare = isSelected(professor.id);
  const subRatings = professor.sub_ratings_avg || {};

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto">
      {/* Follow alert banner */}
      {followAlertMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{followAlertMsg}</span>
          </div>
        </div>
      )}

      {/* Hero Profile Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={professor.avatar_url}
            alt={professor.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-md shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                {professor.department}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {professor.college_name || 'Metropolitan University'}
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 dark:text-slate-100">
              {professor.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              {professor.title}
            </p>
            {professor.bio && (
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl pt-1 leading-relaxed">
                {professor.bio}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons: Write Review, Follow, Compare */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={() => onWriteReview(professor)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all"
          >
            <PenLine className="w-4 h-4" />
            <span>Rate Professor</span>
          </button>

          <button
            onClick={handleToggleFollow}
            className={`p-2.5 rounded-xl border transition-all ${
              isFollowing
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isFollowing ? 'Following (email notifications enabled)' : 'Follow for review alerts'}
          >
            {isFollowing ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          </button>

          <button
            onClick={() => toggleProfessor(professor)}
            className={`p-2.5 rounded-xl border transition-all ${
              inCompare
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Add to Compare Drawer"
          >
            {inCompare ? <Check className="w-4 h-4" /> : <Columns3 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Core Metrics & AI Sentiment Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Metric 1: Overall Rating */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Overall Rating</span>
          <div className="text-4xl font-heading font-black text-emerald-600 dark:text-emerald-400 mb-1">
            {Number(professor.overall_rating).toFixed(1)}
          </div>
          <div className="flex justify-center mb-1">
            <RatingStars rating={professor.overall_rating} size="sm" />
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Based on {professor.total_reviews} student reviews
          </span>
        </div>

        {/* Metric 2: Difficulty Level */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Difficulty Level</span>
          <div className="text-4xl font-heading font-black text-amber-500 mb-1">
            {Number(professor.difficulty_avg).toFixed(1)}
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 mb-1">
            {professor.difficulty_avg >= 4 ? 'Demanding' : professor.difficulty_avg >= 3 ? 'Moderate' : 'Approachable'}
          </span>
          <span className="text-[11px] text-slate-400 block">Out of 5.0 scale</span>
        </div>

        {/* Metric 3: Would Take Again */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Would Take Again</span>
          <div className="text-4xl font-heading font-black text-emerald-600 dark:text-emerald-400 mb-1">
            {professor.would_take_again_pct}%
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Student Recommendation
          </span>
          <span className="text-[11px] text-slate-400">High peer satisfaction</span>
        </div>

        {/* Metric 4: Auto-Generated AI 2-Line Sentiment Summary */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:from-emerald-950/50 dark:via-slate-900 dark:to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>AI Review Sentiment</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic whitespace-pre-line">
              "{professor.ai_sentiment_summary}"
            </p>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block font-medium">
            Generated synthesized summary
          </span>
        </div>
      </div>

      {/* Teaching Style Breakdown & 5-Criteria Ratings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: 5 Sub-category 1-5 Star Ratings Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Evaluation Across 5 Categories
            </h3>
            <span className="text-xs text-slate-400">Average Scores</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Clarity of Teaching</span>
                <span className="text-emerald-600 dark:text-emerald-400">{subRatings.teaching_clarity} / 5.0</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(subRatings.teaching_clarity / 5) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Marks & Grading Fairness</span>
                <span className="text-emerald-600 dark:text-emerald-400">{subRatings.grading_fairness} / 5.0</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(subRatings.grading_fairness / 5) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Helpfulness & Approachability</span>
                <span className="text-emerald-600 dark:text-emerald-400">{subRatings.helpfulness} / 5.0</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(subRatings.helpfulness / 5) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Difficulty Level</span>
                <span className="text-amber-600 dark:text-amber-400">{subRatings.difficulty} / 5.0</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(subRatings.difficulty / 5) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Attendance Strictness</span>
                <span className="text-slate-700 dark:text-slate-300">{subRatings.attendance_strictness} / 5.0</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 dark:bg-slate-600 h-2 rounded-full" style={{ width: `${(subRatings.attendance_strictness / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Teaching Style Tags & Distribution Radar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              Teaching Style Insights
            </h3>
            <span className="text-xs text-slate-400">Classroom Method</span>
          </div>

          <TeachingStyleRadar distribution={professor.teaching_style_distribution || {}} />
        </div>
      </div>

      {/* Semester-wise History (Line Chart) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Semester-Wise Rating & Difficulty History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track how students evaluated this professor across past terms.
            </p>
          </div>
        </div>

        <SemesterHistoryChart history={professor.semester_history || []} />
      </div>

      {/* Courses Taught Section + Syllabi and Notes Links */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            Courses Taught & Academic Resources
          </h3>
          <span className="text-xs text-slate-400">{professor.courses_data?.length || 0} courses</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(professor.courses_data || []).map(crs => (
            <div
              key={crs.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {crs.code}
                </span>
                <button
                  onClick={() => onSelectCourse(crs.id)}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  View Course Hub →
                </button>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {crs.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {crs.description}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                {crs.syllabus_url && (
                  <a
                    href={crs.syllabus_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-emerald-500 font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Official Syllabus</span>
                  </a>
                )}
                {crs.notes_url && (
                  <a
                    href={crs.notes_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-emerald-500 font-medium"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Shared Class Notes</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded YouTube Lecture Demos Section */}
      <VideoLectureSection
        professorId={professor.id}
        professorName={professor.name}
        videos={professor.videos || []}
        onVideoSubmitted={fetchProfile}
      />

      {/* Written Reviews Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-100">
              Student Reviews ({reviews.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Only verified @college.edu students can submit reviews. Identity shielded.
            </p>
          </div>
          <button
            onClick={() => onWriteReview(professor)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition-all self-start sm:self-auto"
          >
            <PenLine className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-2">
            <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
              Be the first to review {professor.name}!
            </p>
            <p className="text-xs text-slate-500">
              Share your insights about teaching clarity, difficulty, and homework expectations.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map(rev => (
              <ReviewCard key={rev.id} review={rev} onVoteUpdated={fetchProfile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
