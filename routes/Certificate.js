const express = require('express');
const router = express.Router();
const { generateCertificate } = require('../controllers/Certificate');

router.post('/', generateCertificate);

router.get('/', (req, res) => {
    res.redirect('/')
    }
);

module.exports = { path: "/certificate", router };
