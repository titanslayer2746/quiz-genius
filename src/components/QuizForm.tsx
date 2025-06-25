import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react";
import Quiz from "./Quiz.tsx";
import Results from "./Results.tsx";
import generateQuiz from "../services/quizService.ts";

interface QuizData {
  questions: any[];
  topic: string;
  difficulty: string;
}

/**
 * QuizForm component that handles quiz generation and display.
 * This component manages the quiz state and coordinates between different quiz phases.
 */
const QuizForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appState, setAppState] = useState<string>("loading");
  const [quizData, setQuizData] = useState<QuizData>({
    questions: [],
    topic: "",
    difficulty: "",
  });
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get topic and difficulty from navigation state or use defaults
  const { topic = "", difficulty = "medium" } = location.state || {};

  useEffect(() => {
    if (topic) {
      handleStartQuiz(topic, difficulty);
    } else {
      // If no topic provided, redirect back to landing page
      navigate("/");
    }
  }, [topic, difficulty, navigate]);

  const handleStartQuiz = async (quizTopic: string, quizDifficulty: string) => {
    setAppState("loading");
    setError(null);

    try {
      const questions = await generateQuiz(quizDifficulty, quizTopic);

      setQuizData({
        questions,
        topic: quizTopic,
        difficulty: quizDifficulty,
      });

      setAppState("quiz");
    } catch (error) {
      console.error("Error generating quiz:", error);
      setError(
        "We couldn't generate your quiz. Please check your API key and try again."
      );
      setAppState("error");
    }
  };

  const handleQuizComplete = (quizAnswers: boolean[]) => {
    setAnswers(quizAnswers);
    setAppState("results");
  };

  const handleRestart = () => {
    navigate("/");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Animation variants for smooth page transitions
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold text-indigo-600">QuizGenius</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="container mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {appState === "loading" && (
              <motion.div
                key="loading"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-6">
                    <Loader2 className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Generating Your Quiz
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Our AI is creating personalized questions about{" "}
                    <span className="font-semibold text-indigo-600">
                      {topic}
                    </span>
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}

            {appState === "error" && (
              <motion.div
                key="error"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Quiz Generation Failed
                  </h2>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <div className="space-y-3">
                    <button
                      onClick={handleRestart}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleBackToHome}
                      className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {appState === "quiz" && (
              <motion.div
                key="quiz"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {quizData.topic}
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                        {quizData.difficulty.charAt(0).toUpperCase() +
                          quizData.difficulty.slice(1)}
                      </span>
                      <span>{quizData.questions.length} questions</span>
                    </div>
                  </div>
                  <Quiz
                    questions={quizData.questions}
                    onComplete={handleQuizComplete}
                  />
                </div>
              </motion.div>
            )}

            {appState === "results" && (
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
    </div>
  );
};

export default QuizForm;
