const express=require("express");
const router = express.Router();
const {addHistory,getHistory,clearHistory}=require("../controllers/historyController")

router.post("/",addHistory)
router.get("/:firebaseUid",getHistory);
router.delete("/clear/:firebaseUid",clearHistory)

module.exports=router;