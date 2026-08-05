const express=require("express");
const router=express.Router();
const {summarizeArticle,aiChat}=require("../controllers/aiController");
router.post("/summarize",summarizeArticle);
router.post("/chat",aiChat)
module.exports=router;