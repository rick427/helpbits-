const express = require('express');
const {createPosts, getPosts} = require('../controllers/post');
const {protectedRoute} = require('../controllers/auth');
const {createPostValidator} = require('../validators');
const router = express.Router();

router.get('/post/all', protectedRoute, getPosts);
router.post('/post', createPostValidator, createPosts);

module.exports = router;

