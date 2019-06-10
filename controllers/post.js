const Post = require('../models/Post');


exports.getPosts = async(req, res) => {
    try{
        const posts = await Post.find().select("_id title body");
        res.status(200).json(posts);
    }
    catch(err){
       console.error(err.message)
    }
};

exports.createPosts = async(req, res) => {
    try{
      const post = new Post(req.body);
      await post.save();
      res.status(200).json(post);
    }
    catch(err){
     console.error(err.message);
    }
}

