import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * QuizQuestion component that displays a single quiz question with multiple choice options.
 * It handles user interaction and provides visual feedback for correct/incorrect answers.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.question - The current question object
 * @param {Object} props.options - Object containing answer options
 * @param {Function} props.onAnswer - Callback function when an answer is selected
 * @param {number} props.currentQuestion - Current question number
 * @param {number} props.totalQuestions - Total number of questions
 * @param {number} props.timer - Time remaining for the current question
 */
const QuizQuestion = ({ question, options, onAnswer, currentQuestion, totalQuestions, timer }) => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  // State to track if the question has been answered
  const [isAnswered, setIsAnswered] = useState(false);
  // State to track if the answer was correct
  const [isCorrect, setIsCorrect] = useState(false);

  /**
   * Handles the selection of an answer option.
   * Updates the UI state and triggers the answer callback after a delay.
   * @param {string} option - The selected option key
   */
  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const correct = option === question.answer;
    setIsCorrect(correct);
    
    // Give the user a moment to see the result before moving to next question
    setTimeout(() => {
      onAnswer(correct);
      setSelectedOption(null);
      setIsAnswered(false);
    }, 1000);
  };

  /**
   * Determines the CSS classes for an option based on its state and correctness.
   * @param {string} option - The option key to get classes for
   * @returns {string} CSS classes for the option
   */
  const getOptionClass = (option) => {
    if (!isAnswered || selectedOption !== option) {
      return 'border-gray-300 bg-white hover:bg-gray-50';
    }
    
    if (option === question.answer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }
    
    return 'border-red-500 bg-red-50 text-red-700';
  };

  return (
    <motion.div 
      className="w-full max-w-xl mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {currentQuestion} of {totalQuestions}
        </span>
        {timer > 0 && (
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full">
            {timer}s
          </span>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
        <motion.div 
          className="bg-indigo-600 h-1.5 rounded-full"
          initial={{ width: `${((currentQuestion - 1) / totalQuestions) * 100}%` }}
          animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.question}</h3>
      </div>

      <div className="space-y-3">
        {Object.entries(options).map(([key, value]) => (
          <motion.button
            key={key}
            className={`w-full text-left p-4 border rounded-lg transition-all ${getOptionClass(key)}`}
            onClick={() => handleOptionSelect(key)}
            whileHover={{ scale: isAnswered ? 1 : 1.01 }}
            whileTap={{ scale: isAnswered ? 1 : 0.99 }}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-medium mr-3">
                {key.toUpperCase()}
              </span>
              <span className="flex-1">{value}</span>
              
              {isAnswered && selectedOption === key && (
                <AnimatePresence>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {isCorrect ? 
                      <CheckCircle className="text-green-500 ml-2" size={20} /> : 
                      <XCircle className="text-red-500 ml-2" size={20} />
                    }
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizQuestion;