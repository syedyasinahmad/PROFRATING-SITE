// Seed data with 10 sample professors, courses, reviews, videos, and tags
export const seedProfessors = [
  {
    id: "prof-1",
    name: "Dr. Alexander Wright",
    department: "Computer Science",
    title: "Professor of Computer Systems",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    bio: "Ph.D. from MIT. Focuses on Distributed Systems, Cloud Architecture, and Operating Systems. 15+ years in academia and research.",
    overall_rating: 4.8,
    difficulty_avg: 4.2,
    would_take_again_pct: 94,
    total_reviews: 28,
    ai_sentiment_summary: "Universally praised for exceptional clarity in distributed systems and real-world system architecture, though exams and concurrency labs are notoriously challenging.",
    teaching_style_distribution: {
      "Practical-oriented": 92,
      "Project-based": 88,
      "Board-work": 75,
      "Fast-paced": 68,
      "Theory-heavy": 60,
      "Beginner-friendly": 40,
      "Slides-based": 30,
      "Discussion-driven": 45
    },
    semester_history: [
      { semester: "Fall 2022", rating: 4.6, difficulty: 4.3, reviews_count: 5 },
      { semester: "Spring 2023", rating: 4.7, difficulty: 4.1, reviews_count: 7 },
      { semester: "Fall 2023", rating: 4.7, difficulty: 4.4, reviews_count: 6 },
      { semester: "Spring 2024", rating: 4.9, difficulty: 4.2, reviews_count: 8 },
      { semester: "Fall 2024", rating: 4.8, difficulty: 4.2, reviews_count: 9 }
    ],
    courses: ["CS-301", "CS-415"],
    videos: [
      {
        id: "vid-1",
        title: "Distributed Systems & Raft Consensus Algorithm",
        youtube_video_id: "6bptJ44aK7E",
        youtube_url: "https://www.youtube.com/watch?v=6bptJ44aK7E",
        topic: "Distributed Consensus",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-2",
    name: "Dr. Elena Rostova",
    department: "Mathematics",
    title: "Associate Professor of Pure Mathematics",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Fields Medallist contributor. Specializes in Abstract Algebra, Topology, and Proof Methods. Passionate about visual intuition.",
    overall_rating: 4.6,
    difficulty_avg: 4.5,
    would_take_again_pct: 88,
    total_reviews: 22,
    ai_sentiment_summary: "Renowned for masterclass chalkboard derivations and deep theoretical rigor; students love her office hours and proof breakdowns.",
    teaching_style_distribution: {
      "Board-work": 98,
      "Theory-heavy": 95,
      "Discussion-driven": 70,
      "Practical-oriented": 25,
      "Beginner-friendly": 55,
      "Slides-based": 10,
      "Project-based": 20,
      "Fast-paced": 72
    },
    semester_history: [
      { semester: "Fall 2022", rating: 4.3, difficulty: 4.6, reviews_count: 4 },
      { semester: "Spring 2023", rating: 4.4, difficulty: 4.5, reviews_count: 5 },
      { semester: "Fall 2023", rating: 4.6, difficulty: 4.4, reviews_count: 6 },
      { semester: "Spring 2024", rating: 4.7, difficulty: 4.5, reviews_count: 7 },
      { semester: "Fall 2024", rating: 4.6, difficulty: 4.5, reviews_count: 6 }
    ],
    courses: ["MATH-210", "MATH-350"],
    videos: [
      {
        id: "vid-2",
        title: "Essence of Linear Algebra & Eigenvectors Intuition",
        youtube_video_id: "PFDu9oVAE-g",
        youtube_url: "https://www.youtube.com/watch?v=PFDu9oVAE-g",
        topic: "Linear Transformations",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-3",
    name: "Dr. Marcus Chen",
    department: "Computer Science",
    title: "Assistant Professor of Artificial Intelligence",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    bio: "Former Google DeepMind AI Researcher. Teaches Machine Learning, Deep Neural Architectures, and Applied Computer Vision.",
    overall_rating: 4.9,
    difficulty_avg: 3.8,
    would_take_again_pct: 96,
    total_reviews: 35,
    ai_sentiment_summary: "Extremely popular for engaging, practical Jupyter notebook walkthroughs and dynamic startup-style capstone projects.",
    teaching_style_distribution: {
      "Practical-oriented": 96,
      "Project-based": 95,
      "Slides-based": 80,
      "Beginner-friendly": 85,
      "Discussion-driven": 65,
      "Board-work": 40,
      "Fast-paced": 60,
      "Theory-heavy": 50
    },
    semester_history: [
      { semester: "Fall 2022", rating: 4.8, difficulty: 3.7, reviews_count: 6 },
      { semester: "Spring 2023", rating: 4.9, difficulty: 3.8, reviews_count: 8 },
      { semester: "Fall 2023", rating: 4.8, difficulty: 3.9, reviews_count: 9 },
      { semester: "Spring 2024", rating: 4.9, difficulty: 3.8, reviews_count: 10 },
      { semester: "Fall 2024", rating: 4.9, difficulty: 3.8, reviews_count: 12 }
    ],
    courses: ["CS-420", "CS-201"],
    videos: [
      {
        id: "vid-3",
        title: "Neural Networks: Backpropagation from Scratch",
        youtube_video_id: "aircAruvnKk",
        youtube_url: "https://www.youtube.com/watch?v=aircAruvnKk",
        topic: "Deep Learning Foundations",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-4",
    name: "Dr. Sarah Jenkins",
    department: "Physics",
    title: "Professor of Quantum Mechanics",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    bio: "Experimental physicist researching superconducting qubits. Recipient of University Distinguished Teaching Honor.",
    overall_rating: 4.5,
    difficulty_avg: 4.7,
    would_take_again_pct: 82,
    total_reviews: 19,
    ai_sentiment_summary: "High difficulty with heavy mathematical problem sets, balanced by unmatched office-hour dedication and physical demonstrations.",
    teaching_style_distribution: {
      "Theory-heavy": 95,
      "Board-work": 90,
      "Practical-oriented": 60,
      "Fast-paced": 85,
      "Discussion-driven": 50,
      "Slides-based": 30,
      "Beginner-friendly": 35,
      "Project-based": 40
    },
    semester_history: [
      { semester: "Spring 2023", rating: 4.2, difficulty: 4.8, reviews_count: 4 },
      { semester: "Fall 2023", rating: 4.4, difficulty: 4.7, reviews_count: 5 },
      { semester: "Spring 2024", rating: 4.6, difficulty: 4.6, reviews_count: 6 },
      { semester: "Fall 2024", rating: 4.5, difficulty: 4.7, reviews_count: 7 }
    ],
    courses: ["PHYS-201", "PHYS-330"],
    videos: [
      {
        id: "vid-4",
        title: "Quantum Wavepackets & Double Slit Experiment",
        youtube_video_id: "lZ3bPUKo5zc",
        youtube_url: "https://www.youtube.com/watch?v=lZ3bPUKo5zc",
        topic: "Wave-Particle Duality",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-5",
    name: "Dr. David Sterling",
    department: "Economics",
    title: "Professor of Macroeconomics & Financial Markets",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    bio: "Former Federal Reserve economic adviser. Bridges macroeconomic models with current global market shifts.",
    overall_rating: 4.3,
    difficulty_avg: 3.4,
    would_take_again_pct: 86,
    total_reviews: 24,
    ai_sentiment_summary: "Engaging case studies and lively classroom debate on fiscal policy; slide-heavy but consistently fair grading curve.",
    teaching_style_distribution: {
      "Discussion-driven": 92,
      "Slides-based": 85,
      "Practical-oriented": 78,
      "Beginner-friendly": 75,
      "Theory-heavy": 55,
      "Project-based": 60,
      "Fast-paced": 45,
      "Board-work": 35
    },
    semester_history: [
      { semester: "Fall 2022", rating: 4.1, difficulty: 3.5, reviews_count: 4 },
      { semester: "Spring 2023", rating: 4.2, difficulty: 3.4, reviews_count: 6 },
      { semester: "Fall 2023", rating: 4.4, difficulty: 3.3, reviews_count: 7 },
      { semester: "Spring 2024", rating: 4.3, difficulty: 3.4, reviews_count: 8 },
      { semester: "Fall 2024", rating: 4.4, difficulty: 3.4, reviews_count: 9 }
    ],
    courses: ["ECON-101", "ECON-310"],
    videos: [
      {
        id: "vid-5",
        title: "Inflation, Interest Rates and Central Banking Explained",
        youtube_video_id: "PHe0bXAIuk8",
        youtube_url: "https://www.youtube.com/watch?v=PHe0bXAIuk8",
        topic: "Monetary Policy",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-6",
    name: "Dr. Maya Patel",
    department: "Biology",
    title: "Associate Professor of Molecular Genetics",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    bio: "NIH Grantee investigating CRISPR genome engineering. Directs the Undergraduate Cell Biology Wet Lab.",
    overall_rating: 4.7,
    difficulty_avg: 3.9,
    would_take_again_pct: 91,
    total_reviews: 26,
    ai_sentiment_summary: "Hands-on lab experiences and clear visual slides; highly approachable during office hours with generous extra credit quizzes.",
    teaching_style_distribution: {
      "Practical-oriented": 94,
      "Beginner-friendly": 88,
      "Slides-based": 85,
      "Project-based": 76,
      "Discussion-driven": 60,
      "Theory-heavy": 65,
      "Board-work": 40,
      "Fast-paced": 50
    },
    semester_history: [
      { semester: "Fall 2022", rating: 4.5, difficulty: 4.0, reviews_count: 5 },
      { semester: "Spring 2023", rating: 4.6, difficulty: 3.9, reviews_count: 7 },
      { semester: "Fall 2023", rating: 4.7, difficulty: 3.8, reviews_count: 8 },
      { semester: "Spring 2024", rating: 4.8, difficulty: 3.9, reviews_count: 9 },
      { semester: "Fall 2024", rating: 4.7, difficulty: 3.9, reviews_count: 10 }
    ],
    courses: ["BIO-110", "BIO-340"],
    videos: [
      {
        id: "vid-6",
        title: "CRISPR-Cas9 Mechanism & Gene Editing Walkthrough",
        youtube_video_id: "4YKFw2KZA5o",
        youtube_url: "https://www.youtube.com/watch?v=4YKFw2KZA5o",
        topic: "Gene Editing Protocols",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-7",
    name: "Dr. Julian Vance",
    department: "Psychology",
    title: "Senior Lecturer in Cognitive Neuroscience",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    bio: "Author of 'Memory and Illusion'. Focuses on sensory perception, fMRI studies, and human decision-making heuristics.",
    overall_rating: 4.4,
    difficulty_avg: 2.9,
    would_take_again_pct: 92,
    total_reviews: 31,
    ai_sentiment_summary: "Entertaining lectures packed with behavioral experiments and real-life illusions; tests are straightforward if you review lecture slides.",
    teaching_style_distribution: {
      "Discussion-driven": 90,
      "Beginner-friendly": 95,
      "Slides-based": 82,
      "Practical-oriented": 70,
      "Project-based": 55,
      "Theory-heavy": 45,
      "Fast-paced": 40,
      "Board-work": 20
    },
    semester_history: [
      { semester: "Fall 2022", rating: 4.3, difficulty: 3.0, reviews_count: 6 },
      { semester: "Spring 2023", rating: 4.4, difficulty: 2.9, reviews_count: 8 },
      { semester: "Fall 2023", rating: 4.5, difficulty: 2.8, reviews_count: 7 },
      { semester: "Spring 2024", rating: 4.4, difficulty: 3.0, reviews_count: 10 },
      { semester: "Fall 2024", rating: 4.4, difficulty: 2.9, reviews_count: 11 }
    ],
    courses: ["PSYC-101", "PSYC-240"],
    videos: [
      {
        id: "vid-7",
        title: "Cognitive Biases & Decision Making in Everyday Life",
        youtube_video_id: "Q26l62_iBvA",
        youtube_url: "https://www.youtube.com/watch?v=Q26l62_iBvA",
        topic: "Heuristics and Biases",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-8",
    name: "Dr. Clara Thorne",
    department: "English",
    title: "Associate Professor of Creative Writing & Literature",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    bio: "Novelist and literary critic. Encourages vibrant peer workshop discussions, voice development, and narrative technique.",
    overall_rating: 4.8,
    difficulty_avg: 3.1,
    would_take_again_pct: 95,
    total_reviews: 20,
    ai_sentiment_summary: "Nurturing workshop environment with thorough, personalized essay feedback; values creative risk-taking over rigid conformity.",
    teaching_style_distribution: {
      "Discussion-driven": 98,
      "Project-based": 90,
      "Beginner-friendly": 85,
      "Practical-oriented": 75,
      "Theory-heavy": 40,
      "Slides-based": 20,
      "Fast-paced": 35,
      "Board-work": 30
    },
    semester_history: [
      { semester: "Spring 2023", rating: 4.7, difficulty: 3.2, reviews_count: 4 },
      { semester: "Fall 2023", rating: 4.8, difficulty: 3.0, reviews_count: 6 },
      { semester: "Spring 2024", rating: 4.9, difficulty: 3.1, reviews_count: 8 },
      { semester: "Fall 2024", rating: 4.8, difficulty: 3.1, reviews_count: 7 }
    ],
    courses: ["ENG-102", "ENG-305"],
    videos: [
      {
        id: "vid-8",
        title: "The Craft of Narrative Tension in Modern Fiction",
        youtube_video_id: "HhXgG_Uu3Fk",
        youtube_url: "https://www.youtube.com/watch?v=HhXgG_Uu3Fk",
        topic: "Creative Writing Workshop",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-9",
    name: "Dr. Tariq Al-Mansoor",
    department: "Mechanical Engineering",
    title: "Professor of Thermodynamics & Robotics",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    bio: "Aerospace engineer and IEEE Senior Member. Leads the University Formula SAE and Autonomous Rover team.",
    overall_rating: 4.2,
    difficulty_avg: 4.6,
    would_take_again_pct: 78,
    total_reviews: 18,
    ai_sentiment_summary: "Demanding project timelines and heavy mathematical derivations, but invaluable for engineering portfolios and CAD prototyping.",
    teaching_style_distribution: {
      "Project-based": 95,
      "Practical-oriented": 90,
      "Theory-heavy": 85,
      "Fast-paced": 80,
      "Board-work": 70,
      "Slides-based": 40,
      "Discussion-driven": 35,
      "Beginner-friendly": 25
    },
    semester_history: [
      { semester: "Fall 2022", rating: 4.0, difficulty: 4.7, reviews_count: 3 },
      { semester: "Spring 2023", rating: 4.1, difficulty: 4.6, reviews_count: 5 },
      { semester: "Fall 2023", rating: 4.2, difficulty: 4.5, reviews_count: 5 },
      { semester: "Spring 2024", rating: 4.3, difficulty: 4.6, reviews_count: 7 },
      { semester: "Fall 2024", rating: 4.2, difficulty: 4.6, reviews_count: 6 }
    ],
    courses: ["ME-201", "ME-410"],
    videos: [
      {
        id: "vid-9",
        title: "Thermodynamics First Law & Closed System Energy Analysis",
        youtube_video_id: "8N1BxHg9k6U",
        youtube_url: "https://www.youtube.com/watch?v=8N1BxHg9k6U",
        topic: "Thermal Systems",
        status: "approved"
      }
    ]
  },
  {
    id: "prof-10",
    name: "Dr. Rachel Greenburg",
    department: "Chemistry",
    title: "Assistant Professor of Organic Synthesis",
    college_name: "Metropolitan University",
    avatar_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
    bio: "Ph.D. from Caltech. Specializes in organocatalysis, reaction mechanisms, and molecular modeling in drug discovery.",
    overall_rating: 4.7,
    difficulty_avg: 4.1,
    would_take_again_pct: 89,
    total_reviews: 21,
    ai_sentiment_summary: "Clear electron-pushing arrow derivations on whiteboard; breaks down intimidating organic chemistry mechanisms into intuitive patterns.",
    teaching_style_distribution: {
      "Board-work": 95,
      "Theory-heavy": 85,
      "Practical-oriented": 80,
      "Beginner-friendly": 65,
      "Fast-paced": 60,
      "Project-based": 40,
      "Slides-based": 35,
      "Discussion-driven": 40
    },
    semester_history: [
      { semester: "Spring 2023", rating: 4.5, difficulty: 4.2, reviews_count: 4 },
      { semester: "Fall 2023", rating: 4.6, difficulty: 4.1, reviews_count: 6 },
      { semester: "Spring 2024", rating: 4.8, difficulty: 4.0, reviews_count: 7 },
      { semester: "Fall 2024", rating: 4.7, difficulty: 4.1, reviews_count: 8 }
    ],
    courses: ["CHEM-221", "CHEM-340"],
    videos: [
      {
        id: "vid-10",
        title: "SN1 vs SN2 Reaction Mechanisms & Stereochemistry",
        youtube_video_id: "L7sO4e96oV0",
        youtube_url: "https://www.youtube.com/watch?v=L7sO4e96oV0",
        topic: "Organic Chemistry Mechanisms",
        status: "approved"
      }
    ]
  }
];

export const seedCourses = [
  {
    id: "CS-301",
    code: "CS301",
    name: "Operating Systems & Concurrency",
    department: "Computer Science",
    description: "Threads, scheduling, virtual memory, synchronization primitives, file systems, and distributed kernel modules.",
    syllabus_url: "https://example.edu/syllabi/CS301-Fall2024.pdf",
    notes_url: "https://example.edu/notes/CS301-SharedNotes.pdf"
  },
  {
    id: "CS-415",
    code: "CS415",
    name: "Distributed Systems & Cloud Computing",
    department: "Computer Science",
    description: "Consensus algorithms (Raft, Paxos), eventual consistency, microservices, and fault tolerance at scale.",
    syllabus_url: "https://example.edu/syllabi/CS415.pdf",
    notes_url: "https://example.edu/notes/CS415-StudyGuide.pdf"
  },
  {
    id: "CS-420",
    code: "CS420",
    name: "Applied Machine Learning & Deep Learning",
    department: "Computer Science",
    description: "Supervised & unsupervised learning, CNNs, Transformers, optimization techniques, and PyTorch deployment.",
    syllabus_url: "https://example.edu/syllabi/CS420.pdf",
    notes_url: "https://example.edu/notes/CS420-Notes.pdf"
  },
  {
    id: "CS-201",
    code: "CS201",
    name: "Data Structures and Algorithm Analysis",
    department: "Computer Science",
    description: "Trees, graphs, dynamic programming, asymptotic runtime complexity, and heap implementations.",
    syllabus_url: "https://example.edu/syllabi/CS201.pdf",
    notes_url: "https://example.edu/notes/CS201-Cheatsheet.pdf"
  },
  {
    id: "MATH-210",
    code: "MATH210",
    name: "Linear Algebra & Matrix Theory",
    department: "Mathematics",
    description: "Vector spaces, linear maps, eigenvalues, spectral theorem, and singular value decomposition.",
    syllabus_url: "https://example.edu/syllabi/MATH210.pdf",
    notes_url: "https://example.edu/notes/MATH210-Proofs.pdf"
  },
  {
    id: "MATH-350",
    code: "MATH350",
    name: "Abstract Algebra & Group Theory",
    department: "Mathematics",
    description: "Groups, rings, fields, homomorphisms, Sylow theorems, and Galois theory foundations.",
    syllabus_url: "https://example.edu/syllabi/MATH350.pdf",
    notes_url: "https://example.edu/notes/MATH350-Notes.pdf"
  },
  {
    id: "PHYS-201",
    code: "PHYS201",
    name: "University Physics II: Electromagnetism & Optics",
    department: "Physics",
    description: "Maxwell's equations, electrostatic potential, electromagnetic waves, and interference.",
    syllabus_url: "https://example.edu/syllabi/PHYS201.pdf",
    notes_url: "https://example.edu/notes/PHYS201-Formulas.pdf"
  },
  {
    id: "ECON-101",
    code: "ECON101",
    name: "Principles of Macroeconomics",
    department: "Economics",
    description: "GDP, inflation, unemployment, aggregate supply and demand, and Federal Reserve policies.",
    syllabus_url: "https://example.edu/syllabi/ECON101.pdf",
    notes_url: "https://example.edu/notes/ECON101-Review.pdf"
  },
  {
    id: "BIO-110",
    code: "BIO110",
    name: "Cellular & Molecular Biology with Laboratory",
    department: "Biology",
    description: "Cell structure, metabolic pathways, DNA replication, gene regulation, and CRISPR methodologies.",
    syllabus_url: "https://example.edu/syllabi/BIO110.pdf",
    notes_url: "https://example.edu/notes/BIO110-LabManual.pdf"
  },
  {
    id: "PSYC-101",
    code: "PSYC101",
    name: "Introduction to Cognitive Psychology",
    department: "Psychology",
    description: "Perception, memory retention, neural basis of behavior, cognition, and behavioral heuristics.",
    syllabus_url: "https://example.edu/syllabi/PSYC101.pdf",
    notes_url: "https://example.edu/notes/PSYC101-Summary.pdf"
  },
  {
    id: "ENG-102",
    code: "ENG102",
    name: "Academic Composition & Rhetoric",
    department: "English",
    description: "Critical inquiry, persuasive argumentation, stylistic nuance, and research thesis synthesis.",
    syllabus_url: "https://example.edu/syllabi/ENG102.pdf",
    notes_url: "https://example.edu/notes/ENG102-Rubric.pdf"
  },
  {
    id: "CHEM-221",
    code: "CHEM221",
    name: "Organic Chemistry I",
    department: "Chemistry",
    description: "Structure, bonding, stereochemistry, and reaction mechanisms of functional groups.",
    syllabus_url: "https://example.edu/syllabi/CHEM221.pdf",
    notes_url: "https://example.edu/notes/CHEM221-Reactions.pdf"
  }
];

export const seedReviews = [
  {
    id: "rev-1",
    professor_id: "prof-1",
    user_id: "user-student-1",
    student_name: "Anonymous Cadet",
    course_id: "CS-301",
    course_name: "CS301: Operating Systems",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: true,
    would_take_again: true,
    grade_received: "A",
    review_text: "Dr. Wright's Operating Systems class is easily one of the best courses at this university. The labs where we implemented virtual memory and our own scheduler were demanding, but his explanations made complex kernel concepts crystal clear.",
    ratings: {
      overall: 5.0,
      teaching_clarity: 5.0,
      grading_fairness: 4.5,
      helpfulness: 5.0,
      difficulty: 4.5,
      attendance_strictness: 3.5
    },
    teaching_style_tags: ["Practical-oriented", "Project-based", "Board-work"],
    helpful_upvotes: 19,
    helpful_downvotes: 1,
    status: "approved",
    created_at: "2024-12-15T10:00:00Z"
  },
  {
    id: "rev-2",
    professor_id: "prof-1",
    user_id: "user-student-2",
    student_name: "Devon Reed",
    course_id: "CS-415",
    course_name: "CS415: Distributed Systems",
    semester: "Spring 2024",
    year: 2024,
    is_anonymous: false,
    would_take_again: true,
    grade_received: "A-",
    review_text: "Be prepared to spend 20+ hours on the Raft implementation lab, but Dr. Wright will sit with you in office hours until your leader election passes all tests. Top tier educator.",
    ratings: {
      overall: 4.8,
      teaching_clarity: 4.8,
      grading_fairness: 4.6,
      helpfulness: 5.0,
      difficulty: 4.8,
      attendance_strictness: 3.0
    },
    teaching_style_tags: ["Project-based", "Practical-oriented", "Fast-paced"],
    helpful_upvotes: 14,
    helpful_downvotes: 0,
    status: "approved",
    created_at: "2024-05-20T14:30:00Z"
  },
  {
    id: "rev-3",
    professor_id: "prof-2",
    user_id: "user-student-3",
    student_name: "Anonymous Mathematician",
    course_id: "MATH-210",
    course_name: "MATH210: Linear Algebra",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: true,
    would_take_again: true,
    grade_received: "B+",
    review_text: "Dr. Rostova uses zero slides and only chalkboards. Her proofs are pure poetry. If you write down everything she derives and attend recitation, you'll actually understand what linear mappings mean geometrically.",
    ratings: {
      overall: 4.7,
      teaching_clarity: 4.9,
      grading_fairness: 4.4,
      helpfulness: 4.8,
      difficulty: 4.4,
      attendance_strictness: 4.0
    },
    teaching_style_tags: ["Board-work", "Theory-heavy", "Beginner-friendly"],
    helpful_upvotes: 22,
    helpful_downvotes: 2,
    status: "approved",
    created_at: "2024-11-28T09:15:00Z"
  },
  {
    id: "rev-4",
    professor_id: "prof-3",
    user_id: "user-student-4",
    student_name: "Sarah L.",
    course_id: "CS-420",
    course_name: "CS420: Applied Machine Learning",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: false,
    would_take_again: true,
    grade_received: "A",
    review_text: "Marcus Chen is the gold standard for CS professors. His lecture slide decks look like Apple keynotes and his assignments let you build real diffusion models. Hands down the most useful class I took.",
    ratings: {
      overall: 5.0,
      teaching_clarity: 5.0,
      grading_fairness: 4.8,
      helpfulness: 4.9,
      difficulty: 3.7,
      attendance_strictness: 2.5
    },
    teaching_style_tags: ["Practical-oriented", "Project-based", "Slides-based", "Beginner-friendly"],
    helpful_upvotes: 31,
    helpful_downvotes: 1,
    status: "approved",
    created_at: "2024-12-10T16:45:00Z"
  },
  {
    id: "rev-5",
    professor_id: "prof-4",
    user_id: "user-student-5",
    student_name: "Anonymous Physicist",
    course_id: "PHYS-201",
    course_name: "PHYS201: University Physics II",
    semester: "Spring 2024",
    year: 2024,
    is_anonymous: true,
    would_take_again: true,
    grade_received: "B",
    review_text: "Extremely difficult exams that will push your calculus limits, but Dr. Jenkins gives generous partial credit and holds review sessions on weekends before midterms.",
    ratings: {
      overall: 4.5,
      teaching_clarity: 4.6,
      grading_fairness: 4.3,
      helpfulness: 4.9,
      difficulty: 4.8,
      attendance_strictness: 4.2
    },
    teaching_style_tags: ["Theory-heavy", "Board-work", "Fast-paced"],
    helpful_upvotes: 11,
    helpful_downvotes: 2,
    status: "approved",
    created_at: "2024-05-18T11:20:00Z"
  },
  {
    id: "rev-6",
    professor_id: "prof-5",
    user_id: "user-student-6",
    student_name: "Jordan Hayes",
    course_id: "ECON-101",
    course_name: "ECON101: Principles of Macroeconomics",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: false,
    would_take_again: true,
    grade_received: "A-",
    review_text: "Dr. Sterling connects every concept to what happened in Wall Street and the Fed this week. Tests are straight from the slide reviews. Great introductory professor.",
    ratings: {
      overall: 4.4,
      teaching_clarity: 4.5,
      grading_fairness: 4.6,
      helpfulness: 4.2,
      difficulty: 3.3,
      attendance_strictness: 3.0
    },
    teaching_style_tags: ["Discussion-driven", "Slides-based", "Practical-oriented"],
    helpful_upvotes: 8,
    helpful_downvotes: 0,
    status: "approved",
    created_at: "2024-12-05T13:10:00Z"
  },
  {
    id: "rev-7",
    professor_id: "prof-6",
    user_id: "user-student-7",
    student_name: "Anonymous Pre-Med",
    course_id: "BIO-110",
    course_name: "BIO110: Cellular & Molecular Biology",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: true,
    would_take_again: true,
    grade_received: "A",
    review_text: "Pre-med lifesaver! Dr. Patel makes cell biology intuitive. She records every lecture and her review slides highlight exact exam questions. Highly recommend taking her section.",
    ratings: {
      overall: 4.8,
      teaching_clarity: 4.9,
      grading_fairness: 4.7,
      helpfulness: 4.9,
      difficulty: 3.8,
      attendance_strictness: 3.5
    },
    teaching_style_tags: ["Practical-oriented", "Beginner-friendly", "Slides-based"],
    helpful_upvotes: 17,
    helpful_downvotes: 1,
    status: "approved",
    created_at: "2024-12-12T19:00:00Z"
  },
  {
    id: "rev-8",
    professor_id: "prof-7",
    user_id: "user-student-8",
    student_name: "Anonymous Explorer",
    course_id: "PSYC-101",
    course_name: "PSYC101: Intro to Cognitive Psychology",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: true,
    would_take_again: true,
    grade_received: "A",
    review_text: "Professor Vance is funny and captivating. Demonstrates optical and memory illusions live in class. Attendance is optional since slides are uploaded, but you'll want to go anyway.",
    ratings: {
      overall: 4.6,
      teaching_clarity: 4.7,
      grading_fairness: 4.8,
      helpfulness: 4.3,
      difficulty: 2.8,
      attendance_strictness: 2.0
    },
    teaching_style_tags: ["Discussion-driven", "Beginner-friendly", "Slides-based"],
    helpful_upvotes: 15,
    helpful_downvotes: 0,
    status: "approved",
    created_at: "2024-11-20T10:40:00Z"
  },
  {
    id: "rev-9",
    professor_id: "prof-8",
    user_id: "user-student-9",
    student_name: "Maya Lin",
    course_id: "ENG-102",
    course_name: "ENG102: Academic Composition",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: false,
    would_take_again: true,
    grade_received: "A",
    review_text: "Dr. Thorne made me fall in love with creative writing again. Her comments on essay drafts are so thoughtful and constructive. She genuinely cares about your voice.",
    ratings: {
      overall: 4.9,
      teaching_clarity: 4.9,
      grading_fairness: 4.8,
      helpfulness: 5.0,
      difficulty: 3.1,
      attendance_strictness: 3.8
    },
    teaching_style_tags: ["Discussion-driven", "Project-based", "Beginner-friendly"],
    helpful_upvotes: 12,
    helpful_downvotes: 0,
    status: "approved",
    created_at: "2024-12-08T15:20:00Z"
  },
  {
    id: "rev-10",
    professor_id: "prof-10",
    user_id: "user-student-10",
    student_name: "Anonymous Chemist",
    course_id: "CHEM-221",
    course_name: "CHEM221: Organic Chemistry I",
    semester: "Fall 2024",
    year: 2024,
    is_anonymous: true,
    would_take_again: true,
    grade_received: "B+",
    review_text: "Organic chem is known as a weed-out, but Dr. Greenburg turns it into a logic puzzle. Chalkboard mechanism breakdowns are legendary. Practice her problem sets twice and you will ace it.",
    ratings: {
      overall: 4.7,
      teaching_clarity: 4.9,
      grading_fairness: 4.5,
      helpfulness: 4.8,
      difficulty: 4.2,
      attendance_strictness: 3.8
    },
    teaching_style_tags: ["Board-work", "Theory-heavy", "Practical-oriented"],
    helpful_upvotes: 20,
    helpful_downvotes: 1,
    status: "approved",
    created_at: "2024-12-14T17:15:00Z"
  }
];

export const seedUsers = [
  {
    id: "user-student-1",
    name: "Alex Rivera",
    email: "arivera@college.edu",
    password_hash: "$2a$10$wT0lGqE7f7e9QJ6tL68q9e0OQp8tB5X6UvSjL4rZ8w2VlQjF4kK6G", // password: password123
    role: "student",
    is_verified: true,
    college_domain: "college.edu",
    followed_professors: ["prof-1", "prof-3"]
  },
  {
    id: "user-admin-1",
    name: "Campus Moderator",
    email: "moderator@college.edu",
    password_hash: "$2a$10$wT0lGqE7f7e9QJ6tL68q9e0OQp8tB5X6UvSjL4rZ8w2VlQjF4kK6G", // password: password123
    role: "admin",
    is_verified: true,
    college_domain: "college.edu",
    followed_professors: []
  }
];
