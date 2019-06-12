const Post = require('../models/Post');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');


exports.postById = (req, res, next, id) => {
    Post.findById(id)
       .populate("postedBy", "_id name")
       .exec((err, post) => {
           if(err || !post){
               return res.status(400).json({error: err});
           }
           req.post = post;
           next();
       });
}


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


exports.isAuthorized = (req, res, next) => {
    let isposter = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if(!isposter){
        return res.status(403).json({error: "User is not authorized to this action"})
    }
    next();
};


exports.updatePosts = (req, res) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();

    post.save(err => {
        if(err){
            return res.status(400).json({error: err});
        }
        res.json(post);
    });
}


exports.deletePost = (req, res) => {
    let post = req.post
    post.remove((err, post) => {
        if(err){
            return res.status(400).json({error: err});
        }
        res.json({msg: "Post successfully deleted"});
    })
}


