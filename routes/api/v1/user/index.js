const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../../../../controller/api/v1/user/user");

router.post("/signup", userController.signUp);
router.post("/signin", userController.login);
router.post(
  "/book",
  passport.authenticate("jwt", { session: false }),
  userController.book
);
router.post(
  "/check",
  passport.authenticate("jwt", { session: false }),
  userController.check_availablity
);

module.exports = router;
