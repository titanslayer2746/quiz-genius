import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, ArrowLeft, ArrowRight } from "lucide-react";
import QuizQuestion from "./QuizQuestion";

/**
 * Quiz component that manages the quiz flow, including question navigation and timer.
 * It handles the display of questions and tracks user answers.
 *
 * @param {Object} props - Component props
 * @param {Array} props.questions - Array of quiz questions
 * @param {Function} props.onComplete - Callback function when quiz is completed
 */
const Quiz = ({ questions, onComplete }) => {
  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to store user's answers
  const [answers, setAnswers] = useState([]);
  // State to manage the timer for each question
  const [timer, setTimer] = useState(0);
  // State to control visibility of navigation controls
  const [showControls, setShowControls] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Reset timer when question changes
    setTimer(30);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          // Auto-submit if time runs out
          handleAnswer(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex]);

  /**
   * Handles user's answer to the current question.
   * Updates the answers array and moves to the next question or completes the quiz.
   * @param {boolean} isCorrect - Whether the answer was correct
   */
  const handleAnswer = (isCorrect) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  /**
   * Navigates between questions using previous/next buttons.
   * @param {string} direction - Direction to navigate ('prev' or 'next')
   */
  const navigateQuestion = (direction) => {
    if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (
      direction === "next" &&
      currentQuestionIndex < questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <QuizQuestion
            key={currentQuestionIndex}
            question={currentQuestion}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            timer={timer}
          />
        </AnimatePresence>
      </div>

      {/* Navigation controls (shown on hover for desktop) */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="hidden md:flex justify-between items-center w-full max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => navigateQuestion("prev")}
              disabled={
                currentQuestionIndex === 0 ||
                answers.length <= currentQuestionIndex
              }
              className={`p-2 rounded-full ${
                currentQuestionIndex === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex space-x-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentQuestionIndex
                      ? "bg-indigo-600"
                      : index < answers.length
                      ? "bg-indigo-300"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            <button
              onClick={() => navigateQuestion("next")}
              disabled={
                currentQuestionIndex === questions.length - 1 ||
                answers.length <= currentQuestionIndex
              }
              className={`p-2 rounded-full ${
                currentQuestionIndex === questions.length - 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;
