import { db, persistDB } from '../config/db.js';

export const getModerationQueue = (req, res) => {
  const pendingReviews = db.reviews.filter(r => r.status === 'pending' || r.status === 'flagged');
  const pendingVideos = db.videos.filter(v => v.status === 'pending');
  const pendingReports = db.reports.filter(r => r.status === 'pending');

  // Augment reports with target review details
  const augmentedReports = pendingReports.map(rep => {
    const rev = db.reviews.find(r => r.id === rep.review_id);
    const prof = rev ? db.professors.find(p => p.id === rev.professor_id) : null;
    return {
      ...rep,
      review: rev || null,
      professor: prof ? { id: prof.id, name: prof.name } : null
    };
  });

  return res.json({
    pending_reviews: pendingReviews,
    pending_videos: pendingVideos,
    pending_reports: augmentedReports,
    stats: {
      total_professors: db.professors.length,
      total_reviews: db.reviews.length,
      total_videos: db.videos.length,
      flagged_count: pendingReports.length
    }
  });
};

export const moderateReview = (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'approve', 'reject', 'delete'

  const reviewIndex = db.reviews.findIndex(r => r.id === id);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  const review = db.reviews[reviewIndex];

  if (action === 'approve') {
    review.status = 'approved';
    // Resolve any linked reports
    db.reports.forEach(rep => {
      if (rep.review_id === id) rep.status = 'resolved';
    });
  } else if (action === 'reject' || action === 'delete') {
    review.status = 'rejected';
    // or remove from array
    db.reviews.splice(reviewIndex, 1);
    db.reports.forEach(rep => {
      if (rep.review_id === id) rep.status = 'resolved';
    });
  } else {
    return res.status(400).json({ error: "Invalid action. Use 'approve' or 'reject'." });
  }

  persistDB();

  return res.json({
    message: `Review has been ${action === 'approve' ? 'approved' : 'rejected / removed'}.`,
    review_id: id
  });
};

export const moderateVideo = (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'approve' or 'reject'

  const video = db.videos.find(v => v.id === id);
  if (!video) {
    return res.status(404).json({ error: 'Video not found.' });
  }

  if (action === 'approve') {
    video.status = 'approved';
    // Also add to professor's videos list
    const prof = db.professors.find(p => p.id === video.professor_id);
    if (prof) {
      if (!prof.videos) prof.videos = [];
      if (!prof.videos.some(v => v.id === video.id)) {
        prof.videos.push(video);
      }
    }
  } else if (action === 'reject') {
    video.status = 'rejected';
  } else {
    return res.status(400).json({ error: "Invalid action. Must be 'approve' or 'reject'." });
  }

  persistDB();

  return res.json({
    message: `Lecture video has been ${action}d.`,
    video
  });
};

export const moderateReport = (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'dismiss' or 'resolve'

  const report = db.reports.find(r => r.id === id);
  if (!report) {
    return res.status(404).json({ error: 'Report not found.' });
  }

  report.status = action === 'dismiss' ? 'dismissed' : 'resolved';
  persistDB();

  return res.json({
    message: `Report status updated to ${report.status}.`,
    report
  });
};
