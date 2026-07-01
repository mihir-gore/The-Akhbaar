const pool=require("../db/database")

const addBookmark=async(req,res)=>{
      
    try{
        const { firebase_uid,article_id,title,image_url,article_url,source_name,category}=req.body;
        const existingBookmark= await pool.query(`SELECT * FROM bookmarks WHERE firebase_uid=$1 AND article_id=$2 AND title=$3`,[firebase_uid,article_id,title])
        if(existingBookmark.rows.length>0){
            return res.status(400).json({   
                message: "Bookmark Already Exists"
            })

        }    

        const newBookmark=await pool.query(`INSERT INTO bookmarks( firebase_uid,article_id,title,image_url,article_url,source_name,category) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * `,[ firebase_uid,article_id,title,image_url,article_url,source_name,category])
        res.status(201).json(newBookmark.rows[0]);
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error:error.message
        });
    }
    
} 

const getBookmarks= async(req,res)=>{

     try{
        const{firebaseUid}=req.params;
        const bookmarks= await pool.query(`SELECT * FROM bookmarks WHERE firebase_uid=$1 ORDER BY created_at DESC`, [firebaseUid])
        res.json(bookmarks.rows) 
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            error:error.message
        })  
    }
}

const deleteBookmark=async(req,res)=>{
    try{
        const{id}=req.params;
        await pool.query(`DELETE FROM bookmarks WHERE id=$1 `,[id])
        res.json({
            message:"Bookmark Deleted"
        })
    }catch(error){
        console.error(error);
        res.status(500).json(
            {
            error:error.message
        }
    )
    }
}
module.exports={addBookmark,getBookmarks,deleteBookmark};
