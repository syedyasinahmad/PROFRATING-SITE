import { db } from '../config/db.js';

export const getCourses = (req, res) => {
  const { department, search } = req.query;
  let results = [...db.courses];

  if (department && department !== 'All') {
    results = results.filter(c => c.department.toLowerCase() === department.toLowerCase());
  }

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    results = results.filter(c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }

  // Populate professors teaching each course
  const coursesWithProfs = results.map(course => {
    const profs = db.professors.filter(p => (p.courses || []).includes(course.id));
    return {
      ...course,
      professors: profs.map(p => ({
        id: p.id,
        name: p.name,
        avatar_url: p.avatar_url,
        overall_rating: p.overall_rating,
        difficulty_avg: p.difficulty_avg,
        would_take_again_pct: p.would_take_again_pct
      }))
    };
  });

  return res.json({ courses: coursesWithProfs });
};

export const getCourseById = (req, res) => {
  const { id } = req.params;
  const course = db.courses.find(c => c.id.toLowerCase() === id.toLowerCase() || c.code.toLowerCase() === id.toLowerCase());

  if (!course) {
    return res.status(404).json({ error: 'Course not found.' });
  }

  // Find all professors teaching this course
  const professors = db.professors.filter(p => (p.courses || []).includes(course.id));

  // Find reviews specifically for this course
  const courseReviews = db.reviews.filter(r => r.course_id === course.id && r.status === 'approved');

  return res.json({
    course,
    professors,
    reviews: courseReviews
  });
};
