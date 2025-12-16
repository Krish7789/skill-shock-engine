import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function runGemini(prompt) {
  console.log("🧠 Using model: models/gemini-2.5-flash");

  const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash",
  });

  const callGemini = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const result = await model.generateContent(prompt, {
        signal: controller.signal,
      });
      return result.response.text();
    } finally {
      clearTimeout(timeout);
    }
  };

  try {
    // 🔹 First attempt
    return await callGemini();
  } catch (err) {
    const status = err?.status || err?.response?.status;
    console.error("❌ Gemini attempt 1 failed", status || err.name);

    // 🔹 ONE SAFE retry only for 503
    if (status === 503) {
      console.log("🔁 Retrying Gemini once after 1.2s...");
      await new Promise((r) => setTimeout(r, 1200));
      return await callGemini();
    }

    throw new Error("Gemini request failed");
  }
}
