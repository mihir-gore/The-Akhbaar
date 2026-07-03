const pool = require("../db/database");

const getRecommendations = async (req, res) => {

    try {

        const { firebase_uid } = req.params;

        const result = await pool.query(`SELECT category, SUM(score) AS total_score FROM ( SELECT category,1 AS score FROM history WHERE firebase_uid=$1 AND category IS NOT NULL  UNION ALL SELECT category, 2 AS score FROM bookmarks WHERE firebase_uid=$1 AND category IS NOT NULL ) interests GROUP BY category ORDER BY total_score DESC LIMIT 1`,[firebase_uid]);

        if (result.rows.length === 0) {

            return res.json({
                category: "top"
            });

        }

        res.json({
            category: result.rows[0].category
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {getRecommendations};