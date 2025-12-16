import { createRequire } from "module";
import { runGemini } from "../services/geminiService.js";
import { buildPrompt } from "../utils/promptBuilder.js";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export const analyzeProfile = async (req, res) => {
  console.log("✅ CONTROLLER HIT");

  // ✅ GitHub added (nothing removed)
  const { leetcode, gfg, role, github } = req.body;
  const file = req.file;

  console.log("📄 FILE RECEIVED:", file?.originalname);
  console.log("👤 USER INPUT:", { leetcode, gfg, github, role });

  if (!file || !file.buffer) {
    return res.status(400).json({
      success: false,
      message: "Resume file missing",
    });
  }

  let resumeText = "";

  try {
    const pdfData = await pdf(file.buffer);
    resumeText = pdfData.text.slice(0, 2500);
    console.log("📄 RESUME TEXT EXTRACTED");
  } catch (err) {
    console.error("❌ PDF PARSE FAILED:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to parse resume",
    });
  }

  // ✅ GitHub passed to prompt (safe fallback)
  const prompt = buildPrompt({
    resume: resumeText,
    skills: `LeetCode: ${leetcode}, GFG: ${gfg}`,
    github: github || "Not provided",
    role,
  });

  console.log("🚀 CALLING GEMINI NOW");

  let aiText;
  try {
    aiText = await runGemini(prompt);
  } catch (err) {
    console.error("❌ GEMINI FAILED:", err);
    return res.status(500).json({
      success: false,
      message: "Gemini call failed",
    });
  }

  let parsed;
  try {
    parsed = JSON.parse(aiText);
  } catch {
    return res.status(500).json({
      success: false,
      message: "Invalid JSON from Gemini",
    });
  }

  return res.json({
    success: true,
    data: parsed,
  });
};
