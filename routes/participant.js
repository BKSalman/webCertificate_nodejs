const express = require('express');
const router = express.Router();
const {deleteParticipant} = require('../controllers/participant');

router.post('/delete/:id', deleteParticipant);

module.exports = { path: "/participant", router };
