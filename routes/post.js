const express = require('express');
const {createPosts, getPosts, postsByUser} = require('../controllers/post');
const {protectedRoute} = require('../controllers/auth');
const {createPostValidator} = require('../validators');
const {userById} = require('../controllers/user');
const router = express.Router();

router.get('/post/all', getPosts);
router.post('/post/new/:id', protectedRoute, createPosts, createPostValidator);
router.get("/post/by/:id", protectedRoute, postsByUser);

//any route containing userid, will execute userbyID
router.param("id", userById);

module.exports = router;

