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
    //console.log("creating POST: ", req.body);
    post.save((err, post) => {
        if(err) res.status(400).json({error: err});

        res.status(200).json({post});
    });
}

