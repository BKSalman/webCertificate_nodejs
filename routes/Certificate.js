const express = require("express");
const router = express.Router();
const { Participant } = require("../models/Participant");
const { generateCertificate } = require("../controllers/Certificate");

router.post("/", generateCertificate);

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const participant = await Participant.findOne({ Id: id })
  res.render("certificate", { imgURL: participant.imgURL });
});

module.exports = { path: "/certificate", router };
