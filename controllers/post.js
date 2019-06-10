const Post = require('../models/Post');

exports.getPosts = (req, res) => {
    res.json({
        posts: [
            {title: 'first post'},
            {title: 'second post'}
        ]
    });
};

exports.createPosts = (req, res) => {
    const post = new Post(req.body);

    post.save().then(post => {
        res.status(200).json({post})
    });
}

