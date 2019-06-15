const express = require('express');
const {
    userById, 
    allUsers, 
    getUser, 
    userPhoto, 
    updateUser, 
    deleteUser,
    addFollowing,
    addFollower
} = require('../controllers/user');
const {protectedRoute} = require('../controllers/auth');
const router = express.Router();

router.put('/user/follow', protectedRoute, addFollowing, addFollower)
router.get('/users', allUsers);
router.get('/user/:userId', protectedRoute, getUser);
router.put('/user/:userId', protectedRoute, updateUser);
router.delete('/user/:userId', protectedRoute, deleteUser);
router.get("/user/photo/:userId", userPhoto)

//any route containing userid, will execute userbyID
router.param("userId", userById);

module.exports = router;

