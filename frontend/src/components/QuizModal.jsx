import React, { useState, useEffect } from 'react';
import { Sparkles, X, Check, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { api } from '../services/api';
import RatingStars from './RatingStars';
import StyleTagBadge from './StyleTagBadge';

export default function QuizModal({ isOpen, onClose, onSelectProfessor }) {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [department, setDepartment] = useState('All');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (isOpen) {
      api.getQuizQuestions()
        .then(res => {
          setQuestions(res.questions || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQ = questions[currentStep];

  const handleSelectOption = (option) => {
    const qKey = currentQ.id;
    const value = option.styleTag || option.difficultyRange;
    setAnswers({ ...answers, [qKey]: value });
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit quiz
      setSubmitting(true);
      try {
        const res = await api.matchQuizProfessors({
          answers,
          preferredDepartment: department
        });
        setResults(res.recommended || []);
      } catch (err) {
        console.error('Quiz matching error:', err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const resetQuiz = () => {
    setResults(null);
    setCurrentStep(0);
    setAnswers({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            AI Learning-Style Matcher
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-100">
            Find Your Ideal Teaching Match
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Answer 4 quick learning preference questions to discover the professors tailored to how you absorb knowledge best.
          </p>
        </div>

        {results ? (
          /* Results View */
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Top Matching Professors
              </span>
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-500 hover:text-emerald-500 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            </div>

            <div className="space-y-3">
              {results.map(({ professor, matchPercentage, topTraits }) => (
                <div
                  key={professor.id}
                  onClick={() => {
                    onClose();
                    if (onSelectProfessor) onSelectProfessor(professor.id);
                  }}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-emerald-500/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 cursor-pointer transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={professor.avatar_url}
                      alt={professor.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/30"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {professor.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {professor.department}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <RatingStars rating={professor.overall_rating} size="xs" showScore />
                        <span className="text-[11px] text-slate-400">
                          Diff: {professor.difficulty_avg}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {matchPercentage}%
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Match Score</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Loading quiz questions...</div>
        ) : (
          /* Step-by-step questions */
          <div>
            {/* Step progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-emerald-500 h-1.5 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            {currentQ && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {currentQ.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentQ.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {currentQ.options.map((opt, idx) => {
                    const optVal = opt.styleTag || opt.difficultyRange;
                    const isSelected = JSON.stringify(answers[currentQ.id]) === JSON.stringify(optVal);

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!answers[currentQ?.id] || submitting}
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 disabled:opacity-40"
                  >
                    <span>{currentStep === questions.length - 1 ? (submitting ? 'Matching...' : 'Show Matches') : 'Continue'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
