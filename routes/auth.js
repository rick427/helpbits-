const express = require('express');
const {signup, signin, logout} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {signupValidator} = require('../validators');
const router = express.Router();

router.post('/register', signupValidator, signup);
router.post('/login', signin);
router.get('/logout', logout);

//any route containing userid, will execute userbyID
router.param("userId", userById);

module.exports = router;

