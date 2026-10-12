-- PostgreSQL Schema for ProfPulse (Professor Rating & Teaching Style Platform)

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'moderator', 'admin')),
    is_verified BOOLEAN DEFAULT TRUE,
    college_domain VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_college_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$')
);

CREATE TABLE IF NOT EXISTS professors (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    title VARCHAR(100) DEFAULT 'Associate Professor',
    avatar_url TEXT,
    bio TEXT,
    college_name VARCHAR(150) DEFAULT 'Metropolitan University',
    overall_rating NUMERIC(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    difficulty_avg NUMERIC(3, 2) DEFAULT 0.00,
    would_take_again_pct INT DEFAULT 0,
    ai_sentiment_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    description TEXT,
    syllabus_url TEXT,
    notes_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS professor_courses (
    professor_id VARCHAR(36) REFERENCES professors(id) ON DELETE CASCADE,
    course_id VARCHAR(36) REFERENCES courses(id) ON DELETE CASCADE,
    semester_terms TEXT[],
    PRIMARY KEY (professor_id, course_id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(36) PRIMARY KEY,
    professor_id VARCHAR(36) NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(36) NOT NULL REFERENCES courses(id),
    semester VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    is_anonymous BOOLEAN DEFAULT TRUE,
    would_take_again BOOLEAN NOT NULL,
    grade_received VARCHAR(5),
    review_text TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'flagged', 'rejected')),
    helpful_upvotes INT DEFAULT 0,
    helpful_downvotes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_professor_semester UNIQUE (user_id, professor_id, semester, year)
);

CREATE TABLE IF NOT EXISTS ratings (
    id VARCHAR(36) PRIMARY KEY,
    review_id VARCHAR(36) UNIQUE NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    overall NUMERIC(2, 1) NOT NULL CHECK (overall >= 1.0 AND overall <= 5.0),
    teaching_clarity NUMERIC(2, 1) NOT NULL CHECK (teaching_clarity >= 1.0 AND teaching_clarity <= 5.0),
    grading_fairness NUMERIC(2, 1) NOT NULL CHECK (grading_fairness >= 1.0 AND grading_fairness <= 5.0),
    helpfulness NUMERIC(2, 1) NOT NULL CHECK (helpfulness >= 1.0 AND helpfulness <= 5.0),
    difficulty NUMERIC(2, 1) NOT NULL CHECK (difficulty >= 1.0 AND difficulty <= 5.0),
    attendance_strictness NUMERIC(2, 1) NOT NULL CHECK (attendance_strictness >= 1.0 AND attendance_strictness <= 5.0)
);

CREATE TABLE IF NOT EXISTS teaching_style_tags (
    id VARCHAR(36) PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS review_teaching_style_tags (
    review_id VARCHAR(36) REFERENCES reviews(id) ON DELETE CASCADE,
    tag_id VARCHAR(36) REFERENCES teaching_style_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (review_id, tag_id)
);

CREATE TABLE IF NOT EXISTS videos (
    id VARCHAR(36) PRIMARY KEY,
    professor_id VARCHAR(36) NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
    course_id VARCHAR(36) REFERENCES courses(id) ON DELETE SET NULL,
    submitted_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    youtube_url TEXT NOT NULL,
    youtube_video_id VARCHAR(50) NOT NULL,
    description TEXT,
    lecture_topic VARCHAR(150),
    status VARCHAR(20) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS votes (
    id VARCHAR(36) PRIMARY KEY,
    review_id VARCHAR(36) NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_review_vote UNIQUE (user_id, review_id)
);

CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(36) PRIMARY KEY,
    review_id VARCHAR(36) REFERENCES reviews(id) ON DELETE CASCADE,
    reported_by VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason VARCHAR(50) NOT NULL CHECK (reason IN ('offensive_language', 'hate_speech', 'false_information', 'harassment', 'spam', 'other')),
    details TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS follows (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    professor_id VARCHAR(36) NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
    notify_email BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_follow UNIQUE (user_id, professor_id)
);

CREATE INDEX IF NOT EXISTS idx_professors_dept ON professors(department);
CREATE INDEX IF NOT EXISTS idx_professors_rating ON professors(overall_rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_professor ON reviews(professor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_videos_professor ON videos(professor_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
