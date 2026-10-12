import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Video,
  Flag,
  FileText,
  AlertTriangle,
  Play
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [queue, setQueue] = useState({
    pending_reviews: [],
    pending_videos: [],
    pending_reports: [],
    stats: {}
  });
  const [activeTab, setActiveTab] = useState('reports'); // 'reports', 'videos', 'reviews'
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState(null);

  const fetchQueue = () => {
    setLoading(true);
    api.getModerationQueue()
      .then(res => {
        setQueue(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleModerateReport = async (reportId, action) => {
    try {
      await api.moderateReport(reportId, action);
      setActionMsg(`Report marked as ${action}d.`);
      setTimeout(() => setActionMsg(null), 2500);
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModerateReview = async (reviewId, action) => {
    try {
      await api.moderateReview(reviewId, action);
      setActionMsg(`Review ${action}d successfully.`);
      setTimeout(() => setActionMsg(null), 2500);
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModerateVideo = async (videoId, action) => {
    try {
      await api.moderateVideo(videoId, action);
      setActionMsg(`Lecture clip ${action}d.`);
      setTimeout(() => setActionMsg(null), 2500);
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-sm text-slate-400">Loading moderation queue...</div>;
  }

  const reports = queue.pending_reports || [];
  const videos = queue.pending_videos || [];
  const reviews = queue.pending_reviews || [];
  const stats = queue.stats || {};

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-2xl text-slate-900 dark:text-slate-100">
                Moderation Command Center
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review flagged student submissions, abusive reports, and user-submitted YouTube demo lectures.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-xs">
            <span className="text-[10px] text-slate-400 block font-medium">Pending Flags</span>
            <span className="font-black text-rose-600 dark:text-rose-400 text-base">{reports.length}</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-xs">
            <span className="text-[10px] text-slate-400 block font-medium">Video Submissions</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">{videos.length}</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-xs">
            <span className="text-[10px] text-slate-400 block font-medium">Total Reviews</span>
            <span className="font-black text-slate-800 dark:text-slate-200 text-base">{stats.total_reviews || 0}</span>
          </div>
        </div>
      </div>

      {actionMsg && (
        <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 text-purple-800 dark:text-purple-200 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Flagged Content ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'videos'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Lecture Clips ({videos.length})</span>
        </button>
      </div>

      {/* Tab 1: Reported / Flagged Content */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-xs text-slate-400">
              Moderation queue is clean. Zero reported reviews pending inspection.
            </div>
          ) : (
            reports.map(rep => (
              <div
                key={rep.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      Reported: {rep.reason.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Target Professor: <strong className="text-slate-700 dark:text-slate-200">{rep.professor?.name || 'Faculty Member'}</strong>
                    </p>
                    {rep.details && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic mt-1">
                        Report Note: "{rep.details}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleModerateReport(rep.id, 'dismiss')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    >
                      Dismiss Report
                    </button>
                    {rep.review && (
                      <button
                        onClick={() => handleModerateReview(rep.review.id, 'delete')}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-500 shadow-sm"
                      >
                        Delete Review
                      </button>
                    )}
                  </div>
                </div>

                {/* Review Text Preview */}
                {rep.review && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-semibold block mb-1">Reported Review Content:</span>
                    <p className="italic leading-relaxed">"{rep.review.review_text}"</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Submitted Videos Moderation */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          {videos.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-xs text-slate-400">
              No lecture video submissions pending approval.
            </div>
          ) : (
            videos.map(vid => (
              <div
                key={vid.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6"
              >
                <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${vid.youtube_video_id}`}
                    title={vid.title}
                  />
                </div>

                <div className="space-y-1.5 flex-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {vid.topic || 'Lecture'}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Professor: <strong>{vid.professor_name || vid.professor_id}</strong> • Submitted by: {vid.submitter_email}
                  </p>
                  {vid.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">
                      {vid.description}
                    </p>
                  )}
                </div>

                <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => handleModerateVideo(vid.id, 'approve')}
                    className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleModerateVideo(vid.id, 'reject')}
                    className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
