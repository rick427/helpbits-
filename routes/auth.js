const express = require('express');
const {signup, signin} = require('../controllers/auth');
const {signupValidator} = require('../validators');
const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/signin', signin)

module.exports = router;

