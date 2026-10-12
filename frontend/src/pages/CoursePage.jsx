import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Search, User, ArrowUpRight, ExternalLink } from 'lucide-react';
import { api } from '../services/api';
import RatingStars from '../components/RatingStars';

export default function CoursePage({ selectedCourseId, onSelectProfessor }) {
  const [courses, setCourses] = useState([]);
  const [activeCourseId, setActiveCourseId] = useState(selectedCourseId || 'CS-301');
  const [courseDetails, setCourseDetails] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCourses()
      .then(res => {
        setCourses(res.courses || []);
        if (!selectedCourseId && res.courses?.length > 0) {
          setActiveCourseId(res.courses[0].id);
        }
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (activeCourseId) {
      api.getCourseById(activeCourseId)
        .then(res => setCourseDetails(res))
        .catch(console.error);
    }
  }, [activeCourseId]);

  const filteredCourses = courses.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <BookOpen className="w-7 h-7 text-emerald-500" />
          Course Directory & Faculty Comparison
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Compare all professors teaching a specific course, access official syllabi, and download study notes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Course List Navigation */}
        <div className="space-y-4 md:col-span-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search course code or title..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm max-h-[600px] overflow-y-auto space-y-1">
            {filteredCourses.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCourseId(c.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeCourseId === c.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    {c.code}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {c.professors?.length || 0} profs
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
                  {c.name}
                </h4>
                <p className="text-[10px] text-slate-400">{c.department}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Course Details & Professor Side-by-Side View */}
        <div className="md:col-span-2 space-y-6">
          {courseDetails?.course ? (
            <div className="space-y-6">
              {/* Course Header */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                    {courseDetails.course.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {courseDetails.course.department}
                  </span>
                </div>

                <h2 className="font-heading font-black text-2xl text-slate-900 dark:text-slate-100">
                  {courseDetails.course.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {courseDetails.course.description}
                </p>

                {/* Academic Resources: Syllabus + Notes Links */}
                <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {courseDetails.course.syllabus_url && (
                    <a
                      href={courseDetails.course.syllabus_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Download Official Syllabus (PDF)</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                    </a>
                  )}
                  {courseDetails.course.notes_url && (
                    <a
                      href={courseDetails.course.notes_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      <span>Course Study Guide & Notes</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Faculty Comparison Teaching this course */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100">
                    Faculty Teaching {courseDetails.course.code}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {courseDetails.professors?.length || 0} professors
                  </span>
                </div>

                {(!courseDetails.professors || courseDetails.professors.length === 0) ? (
                  <p className="text-xs text-slate-400">No professors currently assigned to this course.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courseDetails.professors.map(prof => (
                      <div
                        key={prof.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={prof.avatar_url}
                              alt={prof.name}
                              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                            />
                            <div>
                              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                {prof.name}
                              </h4>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                {prof.department}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                              {Number(prof.overall_rating).toFixed(1)}
                            </div>
                            <span className="text-[10px] text-slate-400">Overall</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Difficulty</span>
                            <span className="font-bold text-amber-500">{prof.difficulty_avg}/5</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Would Take Again</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{prof.would_take_again_pct}%</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectProfessor(prof.id)}
                          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-1"
                        >
                          <span>View Teaching Style</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-sm text-slate-400">Select a course to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
}
