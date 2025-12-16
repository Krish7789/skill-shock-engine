export function buildPrompt({ resume, skills, role, github }) {
  return `
You are an AI Skill Gap Analyzer.

IMPORTANT RULES:
- Respond ONLY with valid JSON
- Do NOT add markdown
- Do NOT add explanations outside JSON

RESUME CONTENT:
${resume}

CODING PROFILES:
${skills}

GITHUB PROFILE:
${github}

INSTRUCTIONS FOR GITHUB ANALYSIS:
- Use GitHub to validate real-world project experience
- Infer tech stack, consistency, and depth from repositories
- Consider project quality, not just quantity
- If GitHub is "Not provided", rely only on resume and coding profiles

TARGET ROLE:
${role}

OUTPUT FORMAT:
{
  "strengths": [],
  "skillGaps": [],
  "missingSkills": [],
  "roadmap": [
    {
      "month": 1,
      "focus": "",
      "resources": []
    }
  ],
  "finalVerdict": "",
  "readinessScore": 0
}
`;
}
