const User = require("../models/User");
const _ = require('lodash');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
     if(err || !user){
         return res.status(400).json({error: "user not found"})
     }
     req.profile = user
     next();
  })
};


exports.isAuthorized = (req,res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if(!authorized){
    return res.status(403).json({error: "User is not authorized to this action"})
  }
};


exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if(err){
      res.status(400).json({error: err})
    }
    res.json(users);
  }).select("name email updated created")
}


exports.getUser = (req, res) => {
  req.profile.hash_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}


exports.updateUser = (req, res) => {
    let user = req.profile;
    user = _.extend(user, req.body) // mutate the source object ie user
    user.updated = Date.now();

    user.save(err => {
      if(err){
        return res.status(400).json({error: "You are not authorized to perform this action"})
      }
      user.hash_password = undefined;
      user.salt = undefined;
      res.json({user});
    });
}


exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err , user) => {
    if(err){
      return res.status(400).json({err})
    }
    user.hash_password = undefined;
    user.salt = undefined;
    res.json({msg: "User " + user.name + " has been deleted"});
  })
}