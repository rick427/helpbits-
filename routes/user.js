const express = require('express');
const {userById, allUsers, getUser, updateUser} = require('../controllers/user');
const {protectedRoute} = require('../controllers/auth');
const router = express.Router();

router.get('/user/all', allUsers);
router.get('/user/:id', protectedRoute, getUser);
router.put('/user/:id', protectedRoute, updateUser);

//any route containing userid, will execute userbyID
router.param("id", userById);

module.exports = router;

