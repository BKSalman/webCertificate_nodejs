const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const participantSchema = new Schema({
    Pre: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Id: {
        type: String,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: true,
    },
    rating: 
        {
            rating1: {
            type: String,
            required: true,
        },
        rating2: {
            type: String,
            required: true,
        },
        rating3: {
            type: String,
            required: true,
        },
    }
    ,
});

module.exports = {
  Participant: mongoose.model("participant", participantSchema),
};
