# ProfPulse — Professor Rating Platform with Teaching-Style Insights

> A modern, responsive, mobile-first full-stack web application designed for college students to evaluate faculty beyond generic stars — featuring **teaching style breakdowns**, **semester-by-semester difficulty & rating trends**, **embedded classroom lecture demo clips**, **course syllabi & study notes hubs**, and an **AI Learning-Style Matcher Quiz**.

---

## 🌟 Key Features

### 1. Core Profile & Evaluation Metrics
- **Faculty Profiles**: High-resolution avatar, department, academic title, courses taught, overall rating (1-5 stars), difficulty index, and recommendation rate (`% would take again`).
- **5-Category Sub-Ratings**:
  1. *Teaching Clarity*
  2. *Marks & Grading Fairness*
  3. *Helpfulness & Approachability*
  4. *Difficulty Level*
  5. *Attendance Strictness*
- **Rich Written Reviews**: Semester and term selection (e.g. *Fall 2024*), course association, final grade received (`A`, `B+`, etc.), verified student badge, and anonymous shielding.

### 2. Teaching Style Insights & Historical Charts
- **Teaching Style Tags**: Badges capturing pedagogy: `"Theory-heavy"`, `"Practical-oriented"`, `"Slides-based"`, `"Board-work"`, `"Project-based"`, `"Discussion-driven"`, `"Fast-paced"`, and `"Beginner-friendly"`.
- **Semester History Line Chart (Recharts)**: Visual multi-year track of how a professor's rating and difficulty evolved from 2022 to 2025.
- **Pedagogy Distribution Radar/Bars**: Quantitative breakdown showing percentage distribution of teaching traits.

### 3. Classroom Lecture Demos (YouTube Integration)
- Embedded YouTube video lectures allowing prospective students to preview lecture pacing and whiteboard style.
- Student submission modal allowing students or faculty to submit YouTube lecture links for moderator approval.

### 4. Interactive Learning-Style Matcher Quiz ("Best For You")
- 4-question interactive questionnaire assessing lecture delivery preferences, assignment formats, pacing tolerance, and academic rigor.
- Compatibility scoring engine recommending the top 3 best-matched professors with percentage scores.

### 5. Side-by-Side Professor Comparison
- Floating comparison dock storing up to 3 selected professors across navigation.
- Dedicated side-by-side comparison page comparing ratings, difficulty, would-take-again %, pedagogy distribution, and courses taught.

### 6. Course-Wise Hub & Academic Resources
- Course-wise view comparing all professors teaching a specific course.
- Direct links to official syllabus PDFs and shared study guides/notes.

### 7. Community Safety & Moderation
- **Verified College Emails**: Only `@college.edu` emails can post reviews.
- **Anonymous Reviews**: Student identity is publicly shielded but verified internally to stop fake reviews.
- **Rate Limiting**: Strictly 1 review per professor per semester per student.
- **Profanity Scrubber**: Automatic filter masking vulgar or abusive language.
- **Helpful Voting & Abuse Reporting**: Upvote/downvote reviews with a reporting modal for campus moderators.
- **Admin Moderation Dashboard**: Approval queues for reported reviews and student-submitted YouTube clips.
- **Email Notification Alerts**: Students can follow professors to be notified when new reviews are posted.
- **Dark Mode**: Seamless toggle with system persistence.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Tailwind CSS, Lucide React, Recharts, Vite |
| **Backend** | Node.js (v20+), Express, JWT (`jsonwebtoken`), Built-in Web Crypto |
| **Database** | PostgreSQL Schema (`backend/src/seed/schema.sql`) with zero-config local persistence fallback (`data_store.json`) |
| **Auth** | College domain verified JWT authentication (`@college.edu`) |

---

