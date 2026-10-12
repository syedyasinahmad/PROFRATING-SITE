import { db, persistDB } from '../config/db.js';
import { generateSentimentSummary } from '../utils/sentimentAI.js';

export const createReview = (req, res) => {
  try {
    const user = req.user;
    const {
      professor_id,
      course_id,
      semester,
      year,
      is_anonymous = true,
      would_take_again,
      grade_received,
      review_text,
      teaching_style_tags = [],
      ratings = {}
    } = req.body;

    if (!professor_id || !course_id || !semester || !year || !review_text) {
      return res.status(400).json({ error: 'All primary fields (professor, course, semester, year, review text) are required.' });
    }

    const prof = db.professors.find(p => p.id === professor_id);
    if (!prof) {
      return res.status(404).json({ error: 'Professor not found.' });
    }

    const course = db.courses.find(c => c.id === course_id || c.code === course_id);
    const courseName = course ? `${course.code}: ${course.name}` : course_id;

    // Default or sanitize ratings
    const overall = Number(ratings.overall || 5);
    const clarity = Number(ratings.teaching_clarity || 5);
    const fairness = Number(ratings.grading_fairness || 5);
    const helpfulness = Number(ratings.helpfulness || 5);
    const difficulty = Number(ratings.difficulty || 3);
    const attendance = Number(ratings.attendance_strictness || 3);

    const newReview = {
      id: `rev-${Date.now()}`,
      professor_id,
      user_id: user.id,
      student_name: is_anonymous ? 'Anonymous Student' : user.name,
      course_id: course ? course.id : course_id,
      course_name: courseName,
      semester: semester.trim(),
      year: Number(year),
      is_anonymous: Boolean(is_anonymous),
      would_take_again: Boolean(would_take_again),
      grade_received: grade_received ? grade_received.trim().toUpperCase() : null,
      review_text: review_text.trim(),
      ratings: {
        overall,
        teaching_clarity: clarity,
        grading_fairness: fairness,
        helpfulness,
        difficulty,
        attendance_strictness: attendance
      },
      teaching_style_tags: Array.isArray(teaching_style_tags) ? teaching_style_tags : [],
      helpful_upvotes: 0,
      helpful_downvotes: 0,
      status: 'approved', // Pre-approved unless reported or flagged
      created_at: new Date().toISOString()
    };

    db.reviews.unshift(newReview);

    // Recompute professor stats
    const profReviews = db.reviews.filter(r => r.professor_id === professor_id && r.status === 'approved');
    const totalReviews = profReviews.length;

    const avgOverall = +(profReviews.reduce((acc, r) => acc + (r.ratings?.overall || 5), 0) / totalReviews).toFixed(1);
    const avgDifficulty = +(profReviews.reduce((acc, r) => acc + (r.ratings?.difficulty || 3), 0) / totalReviews).toFixed(1);
    const wouldTakeCount = profReviews.filter(r => r.would_take_again).length;
    const wouldTakePct = Math.round((wouldTakeCount / totalReviews) * 100);

    prof.overall_rating = avgOverall;
    prof.difficulty_avg = avgDifficulty;
    prof.would_take_again_pct = wouldTakePct;
    prof.total_reviews = totalReviews;

    // Update teaching style distribution percentages
    if (!prof.teaching_style_distribution) {
      prof.teaching_style_distribution = {};
    }
    (newReview.teaching_style_tags || []).forEach(tag => {
      prof.teaching_style_distribution[tag] = Math.min(99, (prof.teaching_style_distribution[tag] || 50) + 5);
    });

    // Update semester history if appropriate
    const termKey = `${semester} ${year}`;
    let histItem = (prof.semester_history || []).find(h => h.semester === termKey);
    if (histItem) {
      histItem.rating = +( (histItem.rating + overall) / 2 ).toFixed(1);
      histItem.difficulty = +( (histItem.difficulty + difficulty) / 2 ).toFixed(1);
      histItem.reviews_count += 1;
    } else {
      if (!prof.semester_history) prof.semester_history = [];
      prof.semester_history.push({
        semester: termKey,
        rating: overall,
        difficulty: difficulty,
        reviews_count: 1
      });
    }

    // Refresh dynamic AI summary
    prof.ai_sentiment_summary = generateSentimentSummary(prof.name, profReviews, {
      overall: avgOverall,
      difficulty: avgDifficulty,
      teaching_clarity: clarity,
      grading_fairness: fairness
    });

    // Find followers to simulate notification dispatch
    const followers = db.follows.filter(f => f.professor_id === professor_id);
    const notificationSummary = {
      notified_followers_count: followers.length,
      professor_name: prof.name,
      message: `Alert triggered: ${followers.length} followed students notified via email of the new review for ${prof.name} in ${courseName}.`
    };

    persistDB();

    return res.status(201).json({
      message: 'Review posted successfully!',
      review: newReview,
      notification: notificationSummary
    });
  } catch (error) {
    console.error('Create review error:', error);
    return res.status(500).json({ error: 'Server error while submitting review.' });
  }
};

// Upvote / downvote helpful review
export const voteReview = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { vote_type } = req.body; // 'up' or 'down'

  if (!['up', 'down'].includes(vote_type)) {
    return res.status(400).json({ error: "Vote type must be 'up' or 'down'." });
  }

  const review = db.reviews.find(r => r.id === id);
  if (!review) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  const existingVote = db.votes.find(v => v.user_id === userId && v.review_id === id);

  if (existingVote) {
    if (existingVote.vote_type === vote_type) {
      // Toggle off
      if (vote_type === 'up') review.helpful_upvotes = Math.max(0, review.helpful_upvotes - 1);
      if (vote_type === 'down') review.helpful_downvotes = Math.max(0, review.helpful_downvotes - 1);
      db.votes = db.votes.filter(v => v.id !== existingVote.id);
    } else {
      // Swap vote
      if (vote_type === 'up') {
        review.helpful_upvotes += 1;
        review.helpful_downvotes = Math.max(0, review.helpful_downvotes - 1);
      } else {
        review.helpful_downvotes += 1;
        review.helpful_upvotes = Math.max(0, review.helpful_upvotes - 1);
      }
      existingVote.vote_type = vote_type;
    }
  } else {
    // New vote
    if (vote_type === 'up') review.helpful_upvotes += 1;
    if (vote_type === 'down') review.helpful_downvotes += 1;

    db.votes.push({
      id: `vote-${Date.now()}`,
      user_id: userId,
      review_id: id,
      vote_type,
      created_at: new Date().toISOString()
    });
  }

  persistDB();

  return res.json({
    message: 'Vote recorded.',
    helpful_upvotes: review.helpful_upvotes,
    helpful_downvotes: review.helpful_downvotes
  });
};

// Report review for abusive content or harassment
export const reportReview = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { reason, details } = req.body;

  const review = db.reviews.find(r => r.id === id);
  if (!review) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  const newReport = {
    id: `rep-${Date.now()}`,
    review_id: id,
    reported_by: userId,
    reason: reason || 'offensive_language',
    details: details || '',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  db.reports.push(newReport);
  review.status = 'flagged'; // Mark review as flagged for admin queue
  persistDB();

  return res.status(201).json({
    message: 'Review reported to campus moderators for review. Thank you for keeping the community safe.',
    report: newReport
  });
};
