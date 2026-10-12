import { db, persistDB } from '../config/db.js';
import { generateSentimentSummary } from '../utils/sentimentAI.js';

// Search & multi-filter professors
export const getProfessors = (req, res) => {
  const {
    search,
    department,
    course,
    minRating,
    maxDifficulty,
    teachingStyle,
    sortBy = 'rating_desc'
  } = req.query;

  let results = [...db.professors];

  // Search by name or department or bio
  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q) ||
      (p.bio && p.bio.toLowerCase().includes(q))
    );
  }

  // Filter by department
  if (department && department !== 'All') {
    results = results.filter(p => p.department.toLowerCase() === department.toLowerCase());
  }

  // Filter by course
  if (course && course.trim() !== '') {
    const c = course.trim().toLowerCase();
    results = results.filter(p =>
      p.courses && p.courses.some(cId => {
        const found = db.courses.find(crs => crs.id.toLowerCase() === cId.toLowerCase() || crs.code.toLowerCase().includes(c));
        return !!found;
      })
    );
  }

  // Filter by minimum rating
  if (minRating) {
    results = results.filter(p => Number(p.overall_rating) >= Number(minRating));
  }

  // Filter by max difficulty
  if (maxDifficulty) {
    results = results.filter(p => Number(p.difficulty_avg) <= Number(maxDifficulty));
  }

  // Filter by teaching style tag
  if (teachingStyle && teachingStyle !== 'All') {
    results = results.filter(p => {
      if (!p.teaching_style_distribution) return false;
      const score = p.teaching_style_distribution[teachingStyle];
      return score && score >= 60;
    });
  }

  // Sorting
  if (sortBy === 'rating_desc') {
    results.sort((a, b) => b.overall_rating - a.overall_rating);
  } else if (sortBy === 'rating_asc') {
    results.sort((a, b) => a.overall_rating - b.overall_rating);
  } else if (sortBy === 'difficulty_asc') {
    results.sort((a, b) => a.difficulty_avg - b.difficulty_avg);
  } else if (sortBy === 'difficulty_desc') {
    results.sort((a, b) => b.difficulty_avg - a.difficulty_avg);
  } else if (sortBy === 'reviews_desc') {
    results.sort((a, b) => b.total_reviews - a.total_reviews);
  } else if (sortBy === 'name_asc') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Map courses metadata into each professor
  const populated = results.map(prof => {
    const profCourses = (prof.courses || []).map(cId => db.courses.find(c => c.id === cId)).filter(Boolean);
    return {
      ...prof,
      courses_data: profCourses
    };
  });

  return res.json({
    total: populated.length,
    professors: populated
  });
};

// Get single professor details with detailed reviews, ratings breakdown, charts, and videos
export const getProfessorById = (req, res) => {
  const { id } = req.params;
  const prof = db.professors.find(p => p.id === id);

  if (!prof) {
    return res.status(404).json({ error: 'Professor not found.' });
  }

  // Find all approved reviews
  const reviews = db.reviews.filter(r => r.professor_id === id && r.status === 'approved');

  // Compute live averages across 5 sub-categories
  let subRatingsAvg = {
    overall: prof.overall_rating,
    teaching_clarity: 4.6,
    grading_fairness: 4.4,
    helpfulness: 4.7,
    difficulty: prof.difficulty_avg,
    attendance_strictness: 3.5
  };

  if (reviews.length > 0) {
    let totals = { overall: 0, clarity: 0, fairness: 0, helpfulness: 0, difficulty: 0, attendance: 0 };
    reviews.forEach(r => {
      if (r.ratings) {
        totals.overall += Number(r.ratings.overall || 5);
        totals.clarity += Number(r.ratings.teaching_clarity || 5);
        totals.fairness += Number(r.ratings.grading_fairness || 5);
        totals.helpfulness += Number(r.ratings.helpfulness || 5);
        totals.difficulty += Number(r.ratings.difficulty || 3);
        totals.attendance += Number(r.ratings.attendance_strictness || 3);
      }
    });
    const len = reviews.length;
    subRatingsAvg = {
      overall: +(totals.overall / len).toFixed(1),
      teaching_clarity: +(totals.clarity / len).toFixed(1),
      grading_fairness: +(totals.fairness / len).toFixed(1),
      helpfulness: +(totals.helpfulness / len).toFixed(1),
      difficulty: +(totals.difficulty / len).toFixed(1),
      attendance_strictness: +(totals.attendance / len).toFixed(1)
    };
  }

  // Populate courses
  const profCourses = (prof.courses || []).map(cId => db.courses.find(c => c.id === cId)).filter(Boolean);

  // Populate approved videos
  const videos = db.videos.filter(v => v.professor_id === id && v.status === 'approved');

  // Generate dynamic 2-line AI sentiment summary if not present
  const sentimentSummary = prof.ai_sentiment_summary || generateSentimentSummary(prof.name, reviews, subRatingsAvg);

  return res.json({
    professor: {
      ...prof,
      sub_ratings_avg: subRatingsAvg,
      ai_sentiment_summary: sentimentSummary,
      courses_data: profCourses,
      videos: videos
    },
    reviews: reviews
  });
};

