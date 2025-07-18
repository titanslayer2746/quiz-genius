import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  BookOpen,
  Target,
  Trophy,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Questions",
    description:
      "Generate intelligent questions on any topic using advanced AI technology",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Customizable Difficulty",
    description:
      "Choose from Easy, Medium, or Hard difficulty levels to match your skill",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Any Topic",
    description:
      "From science to history, literature to technology - test your knowledge on anything",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Instant Results",
    description:
      "Get immediate feedback and detailed explanations for each answer",
  },
];

const howToUse = [
  {
    step: "1",
    title: "Choose Your Topic",
    description:
      "Enter any subject you want to test yourself on - from quantum physics to world history",
  },
  {
    step: "2",
    title: "Select Difficulty",
    description: "Pick Easy, Medium, or Hard based on your knowledge level",
  },
  {
    step: "3",
    title: "Generate & Take Quiz",
    description: "Our AI creates personalized questions and you answer them",
  },
  {
    step: "4",
    title: "Review Results",
    description: "See your score and learn from detailed explanations",
  },
];

/**
 * Enhanced LandingPage component that serves as the entry point for the quiz application.
 * It provides comprehensive information about the app and allows users to start a quiz.
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleStartQuiz = () => {
    if (topic.trim()) {
      navigate("/quiz-form", {
        state: { topic: topic.trim(), difficulty },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="rounded-full p-6 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain size={48} className="text-white" />
              </motion.div>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              QuizGenius
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Test your knowledge on any topic with AI-generated quizzes. Learn,
              challenge yourself, and discover new subjects.
            </p>

            {/* Quick Start Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Start Your Quiz Journey
              </h3>

              <div className="space-y-4">
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
                  onClick={handleStartQuiz}
                  disabled={!topic.trim()}
                  className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap size={20} className="mr-2" />
                  Generate Quiz
                  <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose QuizGenius?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of learning with our AI-powered quiz
              platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                  <div className="text-indigo-600">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Use QuizGenius
            </h2>
            <p className="text-lg text-gray-600">
              Get started in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {howToUse.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of learners who are already using QuizGenius to
              expand their knowledge
            </p>
            <button
              onClick={() => navigate("/quiz-form")}
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <CheckCircle size={20} className="mr-2" />
              Start Learning Now
              <ArrowRight size={20} className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