## 📂 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # Database engine with persistence & 10 seed professors
│   │   │   └── jwt.js                # JWT sign & verify helpers
│   │   ├── controllers/
│   │   │   ├── adminController.js    # Moderation queues & actions
│   │   │   ├── authController.js     # @college.edu register & login
│   │   │   ├── courseController.js   # Course comparisons & resource links
│   │   │   ├── professorController.js# Search, filters, details & compare
│   │   │   ├── quizController.js     # Learning-style matching algorithm
│   │   │   ├── reviewController.js   # 5-criteria reviews & helpful voting
│   │   │   └── videoController.js    # YouTube lecture submissions
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT & @college.edu enforcement
│   │   │   ├── profanityFilter.js    # Content scrubber
│   │   │   └── rateLimiter.js        # 1 review/prof/semester limit
│   │   ├── routes/                   # Express modular routes
│   │   ├── seed/
│   │   │   ├── schema.sql            # PostgreSQL DDL schema
│   │   │   └── seedData.js           # 10 realistic professors & courses
│   │   ├── utils/
│   │   │   └── sentimentAI.js        # 2-line AI sentiment synthesizer
│   │   └── server.js                 # Express server on port 5001
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/               # UI Cards, Charts, Badges & Modals
│   │   ├── context/                  # Auth, Theme & Compare contexts
│   │   ├── pages/                    # 9 Complete pages
│   │   ├── services/api.js           # API fetch client
│   │   ├── App.jsx                   # Main application router
│   │   └── index.css                 # Tailwind & Glassmorphism styles
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Run the Backend API
```bash
cd backend
npm install
npm start
```
The backend starts at `http://localhost:5001`.

### 3. Run the Frontend App
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Logins

The application includes pre-configured demo student and administrator credentials. You can use the **"One-Click Demo Evaluator Access"** buttons inside the Login modal or log in manually:

| Role | Email | Password | Access |
|---|---|---|---|
| **Student** | `arivera@college.edu` | `password123` | Post reviews, vote, follow faculty, view dashboard |
| **Admin** | `moderator@college.edu` | `password123` | Access Admin Moderation Dashboard, approve/reject |

*(You can also sign up with any email ending in `@college.edu` or `.edu`).*

---

## 🌐 API Endpoints Reference

### Authentication
- `POST /api/auth/register` — Register student account (`@college.edu` required)
- `POST /api/auth/login` — Login with email and password
- `GET /api/auth/me` — Get current user profile and followed faculty

### Professors
- `GET /api/professors` — Search faculty (`?search=`, `?department=`, `?teachingStyle=`, `?minRating=`, `?maxDifficulty=`, `?sortBy=`)
- `GET /api/professors/:id` — Full profile with radar metrics, reviews, and videos
- `GET /api/professors/compare?ids=prof-1,prof-2` — Compare 2-3 professors
- `GET /api/professors/leaderboard` — Top-rated, trending, and most-improved rankings
- `POST /api/professors/:id/follow` — Toggle email notification subscription

### Reviews
- `POST /api/reviews` — Submit 5-criteria review (rate limited & profanity filtered)
- `POST /api/reviews/:id/vote` — Upvote / downvote helpful review
- `POST /api/reviews/:id/report` — Report abusive review for moderation

### Courses
- `GET /api/courses` — List all courses with syllabi and study guides
- `GET /api/courses/:id` — Course profile and all professors teaching it

### YouTube Lecture Demos
- `GET /api/videos/professor/:professorId` — Get approved lecture clips
- `POST /api/videos` — Submit a YouTube lecture link for review

### Learning-Style Quiz
- `GET /api/quiz/questions` — Fetch learning preference questions
- `POST /api/quiz/match` — Calculate best matching professors

### Admin Moderation
- `GET /api/admin/queue` — View pending flags and video submissions
- `PATCH /api/admin/reviews/:id` — Approve or delete flagged review
- `PATCH /api/admin/videos/:id` — Approve or reject lecture clip
- `PATCH /api/admin/reports/:id` — Resolve or dismiss report
