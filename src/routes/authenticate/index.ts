import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  function (req, res) {
    res.send(req.user);
  });
export = router;
