const express = require("express");
const { summarizeArticle, aiChat } = require("../controllers/aiController");
const createAiRoutes = ({ aiChatLimiter, aiSummaryLimiter }) => {
const router = express.Router();
router.post("/summarize", aiSummaryLimiter, summarizeArticle);
router.post("/chat", aiChatLimiter, aiChat);
return router;
};

module.exports = createAiRoutes;
