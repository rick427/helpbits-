const express = require('express');
const {createPosts, getPosts} = require('../controllers/post');
const {protectedRoute} = require('../controllers/auth');
const {createPostValidator} = require('../validators');
const {userById} = require('../controllers/user');
const router = express.Router();

router.get('/post/all', getPosts);
router.post('/post', protectedRoute, createPostValidator, createPosts);

//any route containing userid, will execute userbyID
router.param("userId", userById);

module.exports = router;

