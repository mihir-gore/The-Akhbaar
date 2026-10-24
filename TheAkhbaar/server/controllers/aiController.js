const parseQuestion = require("../utils/parseQuestion")
const axios = require("axios")
const { redisClient } = require("../db/redis")
const { generateSummary, generateChatResponse, generalChatResponse } = require("../services/geminiService")
const summarizeArticle = async (req, res) => {

    try {
        const { article_id, title, description } = req.body;
        const summaryCacheKey = article_id ? `ai-summary:${article_id}` : `ai-summary:${title.trim().toLowerCase()}`;
        const cachedSummary = await redisClient.get(summaryCacheKey);
        if (cachedSummary) {
            console.log("AI Summary Redis HIT:", summaryCacheKey)
            return res.json({
                success: true,
                summary: JSON.parse(cachedSummary),
                cached: true
            })
        }
        console.log("AI Summary Redis MISS:", summaryCacheKey)

        const summary = await generateSummary(title, description);

        await redisClient.setEx(summaryCacheKey, 600, JSON.stringify(summary));
        console.log("AI Summary cached:", summaryCacheKey)
        return res.json({
            success: true,
            summary,
            cached: false
        })
    } catch (error) {
        console.error("AI Summary Error:", error.message)
        return res.status(500).json({
            success: false,
            message: "Failed to Generate AI Summary"
        })
    }
}

const aiChat = async (req, res) => {

    try {
        const { question } = req.body;
        if (typeof question !== "string" || !question.trim()) {
        return res.status(400).json({ 
        success: false, 
        message: "A valid question is required." 
        });
     }
        const { category, search, count } = parseQuestion(question);

        const aiResponseCacheKey = ["ai-chat-response", category || "", search || "", count || 10, question.trim().toLowerCase()].join(":");

        const cachedAnswer = await redisClient.get(aiResponseCacheKey);
        if (cachedAnswer) {
            console.log("AI Chat Response Redis HIT:", aiResponseCacheKey)
            return res.json({
                success: true,
                answer: cachedAnswer,
                cached: true
            })
        }

        console.log("AI Chat Response Redis MISS:", aiResponseCacheKey)

        const cacheKey = ["ai-chat-news", category || "", search || "", count || 10].join(":");

        const cachedArticles = await redisClient.get(cacheKey);

        let articles;
        if (cachedArticles) {
            console.log("AI Chat Redis HIT:", cacheKey)
            articles = JSON.parse(cachedArticles);
        }
        else {
            console.log("AI Chat Redis MISS: ", cacheKey)

            const params = {
                apikey: process.env.NEWSDATA_API_KEY,
                country: "in",
                language: "en,hi",
                size: Math.max(count, 10)
            }
            if (category) {
                params.category = category;
            } else {
                params.q = search;
            }

            const newResponse = await axios.get("https://newsdata.io/api/1/latest", { params })
            articles = newResponse.data.results || [];
            await redisClient.setEx(
                cacheKey,
                600,
                JSON.stringify(articles)
            );
            console.log("AI Chat news cached:", cacheKey);
        }

        let answer;
        if (articles.length === 0) {
            answer = await generalChatResponse(question);
        } else {
            answer = await generateChatResponse(question, articles);
        }
        await redisClient.setEx(
            aiResponseCacheKey,
            600,
            answer
        )
        console.log("AI Chat Response cached:", aiResponseCacheKey);
        return res.json({
            success: true,
            answer,
            cached: false
        });
    }
    catch (error) {
        console.error("AI Chat Error:", error.response?.data || error.message)
        res.status(500).json({
            success: false,
            message: " Failed to Generate AI Response"
        })
    }
};

module.exports = { summarizeArticle, aiChat }

