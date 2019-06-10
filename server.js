const express = require('express');
const morgan = require('morgan');
const {getPosts} = require('./routes/post');

const app = express();

const middleware = (req, res, next) => {
    console.log('middleware applied');
    next();
}

//middlewares
app.use(morgan("dev"));
app.use(middleware);

//routes
app.get('/', getPosts);

const port = 5000;
app.listen(port, () => console.log(`Server connected on port ${port}`));