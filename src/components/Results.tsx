import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, BarChart2, RefreshCw, Share2 } from "lucide-react";

/**
 * Results component that displays the quiz results and performance statistics.
 * It shows the score, percentage, and provides feedback based on performance.
 *
 * @param {Object} props - Component props
 * @param {Array} props.answers - Array of boolean values indicating correct/incorrect answers
 * @param {number} props.totalQuestions - Total number of questions in the quiz
 * @param {string} props.topic - The quiz topic
 * @param {string} props.difficulty - The quiz difficulty level
 * @param {Function} props.onRestart - Callback function to restart the quiz
 */
const Results = ({ answers, totalQuestions, topic, difficulty, onRestart }) => {
  // State to store the final score
  const [score, setScore] = useState(0);
  // State to store the percentage score
  const [percentage, setPercentage] = useState(0);
  // State to store the feedback message
  const [message, setMessage] = useState("");

  useEffect(() => {
    const correctAnswers = answers.filter((answer) => answer).length;
    const calculatedScore = correctAnswers;
    const calculatedPercentage = Math.round(
      (correctAnswers / totalQuestions) * 100
    );

    // Animate the score count
    let currentScore = 0;
    const scoreInterval = setInterval(() => {
      if (currentScore >= calculatedScore) {
        clearInterval(scoreInterval);
      } else {
        currentScore += 1;
        setScore(currentScore);
      }
    }, 50);

    // Animate the percentage
    let currentPercentage = 0;
    const percentageInterval = setInterval(() => {
      if (currentPercentage >= calculatedPercentage) {
        clearInterval(percentageInterval);
      } else {
        currentPercentage += 1;
        setPercentage(currentPercentage);
      }
    }, 20);

    // Set feedback message based on score
    if (calculatedPercentage >= 90) {
      setMessage("Outstanding! You're an expert on this topic!");
    } else if (calculatedPercentage >= 70) {
      setMessage("Great job! You have strong knowledge in this area.");
    } else if (calculatedPercentage >= 50) {
      setMessage("Good effort! You know the basics, but could improve.");
    } else {
      setMessage("Keep learning! This topic needs more of your attention.");
    }

    return () => {
      clearInterval(scoreInterval);
      clearInterval(percentageInterval);
    };
  }, [answers, totalQuestions]);

  /**
   * Determines the color class for the score based on the percentage.
   * @returns {string} CSS class for the score color
   */
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex p-4 rounded-full bg-indigo-100 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
        >
          <Award size={40} className="text-indigo-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Quiz Completed!
        </h2>
        <p className="text-gray-600">
          You've completed the {difficulty} quiz on {topic}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-200"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <motion.circle
                  className="text-indigo-600"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                  initial={{
                    strokeDasharray: "364 364",
                    strokeDashoffset: 364,
                  }}
                  animate={{
                    strokeDashoffset: 364 - (364 * percentage) / 100,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className={`text-3xl font-bold ${getScoreColor()}`}>
                  {percentage}%
                </span>
              </div>
            </div>
          </div>

          <p className="text-xl font-semibold mb-1">
            Your score:{" "}
            <span className={getScoreColor()}>
              {score}/{totalQuestions}
            </span>
          </p>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between text-sm">
            <div className="text-green-600">
              <div className="font-medium">Correct</div>
              <div className="text-lg font-bold">
                {answers.filter((a) => a).length}
              </div>
            </div>
            <div className="text-red-600">
              <div className="font-medium">Wrong</div>
              <div className="text-lg font-bold">
                {answers.filter((a) => !a).length}
              </div>
            </div>
            <div className="text-indigo-600">
              <div className="font-medium">Total</div>
              <div className="text-lg font-bold">{totalQuestions}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onRestart}
        >
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            // This would be implemented with a real sharing functionality
            alert("Share functionality would go here!");
          }}
        >
          <Share2 size={16} className="mr-2" />
          Share
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Results;
