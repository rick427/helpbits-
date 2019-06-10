const express = require('express');
const {signup} = require('../controllers/auth');
const {signupValidator} = require('../validators');
const router = express.Router();

router.post('/signup', signupValidator, signup);

module.exports = router;

