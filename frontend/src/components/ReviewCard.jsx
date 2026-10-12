import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Flag, User, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import RatingStars from './RatingStars';
import StyleTagBadge from './StyleTagBadge';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ReviewCard({ review, onVoteUpdated }) {
  const { user, openAuth } = useAuth();
  const [upvotes, setUpvotes] = useState(review.helpful_upvotes || 0);
  const [downvotes, setDownvotes] = useState(review.helpful_downvotes || 0);
  const [userVote, setUserVote] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('offensive_language');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleVote = async (type) => {
    if (!user) {
      openAuth('login');
      return;
    }

    try {
      const res = await api.voteReview(review.id, type);
      setUpvotes(res.helpful_upvotes);
      setDownvotes(res.helpful_downvotes);
      setUserVote(userVote === type ? null : type);
      if (onVoteUpdated) onVoteUpdated();
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!user) {
      openAuth('login');
      return;
    }

    try {
      await api.reportReview(review.id, { reason: reportReason, details: reportDetails });
      setReportSubmitted(true);
      setTimeout(() => {
        setReportModalOpen(false);
        setReportSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error('Report failed:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 transition-all">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
            {review.is_anonymous ? <ShieldCheck className="w-5 h-5 text-emerald-500" /> : <User className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                {review.is_anonymous ? 'Verified Student (Anonymous)' : review.student_name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {review.semester} {review.year}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Course: <span className="font-medium text-slate-700 dark:text-slate-300">{review.course_name}</span>
            </p>
          </div>
        </div>

        {/* Grade received & Would take again */}
        <div className="flex items-center gap-2">
          {review.grade_received && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Grade: {review.grade_received}
            </span>
          )}
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${
            review.would_take_again
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
          }`}>
            Would take again: {review.would_take_again ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      {/* Ratings sub-criteria grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Overall</span>
          <RatingStars rating={review.ratings?.overall || 5} size="xs" showScore />
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Clarity</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{review.ratings?.teaching_clarity || 5}/5</span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Grading Fairness</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{review.ratings?.grading_fairness || 5}/5</span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Difficulty</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{review.ratings?.difficulty || 3}/5</span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Attendance Strictness</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{review.ratings?.attendance_strictness || 3}/5</span>
        </div>
      </div>

      {/* Review Body */}
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
        {review.review_text}
      </p>

      {/* Teaching Style Tags */}
      {review.teaching_style_tags && review.teaching_style_tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {review.teaching_style_tags.map(tag => (
            <StyleTagBadge key={tag} tag={tag} size="xs" />
          ))}
        </div>
      )}

      {/* Bottom Actions: Helpful Upvote / Downvote and Report */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-600 dark:text-slate-400">Helpful review?</span>
          <button
            onClick={() => handleVote('up')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              userVote === 'up'
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{upvotes}</span>
          </button>
          <button
            onClick={() => handleVote('down')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              userVote === 'down'
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>{downvotes}</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (!user) openAuth('login');
            else setReportModalOpen(true);
          }}
          className="flex items-center gap-1 hover:text-rose-600 transition-colors text-slate-400 hover:text-rose-500"
          title="Report inappropriate review"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report</span>
        </button>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Report Review for Moderation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Help keep our campus community safe, honest, and respectful.
            </p>

            {reportSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                Report submitted to moderators. Thank you.
              </div>
            ) : (
              <form onSubmit={handleReport} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Reason *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="offensive_language">Offensive / abusive language</option>
                    <option value="hate_speech">Hate speech or harassment</option>
                    <option value="false_information">Blatantly false information / defamation</option>
                    <option value="spam">Spam / advertising</option>
                    <option value="other">Other policy violation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Additional Context (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details on why this review violates guidelines..."
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
