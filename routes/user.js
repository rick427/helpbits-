const express = require('express');
const {userById, allUsers} = require('../controllers/user');
const router = express.Router();

router.get('/user/all', allUsers);

//any route containing userid, will execute userbyID
router.param("userId", userById);

module.exports = router;

