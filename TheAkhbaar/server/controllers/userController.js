const pool = require('../db/database');
const createUser = async (req, res) => {

    console.log("Body:", req.body);

    try {
        const { firebase_uid, username, email } = req.body;
        const existingUser = await pool.query(`SELECT * FROM users WHERE firebase_uid=$1`, [firebase_uid]);

        if (existingUser.rows.length > 0) {
            return res.json({
                message: "User Already Exists"
            })
        }

        const newUser = await pool.query(`INSERT INTO users(firebase_uid,email) VALUES($1,$2) RETURNING *`, [firebase_uid, email]);
        res.status(201).json(newUser.rows[0]);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        })
    }

}


module.exports = { createUser };   
