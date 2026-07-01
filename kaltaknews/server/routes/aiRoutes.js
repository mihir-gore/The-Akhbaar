const express=require("express");
const router=express.Router();
const {summarizeArticle}=require("../controllers/aiController");
router.post("/summarize",summarizeArticle);
module.exports=router;