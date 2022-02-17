const express = require("express");
const router = express.Router();
const { admin, createAdmin, adminLoginForm } = require("../controllers/admin");
const passport = require("passport");
const {requiresLogin} = require("../middleware/userlogged");

router.get("/", requiresLogin, admin);

router.get("/login", adminLoginForm);

router.post('/login', passport.authenticate("local", {
    successRedirect: "/admin",
    successReturnToOrRedirect: "/admin",
    failureRedirect: "/admin/login",
  })
  )

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/admin/login");
});

router.post("/new", createAdmin);

module.exports = { path: "/admin", router };
