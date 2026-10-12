import { db } from '../config/db.js';

export const getQuizQuestions = (req, res) => {
  const questions = [
    {
      id: "q1",
      title: "Lecture Delivery Preference",
      description: "How do you absorb complex lecture concepts most effectively?",
      options: [
        { label: "Step-by-step whiteboard / chalkboard derivations", styleTag: "Board-work" },
        { label: "Live hands-on coding, experiments, or lab demos", styleTag: "Practical-oriented" },
        { label: "Structured slide decks with recorded replays", styleTag: "Slides-based" },
        { label: "Interactive Socratic discussions & peer workshops", styleTag: "Discussion-driven" }
      ]
    },
    {
      id: "q2",
      title: "Assessment & Deliverables",
      description: "Which grading format best demonstrates your mastery?",
      options: [
        { label: "Real-world portfolio projects & software capstones", styleTag: "Project-based" },
        { label: "Theoretical problem sets & rigorous analytical proofs", styleTag: "Theory-heavy" },
        { label: "Low-stress quizzes & beginner-friendly milestones", styleTag: "Beginner-friendly" },
        { label: "Research papers, essays & case study analyses", styleTag: "Discussion-driven" }
      ]
    },
    {
      id: "q3",
      title: "Lecture Tempo & Pacing",
      description: "What speed of lecture delivery keeps you most engaged?",
      options: [
        { label: "Steady, thoroughly explained, beginner-friendly", styleTag: "Beginner-friendly" },
        { label: "Fast-paced, high information density, deep dive", styleTag: "Fast-paced" },
        { label: "Balanced with frequent pause-and-check Q&A", styleTag: "Discussion-driven" },
        { label: "Hands-on execution with minimal idle theory", styleTag: "Practical-oriented" }
      ]
    },
    {
      id: "q4",
      title: "Course Difficulty Target",
      description: "What level of academic challenge are you ready for this term?",
      options: [
        { label: "Balanced workload (focusing on GPA retention & clarity)", difficultyRange: [1, 3.5] },
        { label: "Deep challenge (willing to spend 15+ hrs/wk for mastery)", difficultyRange: [3.5, 5.0] }
      ]
    }
  ];

  return res.json({ questions });
};

export const matchQuizProfessors = (req, res) => {
  const { answers = {}, preferredDepartment } = req.body;
  // answers maps { q1: "Board-work", q2: "Project-based", q3: "Fast-paced", q4: [1, 3.5] }

  let candidates = [...db.professors];

  if (preferredDepartment && preferredDepartment !== 'All') {
    const deptMatches = candidates.filter(p => p.department.toLowerCase() === preferredDepartment.toLowerCase());
    if (deptMatches.length > 0) {
      candidates = deptMatches;
    }
  }

  // Calculate compatibility score (0 - 100)
  const scored = candidates.map(prof => {
    let score = 50; // Base score
    const styles = prof.teaching_style_distribution || {};

    // Question 1 style
    if (answers.q1 && styles[answers.q1]) {
      score += (styles[answers.q1] / 100) * 20;
    }

    // Question 2 style
    if (answers.q2 && styles[answers.q2]) {
      score += (styles[answers.q2] / 100) * 20;
    }

    // Question 3 tempo
    if (answers.q3 && styles[answers.q3]) {
      score += (styles[answers.q3] / 100) * 15;
    }

    // Question 4 difficulty tolerance
    if (answers.q4 && Array.isArray(answers.q4)) {
      const [minD, maxD] = answers.q4;
      if (prof.difficulty_avg >= minD && prof.difficulty_avg <= maxD) {
        score += 15;
      }
    }

    // Bonus for high overall rating
    score += (prof.overall_rating / 5.0) * 10;

    const finalPct = Math.min(99, Math.round(score));

    // Determine top 2 matched traits
    const matchedTraits = Object.entries(styles)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait]) => trait);

    return {
      professor: {
        id: prof.id,
        name: prof.name,
        department: prof.department,
        title: prof.title,
        avatar_url: prof.avatar_url,
        overall_rating: prof.overall_rating,
        difficulty_avg: prof.difficulty_avg,
        would_take_again_pct: prof.would_take_again_pct,
        ai_sentiment_summary: prof.ai_sentiment_summary
      },
      matchPercentage: finalPct,
      topTraits: matchedTraits
    };
  });

  scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return res.json({
    recommended: scored.slice(0, 3),
    allMatches: scored
  });
};
