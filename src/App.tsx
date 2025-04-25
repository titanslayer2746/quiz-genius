import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Results from './components/Results';
import generateQuiz from './services/quizService';
import './index.css';

const AppStates = {
  LANDING: 'landing',
  LOADING: 'loading',
  QUIZ: 'quiz',
  RESULTS: 'results',
};

function App() {
  const [appState, setAppState] = useState(AppStates.LANDING);
  const [quizData, setQuizData] = useState({
    questions: [],
    topic: '',
    difficulty: '',
  });
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);

  const handleStartQuiz = async (topic, difficulty) => {
    setAppState(AppStates.LOADING);
    setError(null);
    
    try {
      const questions = await generateQuiz(difficulty, topic);
      
      setQuizData({
        questions,
        topic,
        difficulty,
      });
      
      setAppState(AppStates.QUIZ);
    } catch (error) {
      console.error("Error generating quiz:", error);
      setError("We couldn't generate your quiz. Please check your API key and try again.");
      setAppState(AppStates.LANDING);
    }
  };

  const handleQuizComplete = (quizAnswers) => {
    setAnswers(quizAnswers);
    setAppState(AppStates.RESULTS);
  };

  const handleRestart = () => {
    setAppState(AppStates.LANDING);
    setAnswers([]);
  };

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">QuizGenius</h1>
          <a 
            href="https://github.com/titanslayer2746" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
          >
            <Github size={20} />
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="container mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {appState === AppStates.LANDING && (
              <motion.div
                key="landing"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <LandingPage onStartQuiz={handleStartQuiz} />
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                    {error}
                  </div>
                )}
              </motion.div>
            )}

            {appState === AppStates.LOADING && (
              <motion.div
                key="loading"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Generating your quiz, please wait...</p>
              </motion.div>
            )}

            {appState === AppStates.QUIZ && (
              <motion.div
                key="quiz"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <Quiz 
                  questions={quizData.questions} 
                  onComplete={handleQuizComplete} 
                />
              </motion.div>
            )}

            {appState === AppStates.RESULTS && (
              <motion.div
                key="results"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <Results 
                  answers={answers} 
                  totalQuestions={quizData.questions.length}
                  topic={quizData.topic}
                  difficulty={quizData.difficulty}
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-white py-4 px-4 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} QuizGenius. All rights reserved.</p>
          <p className="text-xs mt-1">Super Powered by Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;