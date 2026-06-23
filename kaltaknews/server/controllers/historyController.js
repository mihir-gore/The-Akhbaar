const pool=require("../db/database")
const addHistory=async(req,res)=>{
    try{
        const {firebase_uid,article_id,title,image_url,article_url,source_name}=req.body;
        const existingHistory=await pool.query(`SELECT * FROM history WHERE firebase_uid=$1 AND article_id=$2`,[firebase_uid,article_id])
        if(existingHistory.rows.length>0){

            const updatedHistory= await pool.query(`UPDATE history SET viewed_at= CURRENT_TIMESTAMP WHERE firebase_uid=$1 AND article_id=$2 RETURNING *`,[firebase_uid,article_id])
            return res.json(updatedHistory.rows[0]);
        }

        const  newHistory= await pool.query(`INSERT INTO history(firebase_uid,article_id,title,image_url,article_url,source_name) VALUES($1,$2,$3,$4,$5,$6) RETURNING *` ,[firebase_uid,article_id,title,image_url,article_url,source_name])
        res.status(201).json(newHistory.rows[0]);
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            error:error.message
        })
    }
}

const getHistory=async(req,res)=>{
   
     try{
         const {firebaseUid}=req.params;
         const history=await pool.query(`SELECT * FROM history WHERE firebase_uid=$1 ORDER BY viewed_at DESC`,[firebaseUid])
         res.json(history.rows)
        }   
        catch(error){
            console.error(error)

            res.status(500).json({
                error:error.message
            })
        }
}

const clearHistory=async(req,res)=>{
    try{
        const {firebaseUid}=req.params;
        await pool.query(`DELETE FROM history WHERE firebase_uid=$1`,[firebaseUid])
       res.json({
        message: "History Cleared"
       })
}
catch(error){
    console.log(error)

    res.status(500).json({
        error:error.message
    })
}
}

module.exports={addHistory,getHistory,clearHistory};