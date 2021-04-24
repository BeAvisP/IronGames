const express = require("express");
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("auth/profile", { user: req.user });
});
module.exports = router;
