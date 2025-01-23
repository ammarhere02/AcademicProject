const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controller/authentication');

router.post('/register', signUp)
router.post('/login', login)
module.exports = router;
