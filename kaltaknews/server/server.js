
require("dotenv").config({path: "../.env"});
const express = require('express');
const {connectRedis} = require("./db/redis");
const pool = require('./db/database');
const userRoutes = require("./routes/userRoutes")
const bookmarkRoutes=require("./routes/bookmarkRoutes")
const historyRoutes=require("./routes/historyRoutes")
const aiRoutes=require("./routes/aiRoutes")
const recommendationRoutes=require("./routes/recommendationRoutes")
const newsRoutes=require("./routes/newsRoutes")
const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());    
app.use("/api/users", userRoutes)
app.use("/api/bookmarks",bookmarkRoutes)
app.use("/api/history",historyRoutes)    
app.use("/api/ai",aiRoutes)
app.use("/api/recommendations",recommendationRoutes)
app.use("/api/news",newsRoutes)
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
        app.listen(5000,()=>{
            console.log("Server is running on port 5000");
        })
    }
    catch(error){
        console.error("Error starting server:", error);
        process.exit(1);
    }
 }


 startServer();
