const express = require('express');
const {
    createPosts, 
    getPosts, 
    postsByUser, 
    postById, 
    isAuthorized, 
    deletePost,
    updatePosts
} = require('../controllers/post');
const {protectedRoute} = require('../controllers/auth');
const {createPostValidator} = require('../validators');
const {userById} = require('../controllers/user');
const router = express.Router();

router.get('/post/all', getPosts);
router.post('/post/new/:userId', protectedRoute, createPosts, createPostValidator);
router.get("/post/by/:userId", protectedRoute, postsByUser);
router.delete("/post/:postId", protectedRoute, isAuthorized, deletePost );
router.put("/post/:postId", protectedRoute, isAuthorized, updatePosts );

//any route containing userid, will execute userbyID
router.param("userId", userById);
router.param("postId", postById)

module.exports = router;

