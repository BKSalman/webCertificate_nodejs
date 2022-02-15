const express = require("express");
const router = express.Router();
const { Participant } = require("../models/Participant");

router.get("/", function (req, res, next) {
  Participant.find({}, (err, participants) => {
    if (err) {
      console.log(err);
    } else {
      res.render("admin", {
        title: "Admin",
        participants: participants,
      });
    }
  });
});

module.exports = { path: "/admin", router };
