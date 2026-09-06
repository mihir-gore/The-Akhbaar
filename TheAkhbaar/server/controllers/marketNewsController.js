const axios = require("axios");
const { redisClient } = require("../db/redis");


const getMarketNews = async (req, res) => {

    try {

        const { q = "", symbol = "", market_id = "", size = 10 } = req.query;
        const params = { apikey: process.env.NEWSDATA_API_KEY, country: "in", language: "en", size, removeduplicate: 1 };
        const marketNewsCacheKey = ["market-news", q.trim().toLowerCase(), symbol.trim().toLowerCase(), market_id.trim().toLowerCase(), size].join(":");
        const cachedMarketNews = await redisClient.get(marketNewsCacheKey);
        if (cachedMarketNews) {
            console.log("Market News Redis HIT:", marketNewsCacheKey);
            return res.json({
                success: true,
                results: JSON.parse(cachedMarketNews),
                cached: true
            })
        }
        console.log("Market News Redis MISS:", marketNewsCacheKey);

        if (q) {
            params.q = q;
        }
        if (symbol) {
            params.symbol = symbol;
        }
        if (market_id) {
            params.market_id = market_id;
        }

        const response = await axios.get("https://newsdata.io/api/1/market", { params });

        if (response.data.status === "error") {
            return res.status(400).json({
                success: false,
                message: response.data.message || "Failed to fetch market news"
            });
        }

        const resultsToCache = response.data.results || [];
        await redisClient.setEx(marketNewsCacheKey, 600, JSON.stringify(resultsToCache));
        console.log("Market News Cached:", marketNewsCacheKey);
        return res.json({
            success: true,
            results: response.data.results || []
        });

    } catch (error) {

        console.error(
            "Market News Error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch market news"
        });

    }

};

module.exports = { getMarketNews };