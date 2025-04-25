import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const difficultyOptions = [
  { value: 'easy', label: 'Easy', color: 'bg-green-100 border-green-300 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
  { value: 'hard', label: 'Hard', color: 'bg-red-100 border-red-300 text-red-800' }
];

const LandingPage = ({ onStartQuiz }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onStartQuiz(topic, difficulty);
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-6">
        <motion.div 
          className="rounded-full p-4 bg-indigo-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Brain size={40} className="text-indigo-600" />
        </motion.div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">QuizGenius</h1>
      <p className="text-center text-gray-600 mb-8">Test your knowledge on any topic</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            What would you like to learn about?
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="topic"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter any topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Sparkles size={20} className="text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">For example: Quantum Physics, World History, Machine Learning...</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select difficulty level:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                  py-2 px-3 border rounded-md text-sm font-medium transition-all
                  ${difficulty === option.value ? option.color : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}
                `}
                onClick={() => setDifficulty(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          disabled={!topic || isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Quiz...
            </>
          ) : (
            'Generate Quiz'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default LandingPage;