// Compare 2 or 3 professors side-by-side
export const compareProfessors = (req, res) => {
  const { ids } = req.query;
  if (!ids) {
    return res.status(400).json({ error: 'Please specify comma-separated professor IDs, e.g. ?ids=prof-1,prof-2' });
  }

  const idList = ids.split(',').map(s => s.trim()).filter(Boolean);
  if (idList.length < 2 || idList.length > 4) {
    return res.status(400).json({ error: 'Comparison supports between 2 and 4 professors.' });
  }

  const profs = idList.map(id => {
    const prof = db.professors.find(p => p.id === id);
    if (!prof) return null;
    const profReviews = db.reviews.filter(r => r.professor_id === id && r.status === 'approved');
    const courses = (prof.courses || []).map(cId => db.courses.find(c => c.id === cId)).filter(Boolean);
    return {
      ...prof,
      courses_data: courses,
      reviews_sample: profReviews.slice(0, 3)
    };
  }).filter(Boolean);

  return res.json({ professors: profs });
};

// Leaderboard: Top-rated, Trending, and Most-improved
export const getLeaderboards = (req, res) => {
  const all = [...db.professors];

  // Top rated (highest overall rating with high reviews)
  const topRated = [...all].sort((a, b) => b.overall_rating - a.overall_rating).slice(0, 5);

  // Trending (most total reviews + recent engagement)
  const trending = [...all].sort((a, b) => b.total_reviews - a.total_reviews).slice(0, 5);

  // Most improved (calculate rating jump over recent semesters)
  const mostImproved = [...all].sort((a, b) => {
    const aHist = a.semester_history || [];
    const bHist = b.semester_history || [];
    const aDiff = aHist.length >= 2 ? (aHist[aHist.length - 1].rating - aHist[0].rating) : 0;
    const bDiff = bHist.length >= 2 ? (bHist[bHist.length - 1].rating - bHist[0].rating) : 0;
    return bDiff - aDiff;
  }).slice(0, 5);

  return res.json({
    top_rated: topRated,
    trending: trending,
    most_improved: mostImproved
  });
};

// Toggle follow professor (for notifications)
export const toggleFollowProfessor = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const prof = db.professors.find(p => p.id === id);
  if (!prof) {
    return res.status(404).json({ error: 'Professor not found.' });
  }

  const user = db.users.find(u => u.id === userId);
  if (!user.followed_professors) {
    user.followed_professors = [];
  }

  const index = user.followed_professors.indexOf(id);
  let isFollowing = false;

  if (index >= 0) {
    user.followed_professors.splice(index, 1);
    db.follows = db.follows.filter(f => !(f.user_id === userId && f.professor_id === id));
    isFollowing = false;
  } else {
    user.followed_professors.push(id);
    db.follows.push({
      id: `fol-${Date.now()}`,
      user_id: userId,
      professor_id: id,
      notify_email: true,
      created_at: new Date().toISOString()
    });
    isFollowing = true;
  }

  persistDB();

  return res.json({
    message: isFollowing ? `You are now following ${prof.name}. You will be alerted when new reviews are posted.` : `Unfollowed ${prof.name}.`,
    is_following: isFollowing,
    followed_professors: user.followed_professors
  });
};
