const parseQuestion = require("../utils/parseQuestion")
const axios = require("axios")
const { generateSummary, generateChatResponse, generalChatResponse } = require("../services/geminiService")
const summarizeArticle = async (req, res) => {
    console.log("hitttttttttttt")
    try {
        const { title, description } = req.body;
        const summary = await generateSummary(title, description);
        res.json({
            success: true,
            summary
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Generate AI Summary"
        })
    }
}

const aiChat = async (req, res) => {

    try {
        const { question } = req.body;
        const { category, search, count } = parseQuestion(question);

        let url = `https://newsdata.io/api/1/latest?apikey=${process.env.REACT_APP_NEWS_API_KEY}&country=in&language=en,hi&size=${Math.max(count, 10)}`;

        if (category) {
            url += `&category=${category}`;
        } else {
            url += `&q=${encodeURIComponent(search)}`;
        }
        const newResponse = await axios.get(url);
        const articles = newResponse.data.results || [];
        let answer;
          if (articles.length === 0) {
            answer= await generalChatResponse(question);
        } else {
            answer= await generateChatResponse(question,articles);
            res.json({
                success: true,
                answer
            })
        }
    }
    catch(error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: " Failed to Generate AI Response"
            })
        }
    };
    module.exports = { summarizeArticle, aiChat }