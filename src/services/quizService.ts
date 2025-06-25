import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generates a quiz using the Google Generative AI (Gemini) model.
 * Creates a set of questions based on the specified topic and difficulty level.
 *
 * @param {string} difficulty - The difficulty level of the quiz (easy, medium, hard)
 * @param {string} topic - The topic for the quiz questions
 * @returns {Promise<Array>} Array of question objects with format:
 *   {
 *     question: string,
 *     options: { a: string, b: string, c: string, d: string },
 *     answer: string
 *   }
 * @throws {Error} If there's an error generating the quiz or if the API key is invalid
 */
const generateQuiz = async (difficulty, topic) => {
  try {
    const apikey = import.meta.env.VITE_API_KEY;
    const genAI = new GoogleGenerativeAI(apikey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    var prompt =
      "generate a quiz with exactly 10 questions (each question must be different from previous response) for topic " +
      topic +
      " in 15-20 words per question with difficulty of " +
      difficulty;
    prompt +=
      ".Generate the result in format array of objects [{question : , options : {a: ,b: ,c: ,d: },answer : } {question : , options : {a: ,b: ,c: ,d: },answer : } {question : , options : {a: ,b: ,c: ,d: },answer : }....].";
    const result = await model.generateContent(prompt);
    const content = result.response.text();
    const pureContent = content.substring(7, content.length - 4);
    const quizArray = JSON.parse(pureContent);
    return quizArray;
  } catch (error) {
    console.log("Error fetching Quiz data from gemini", error);
    throw error;
  }
};

export default generateQuiz;
