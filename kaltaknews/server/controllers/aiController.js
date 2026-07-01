const {generateSummary}=require("../services/geminiService")
const summarizeArticle =async(req,res)=>{
    console.log("hitttttttttttt")
        try{
            const{title,description}=req.body;
            const summary=await generateSummary(title,description);
            res.json({
                success:true,
                summary
            })
        }catch(error){
            res.status(500).json({
               success:false,
               message:"Failed to Generate AI Summary"
            })
        }
}
module.exports={summarizeArticle}