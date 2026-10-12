import React, { useState, useEffect } from 'react';
import {
  PenLine,
  Star,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StyleTagBadge from '../components/StyleTagBadge';

export default function WriteReviewPage({
  professor,
  onReviewSubmitted,
  onCancel
}) {
  const { user, openAuth } = useAuth();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [semester, setSemester] = useState('Fall');
  const [year, setYear] = useState('2024');
  const [wouldTakeAgain, setWouldTakeAgain] = useState(true);
  const [gradeReceived, setGradeReceived] = useState('A');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // 5 Sub-category ratings
  const [ratings, setRatings] = useState({
    overall: 5.0,
    teaching_clarity: 5.0,
    grading_fairness: 4.5,
    helpfulness: 5.0,
    difficulty: 3.5,
    attendance_strictness: 3.0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const availableTags = [
    "Theory-heavy",
    "Practical-oriented",
    "Slides-based",
    "Board-work",
    "Project-based",
    "Discussion-driven",
    "Fast-paced",
    "Beginner-friendly"
  ];

  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'Pass', 'Drop', 'Audit'];

  useEffect(() => {
    if (professor?.id) {
      api.getCourses()
        .then(res => {
          const profCourses = (res.courses || []).filter(c => (professor.courses || []).includes(c.id));
          setCourses(profCourses.length > 0 ? profCourses : res.courses || []);
          if (profCourses.length > 0) setCourseId(profCourses[0].id);
        })
        .catch(console.error);
    }
  }, [professor]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleRatingChange = (key, val) => {
    setRatings(prev => ({ ...prev, [key]: Number(val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      openAuth('login');
      return;
    }

    if (!reviewText.trim()) {
      setError('Please write at least a sentence explaining your experience with this professor.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await api.createReview({
        professor_id: professor.id,
        course_id: courseId,
        semester,
        year: Number(year),
        is_anonymous: isAnonymous,
        would_take_again: wouldTakeAgain,
        grade_received: gradeReceived,
        review_text: reviewText,
        teaching_style_tags: selectedTags,
        ratings
      });

      setSuccessMsg(res.message);
      setTimeout(() => {
        if (onReviewSubmitted) onReviewSubmitted(res.review);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={professor.avatar_url}
            alt={professor.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30"
          />
          <div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {professor.department}
            </span>
            <h1 className="font-heading font-black text-2xl text-slate-900 dark:text-slate-100">
              Rate {professor.name}
            </h1>
            <p className="text-xs text-slate-400">
              Only verified college students can post. Strict rate limiting: 1 review per professor per semester.
            </p>
          </div>
        </div>

        {/* Verification callout */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>
            {user ? (
              <>Posting with verified college account <strong>{user.email}</strong>. Identity remains completely anonymous to public students.</>
            ) : (
              <>You must sign in with your verified college email (.edu) to post a review.</>
            )}
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2 shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Section 1: Course, Semester & Grade */}
        <div>
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 mb-3">
            1. Course Details & Academic Term
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Taught *
              </label>
              <select
                required
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.code}: {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Semester & Term *
              </label>
              <div className="flex gap-2">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-1/2 text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-1/2 text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Grade Received (Optional)
              </label>
              <select
                value={gradeReceived}
                onChange={(e) => setGradeReceived(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                {grades.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Ratings Across 5 Categories */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
            2. Rating Categories (1 - 5 Scale)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Rate specific aspects of teaching style and classroom expectations.
          </p>

          <div className="space-y-4 text-xs">
            {/* Overall */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Overall Instructor Quality</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{ratings.overall} ★</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={ratings.overall}
                onChange={(e) => handleRatingChange('overall', e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Teaching Clarity */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Clarity of Teaching</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{ratings.teaching_clarity} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={ratings.teaching_clarity}
                onChange={(e) => handleRatingChange('teaching_clarity', e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Marks & Grading Fairness */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Marks & Grading Fairness</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{ratings.grading_fairness} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={ratings.grading_fairness}
                onChange={(e) => handleRatingChange('grading_fairness', e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Helpfulness */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Helpfulness & Approachability</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{ratings.helpfulness} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={ratings.helpfulness}
                onChange={(e) => handleRatingChange('helpfulness', e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Difficulty */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Course Difficulty Level</span>
                <span className="font-bold text-amber-500">{ratings.difficulty} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={ratings.difficulty}
                onChange={(e) => handleRatingChange('difficulty', e.target.value)}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Attendance Strictness */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Attendance Strictness</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{ratings.attendance_strictness} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={ratings.attendance_strictness}
                onChange={(e) => handleRatingChange('attendance_strictness', e.target.value)}
                className="w-full accent-slate-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Teaching Style Tags */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
            3. Select Teaching Style Tags
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Choose all attributes describing how this professor teaches (select at least 1).
          </p>

          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    active
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tag} {active ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Would take again & Anonymity */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700">
            <span className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Would you take a class with this professor again?
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setWouldTakeAgain(true)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  wouldTakeAgain
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setWouldTakeAgain(false)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !wouldTakeAgain
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                Post Anonymously
              </span>
              <p className="text-[11px] text-slate-500">
                Hide your name publicly while maintaining verified student status.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Section 5: Written Review */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1">
            4. Written Review & Advice for Future Students *
          </label>
          <textarea
            required
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Discuss lecture pacing, homework difficulty, office hour helpfulness, and exam style..."
            className="w-full text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/30 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Post Review'}
          </button>
        </div>
      </form>
    </div>
  );
}
