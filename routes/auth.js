const express = require('express');
const {signup, signin, logout} = require('../controllers/auth');

const {signupValidator} = require('../validators');
const router = express.Router();

router.post('/register', signupValidator, signup);
router.post('/login', signin);
router.get('/logout', logout);

module.exports = router;

