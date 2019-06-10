const User = require('../models/User');

exports.signup = async (req, res) => {
  const userExists = await User.findOne({email: req.body.email});

  if(userExists) {
    return res.status(403).json({error: "Email is already taken"});
  }

  const newUser = await new User(req.body);
  
  await newUser.save();
  res.status(200).json({response: "SignUp Successful!... Please login "});
}