const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config()


//Register
exports.signup = async (req, res) => {
  const userExists = await User.findOne({email: req.body.email});

  if(userExists) {
    return res.status(403).json({error: "Email is already taken"});
  }

  const newUser = await new User(req.body);
  
  await newUser.save();
  res.status(200).json({response: "SignUp Successful!... Please login "});
}


//Login 
exports.signin = async (req, res) => {
  //find the user based on email
  const { email, password} = req.body;
  await User.findOne({email}, (err, user) => {
    try{
       if(err || !user){
         return res.status(401).json({error: "User with that email doesnt exists. SignIn.."})
       }

       //create authenticate method in model and use here
       if(!user.authenticate(password)){
         return res.status(401).json({error: "Incorrect Password.."})
       }

       //generate a token
       const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

       //persist the token with 't' in cookies with expiry date
       res.cookie("t", token, {expire: new Date() + 9999})

       //return response with user and token to the frontend client
       const {_id, name, email} =  user;
       return res.json({token, user:{_id, email, name}});
    }
    catch(err){
       console.log(err.message);
    }
  })
}


//logout
exports.logout = (req, res) => {
  res.clearCookie('t');
  return res.json({message: "SignOut Successful!..."});
};


exports.protectedRoute = expressJwt({
   secret: process.env.JWT_SECRET  
})