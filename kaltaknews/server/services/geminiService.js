const {GoogleGenAI} = require("@google/genai");
const ai= new GoogleGenAI({
    apikey:process.env.GEMINI_API_KEY
});

const generateSummary= async(title,description)=>{
const prompt=` You are an AI assistant for a modern news application.

Analyze the following article and return ONLY valid JSON.

Return this exact structure:

{
  "keyPoints": [
    "...",
    "...",
    "..."
  ],
  "whyItMatters": "...",
  "quickTake": "..."
}

Rules:

- Return ONLY JSON.
- Do not wrap it inside markdown.
- Do not write \`\`\`json
- Exactly 3 key points.
- Each key point under 25 words.
- whyItMatters under 50 words.
- quickTake under 30 words.
- Use simple English.
- No opinions.
- No extra fields.
- If the title and description is hindi,give the response in hindi as well. 

    Title: ${title}
    Description:${description}`;
    
  const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: prompt
    });
 console.log("Gemini Response:");
console.log(response.text);

const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

console.log("After Cleanup:");
console.log(text);

return JSON.parse(text);
}
module.exports={generateSummary}; 
