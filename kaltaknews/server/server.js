const express = require('express');
const pool = require('./db/database');
const userRoutes = require("./routes/userRoutes")
const bookmarkRoutes=require("./routes/bookmarkRoutes")
const historyRoutes=require("./routes/historyRoutes")
const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());    
app.use("/api/users", userRoutes)
app.use("/api/bookmarks",bookmarkRoutes)
app.use("/api/history",historyRoutes)    
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
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
