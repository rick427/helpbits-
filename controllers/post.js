const Post = require('../models/Post');


exports.getPosts = (req, res) => {
    const posts = Post.find().select("_id title body")
      .then(posts => {
          res.status(200).json(posts)
      })
      .catch(err => console.log(err));
};

exports.createPosts = (req, res) => {
    const post = new Post(req.body);

    post.save().then(post => {
        res.status(200).json({post})
    });
}

