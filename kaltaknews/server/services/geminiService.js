const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateSummary = async (title, description) => {
    const prompt = ` You are an AI assistant for a modern news application.

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
- If the title and description is in Hindi, give the response in hindi as well. 

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

const generateChatResponse = async (question, articles) => {

    const newsContext = articles
        .map((article, index) => `
${index + 1}.

Title: ${article.title}

Description: ${article.description || "No description available."}
`)
        .join("\n");

    const prompt = `
You are an AI News Assistant for a modern news application.

Answer the user's question ONLY using the news articles provided below.

If the answer cannot be determined from these articles, say:

Return plain text only.

Do NOT use:
- *
- **
- #
- Markdown
- Bullet syntax

Use simple numbered lists instead.

"I couldn't find that information in today's news."

Keep answers:

- Professional
- Easy to understand
- Well structured
- Under 250 words
- Do not invent facts.
- Give proper spacing between lines and paragraphs.

====================

NEWS ARTICLES

${newsContext}

====================

User Question:

${question}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text.trim();
};

const generalChatResponse = async (question) => {

    const prompt = `
You are an intelligent AI assistant.

The user asked:

"${question}"

Answer naturally using your own knowledge.

If the question asks about current events or today's news and you are not certain, clearly mention that your knowledge may not reflect the latest developments.

Do not invent breaking news.

Keep the answer concise and helpful.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;

};

module.exports = { generateSummary, generateChatResponse, generalChatResponse }; 
