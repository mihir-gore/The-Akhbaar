const axios = require("axios");
const { redisClient } = require("../db/redis");
const getNews = async (req, res) => {
    try {
        const { category, sort, q, page } = req.query;
        const cacheKey = ["news", category || "top", q || "", page || "initial"].join(":");
        const cachedNews = await redisClient.get(cacheKey);
        if (cachedNews) {
            console.log("Redis Cache HIT:", cacheKey);
            return res.json(JSON.parse(cachedNews));

        }
        console.log("Redis Cache MISS:", cacheKey);

        const params = {
            apikey: process.env.NEWSDATA_API_KEY,
            size: 9,
            country: "in",
            language: "en,hi",
            sort: sort || "pubdateasc"
        }
        if (q) {
            params.q = q;
        }
        else {
            params.category = category || "top"

        }
        if (page) {
            params.page = page;
        }

        const response = await axios.get("https://newsdata.io/api/1/latest", { params })

        const data = response.data;

        if (data.status === "error") {
            return res.status(400).json({
                status: "error",
                message: data.message || "NewsData API Error"
            })
        }

        await redisClient.setEx(cacheKey, 600, JSON.stringify(data))

        console.log("News Cached:", cacheKey)

        return res.json(data);


    }
    catch (error) {
        console.error("News Controller Error:", error.response?.data || error.message);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error, Failed to fetch news"
        })
    }
}

module.exports = { getNews };