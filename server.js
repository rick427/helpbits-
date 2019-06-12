const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require("fs");
require('dotenv').config();

const app = express();

//Db connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
   console.log('Db Connected');
})

mongoose.connection.on('error', err => {
    console.log(`Database connection error: ${err.message}`)
})

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());


//middleware :: routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Unauthorized...No token found');
    }
  });
//serving api docs to route /
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err){
      return res.status(400).json({error: err});
    }
    const docs = JSON.parse(data);
    res.json(docs);
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server connected on port ${port}`));