/**
 * Imports required
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Initing Gemini
 */
const GOOGLE_AI = new GoogleGenerativeAI(process.env.GEMINI_API ?? "");
const AI = GOOGLE_AI.getGenerativeModel({
  model: "gemini-pro",
});

/**
 * Exporting AI
 */
export default AI;
