const express=require("express");
const router=express.Router();
const {addBookmark,getBookmarks,deleteBookmark}=require("../controllers/bookmarksController")

router.get("/", (req, res) => {

  res.send(
    "Bookmark route works"
  );

});

router.post("/",addBookmark);
router.get("/:firebaseUid",getBookmarks)
router.delete("/:id",deleteBookmark)
module.exports=router;  