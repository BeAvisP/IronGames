const express = require("express");
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}
router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("auth/profile", { user: req.session.currentUser });
});
module.exports = router;
