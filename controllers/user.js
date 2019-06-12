const User = require("../models/User");

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
  })
  res.json({users});
}