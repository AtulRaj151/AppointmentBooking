const express = require("express");
const router = express.Router();
const home = require("../controller/index");

router.get("/", home.index);
router.use("/api", require("./api"));

module.exports = router;
