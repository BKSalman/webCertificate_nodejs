const { Participant } = require("../models/Participant");


const admin =  (req, res, next) => {
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
  }

module.exports = { admin };