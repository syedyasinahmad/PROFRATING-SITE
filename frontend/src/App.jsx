import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareDrawer from './components/CompareDrawer';
import QuizModal from './components/QuizModal';
import AuthModal from './pages/AuthModal';

import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProfessorProfilePage from './pages/ProfessorProfilePage';
import ComparePage from './pages/ComparePage';
import CoursePage from './pages/CoursePage';
import WriteReviewPage from './pages/WriteReviewPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProfId, setSelectedProfId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [reviewTargetProf, setReviewTargetProf] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);

  // Search filter query state
  const [searchParams, setSearchParams] = useState({
    query: '',
    dept: 'All',
    tag: 'All'
  });

  const handleSelectProfessor = (profId) => {
    setSelectedProfId(profId);
    setActivePage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setActivePage('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWriteReview = (professor) => {
    setReviewTargetProf(professor);
    setActivePage('write-review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmitted = () => {
    setActivePage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeSearchSubmit = (query, dept, tag = 'All') => {
    setSearchParams({ query, dept, tag });
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuiz={() => setQuizOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activePage === 'home' && (
          <HomePage
            onSelectProfessor={handleSelectProfessor}
            onSearchSubmit={handleHomeSearchSubmit}
            onOpenQuiz={() => setQuizOpen(true)}
            onNavigatePage={setActivePage}
          />
        )}

        {activePage === 'search' && (
          <SearchResultsPage
            initialQuery={searchParams.query}
            initialDept={searchParams.dept}
            initialTag={searchParams.tag}
            onSelectProfessor={handleSelectProfessor}
          />
        )}

        {activePage === 'profile' && selectedProfId && (
          <ProfessorProfilePage
            professorId={selectedProfId}
            onWriteReview={handleWriteReview}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {activePage === 'compare' && (
          <ComparePage onSelectProfessor={handleSelectProfessor} />
        )}

        {activePage === 'courses' && (
          <CoursePage
            selectedCourseId={selectedCourseId}
            onSelectProfessor={handleSelectProfessor}
          />
        )}

        {activePage === 'write-review' && reviewTargetProf && (
          <WriteReviewPage
            professor={reviewTargetProf}
            onReviewSubmitted={handleReviewSubmitted}
            onCancel={() => setActivePage('profile')}
          />
        )}

        {activePage === 'dashboard' && (
          <StudentDashboardPage
            onSelectProfessor={handleSelectProfessor}
            onWriteReview={handleWriteReview}
          />
        )}

        {activePage === 'admin' && (
          <AdminDashboardPage />
        )}

        {activePage === 'leaderboard' && (
          <LeaderboardPage onSelectProfessor={handleSelectProfessor} />
        )}
      </main>

      {/* Persistent Compare Floating Bottom Dock */}
      {activePage !== 'compare' && (
        <CompareDrawer
          onOpenComparePage={() => {
            setActivePage('compare');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* "Best For You" Quiz Modal */}
      <QuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        onSelectProfessor={handleSelectProfessor}
      />

      {/* College Email Login / Register Modal */}
      <AuthModal />

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
