const express = require('express');
const {createPosts, getPosts} = require('../controllers/post');
const {createPostValidator} = require('../validators');
const router = express.Router();

router.get('/allPosts', getPosts);
router.post('/post', createPostValidator, createPosts);

module.exports = router;

