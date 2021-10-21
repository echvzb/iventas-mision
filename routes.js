const router = require("express").Router();
const passport = require("passport");
const path = require("path");

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/user");
  }
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/user", (req, res) => {
  if (!req.user) res.sendStatus(400);
  else res.json({ ...req.user, _id: req.user._id.toString() });
});
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

module.exports = router;
