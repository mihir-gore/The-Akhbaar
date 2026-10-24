const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, ".env")});
const express = require('express');
const cors=require("cors");
const helmet=require("helmet")
const {connectRedis} = require("./db/redis");
const pool = require('./db/database');
const app = express();
const PORT=process.env.PORT || 5000;
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || true
}));
app.use(express.json({
    limit:"100kb"
}));    
app.get("/", async (req, res) => {
    try {

        const result = await pool.query("SELECT NOW()");
        res.json({
            success: true,
            time: result.rows[0]
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
});

 const startServer=async()=>{
    try{
        await connectRedis();
        console.log("Redis is ready. Initializing rate limiters...")
        const {generalLimiter,aiChatLimiter,aiSummaryLimiter}=require("./middleware/rateLimiter").createRateLimiters();
        const userRoutes = require("./routes/userRoutes")
        const bookmarkRoutes=require("./routes/bookmarkRoutes")
        const historyRoutes=require("./routes/historyRoutes")
        const createAiRoutes=require("./routes/aiRoutes")
        const recommendationRoutes=require("./routes/recommendationRoutes")
        const newsRoutes=require("./routes/newsRoutes")
        const marketNewsRoutes = require("./routes/marketNewsRoutes");

        app.use("/api",generalLimiter)
        app.use("/api/users", userRoutes)
        app.use("/api/bookmarks",bookmarkRoutes)
        app.use("/api/history",historyRoutes)    
        app.use("/api/ai",createAiRoutes({aiChatLimiter,aiSummaryLimiter}))
        app.use("/api/recommendations",recommendationRoutes)
        app.use("/api/news",newsRoutes)
        app.use("/api/market-news", marketNewsRoutes);  
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT} `);
        })
    }
    catch(error){
        console.error("Error starting server:", error);
        process.exit(1);
    }
 }

 startServer();
