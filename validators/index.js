exports.createPostValidator = (req, res, next) => {
  //title
  req.check('title', 'A title is required').notEmpty()
  req.check('title', 'Title must be between 4 to 150 characters').isLength({min: 4, max: 150});
  
  //body
  req.check('body', 'A body is required').notEmpty()
  req.check('body', 'Body must be between 4 to 2000 characters').isLength({min: 4, max: 150});

  //check for errors
  const errors = req.validationErrors();
  //get first error from all the errors
  if(errors){
      const firstError = errors.map(error => error.msg)[0]
      return res.status(400).json({error: firstError})
  }
  next();
};