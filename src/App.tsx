import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Github } from "lucide-react";
import LandingPage from "./components/LandingPage.tsx";
import QuizPage from "./components/QuizPage.tsx";
import "./index.css";

/**
 * Main application component that sets up routing for the quiz application.
 * It provides a consistent header and footer across all pages.
 */
function App() {
  return (
    <Router>
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

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </main>

        <footer className="bg-white py-4 px-4 border-t">
          <div className="container mx-auto text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} QuizGenius. All rights reserved.</p>
            <p className="text-xs mt-1">Super Powered by Gemini AI</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
