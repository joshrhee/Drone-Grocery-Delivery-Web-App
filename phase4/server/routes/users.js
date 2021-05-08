const express = require('express');

const { login, register, getDroneTechs } = require('../controllers/user.js');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;