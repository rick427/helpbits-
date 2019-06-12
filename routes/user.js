const express = require('express');
const {userById, allUsers, getUser, updateUser, deleteUser} = require('../controllers/user');
const {protectedRoute} = require('../controllers/auth');
const router = express.Router();

router.get('/users', allUsers);
router.get('/user/:userId', protectedRoute, getUser);
router.put('/user/:userId', protectedRoute, updateUser);
router.delete('/user/:userId', protectedRoute, deleteUser);

//any route containing userid, will execute userbyID
router.param("userId", userById);

module.exports = router;

