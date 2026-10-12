import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedProfessors, seedCourses, seedReviews, seedUsers } from '../seed/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../data_store.json');

// Initialize database schema tables
let dbState = {
  users: [...seedUsers],
  professors: JSON.parse(JSON.stringify(seedProfessors)),
  courses: [...seedCourses],
  reviews: JSON.parse(JSON.stringify(seedReviews)),
  videos: [],
  votes: [],
  reports: [],
  follows: [
    { id: "fol-1", user_id: "user-student-1", professor_id: "prof-1", notify_email: true },
    { id: "fol-2", user_id: "user-student-1", professor_id: "prof-3", notify_email: true }
  ],
  teaching_style_tags: [
    "Theory-heavy",
    "Practical-oriented",
    "Slides-based",
    "Board-work",
    "Project-based",
    "Discussion-driven",
    "Fast-paced",
    "Beginner-friendly"
  ]
};

// Flatten videos from professors
seedProfessors.forEach(prof => {
  if (prof.videos && prof.videos.length > 0) {
    prof.videos.forEach(v => {
      dbState.videos.push({
        ...v,
        professor_id: prof.id,
        submitted_by: 'system'
      });
    });
  }
});

// Load from file if exists
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.professors && parsed.professors.length > 0) {
      dbState = { ...dbState, ...parsed };
    }
  }
} catch (e) {
  console.warn('Could not read existing data_store.json, using fresh seed data.', e.message);
}

// Helper to save state
export const persistDB = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dbState, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error persisting database:', e);
  }
};

export const db = dbState;
