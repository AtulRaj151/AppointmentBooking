const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("hello,this is from v1");
});

module.exports = router;
