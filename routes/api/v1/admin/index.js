const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../../../../controller/api/v1/admin/admin");

router.post("/signup", adminController.signUp);
router.post("/signin", adminController.login);

module.exports = router;
