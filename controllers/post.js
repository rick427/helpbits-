const Post = require('../models/Post');
const formidable = require('formidable');
const fs = require('fs');


exports.getPosts = async(req, res) => {
    try{
        const posts = await Post.find().populate("postedBy", "_id name")
           .select("_id title body")
        res.status(200).json(posts);
    }
    catch(err){
       console.error(err.message)
    }
};

exports.createPosts = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        if(err){
            return res.status(400).json({error: "Image could not be uploaded"})
        }

        let post = new Post(fields);
        req.profile.hash_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if(err){
                return res.status(400).json({error: err});
            }
            res.json(result);
        });
    });
}

exports.postsByUser = (req, res) => {
    Post.find({postedBy: req.profile._id})
          .populate("postedBy", "_id name")
          .sort("_created")
          .exec((err, posts) => {
              if(err){
                  return res.status(400).json({error: err});
              }
              res.json(posts);
          })
}

