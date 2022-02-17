const {Participant} = require('../models/Participant');
const fs = require("fs");


const deleteParticipant = (req, res) => {
    const id = req.params.id
    Participant.findOneAndDelete({Id:id}, (err) => {
        if (err) console.log(err);
        console.log("found participant and deleted");
        fs.unlink(`./public/images/${id}.jpg`, (err) => {
            if (err) console.log(err);
            console.log("deleted file");
            return res.redirect('/admin');
        });
    });
  }

module.exports = {
    deleteParticipant
}