import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, XCircle, Sparkles } from "lucide-react";
import Quiz from "./Quiz.tsx";
import Results from "./Results.tsx";
import generateQuiz from "../services/quizService.ts";

interface QuizData {
  questions: any[];
  topic: string;
  difficulty: string;
}

const difficultyOptions = [
  {
    value: "easy",
    label: "Easy",
    color: "bg-green-100 border-green-300 text-green-800",
    icon: "🌱",
  },
  {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    icon: "🌿",
  },
  {
    value: "hard",
    label: "Hard",
    color: "bg-red-100 border-red-300 text-red-800",
    icon: "🌳",
  },
];

/**
 * QuizPage component that handles quiz generation and display for the /quiz route.
 */
const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appState, setAppState] = useState<string>("form");
  const [quizData, setQuizData] = useState<QuizData>({
    questions: [],
    topic: "",
    difficulty: "",
  });
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  // Get topic and difficulty from navigation state if provided
  useEffect(() => {
    const { topic: stateTopic, difficulty: stateDifficulty } =
      location.state || {};
    if (stateTopic) {
      setTopic(stateTopic);
      setDifficulty(stateDifficulty || "medium");
      handleStartQuiz(stateTopic, stateDifficulty || "medium");
    }
  }, [location.state]);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      handleStartQuiz(topic.trim(), difficulty);
    }
  };

  const handleQuizComplete = (quizAnswers: boolean[]) => {
    setAnswers(quizAnswers);
    setAppState("results");
  };

  const handleRestart = () => {
    setAppState("form");
    setTopic("");
    setDifficulty("medium");
    setAnswers([]);
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
            {appState === "form" && (
              <motion.div
                key="form"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Create Your Quiz
                  </h2>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What would you like to learn about?
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., Quantum Physics, World History..."
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <Sparkles size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {difficultyOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className={`
                              py-2 px-3 border rounded-lg text-sm font-medium transition-all
                              ${
                                difficulty === option.value
                                  ? option.color
                                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              }
                            `}
                            onClick={() => setDifficulty(option.value)}
                          >
                            <span className="mr-1">{option.icon}</span>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!topic.trim()}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate Quiz
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

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

export default QuizPage;
