const express = require("express");
const router = express.Router();

const { getMarketNews } = require("../controllers/marketNewsController");

router.get("/", getMarketNews);

module.exports = router;