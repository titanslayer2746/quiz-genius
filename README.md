# QuizGenius - AI-Powered Quiz Generator

A modern, interactive quiz application powered by AI that generates personalized questions on any topic. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🤖 **AI-Powered Questions**: Generate intelligent questions on any topic using advanced AI technology
- 🎯 **Customizable Difficulty**: Choose from Easy, Medium, or Hard difficulty levels
- 📚 **Any Topic**: From science to history, literature to technology - test your knowledge on anything
- 🏆 **Instant Results**: Get immediate feedback and detailed explanations for each answer
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 📱 **Mobile Friendly**: Optimized for all device sizes

## How to Use

### 1. Landing Page (`/`)

- **Choose Your Topic**: Enter any subject you want to test yourself on - from quantum physics to world history
- **Select Difficulty**: Pick Easy, Medium, or Hard based on your knowledge level
- **Generate Quiz**: Click "Generate Quiz" to create your personalized quiz

### 2. Quiz Form (`/quiz-form`)

- **Take the Quiz**: Answer questions one by one with a timer for each
- **Navigation**: Use previous/next buttons to review or skip questions
- **Progress Tracking**: See your progress through the quiz

### 3. Results

- **Score Review**: See your final score and performance
- **Detailed Feedback**: Get explanations for each answer
- **Restart**: Take another quiz or return to the home page

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini AI API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd quiz-genius
```

2. Install dependencies:

```bash
npm install
```

3. Set up your API key:

   - Get a Google Gemini AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the root directory
   - Add your API key: `VITE_GEMINI_API_KEY=your_api_key_here`

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx      # Enhanced landing page with features and how-to guide
│   ├── QuizForm.tsx         # Quiz generation and display component
│   ├── Quiz.tsx             # Quiz flow management
│   ├── QuizQuestion.tsx     # Individual question display
│   └── Results.tsx          # Results and feedback display
├── services/
│   └── quizService.ts       # AI quiz generation service
├── App.tsx                  # Main app with routing
└── main.tsx                 # App entry point
```

## Routing

- `/` - Landing page with app introduction and quiz setup
- `/quiz-form` - Quiz generation and taking interface

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety and better development experience
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Google Gemini AI** - AI-powered quiz generation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Powered by Google Gemini AI
- Icons by Lucide React
- Animations by Framer Motion
