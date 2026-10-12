import React, { useState } from 'react';
import { Play, Plus, Video as VideoIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function VideoLectureSection({ professorId, professorName, videos = [], onVideoSubmitted }) {
  const { user, openAuth } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    youtube_url: '',
    lecture_topic: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      openAuth('login');
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const res = await api.submitVideo({
        professor_id: professorId,
        ...formData
      });
      setMessage(res.message);
      setFormData({ title: '', youtube_url: '', lecture_topic: '', description: '' });
      setTimeout(() => {
        setModalOpen(false);
        setMessage(null);
        if (onVideoSubmitted) onVideoSubmitted();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit lecture video.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-emerald-500" />
            Classroom Lecture Demos & Clips
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Preview {professorName}'s actual teaching pace, chalkboard style, and presentation delivery.
          </p>
        </div>
        <button
          onClick={() => {
            if (!user) openAuth('login');
            else setModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Submit Demo Clip
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
          <Play className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            No lecture demo clips approved yet.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Have a recording or public lecture link? Submit it to help prospective students!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
            >
              <div className="relative aspect-video w-full bg-slate-900">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${vid.youtube_video_id}`}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-3">
                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-1">
                  {vid.topic || 'Demo Lecture'}
                </span>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {vid.title}
                </h4>
                {vid.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {vid.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              Submit Lecture Video / Demo Link
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              All submissions are moderated before going live to ensure academic relevance and quality.
            </p>

            {message && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Lecture Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Systems & Raft Algorithm"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  YouTube URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.youtube_url}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Lecture Topic / Chapter
                </label>
                <input
                  type="text"
                  placeholder="e.g. Memory Management, Proof Techniques"
                  value={formData.lecture_topic}
                  onChange={(e) => setFormData({ ...formData, lecture_topic: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brief Context / Timestamps
                </label>
                <textarea
                  rows={2}
                  placeholder="Timestamp where teacher starts deriving equations or explaining concepts..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit for Moderation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
