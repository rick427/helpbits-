const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')
const dotenv = require('dotenv');
dotenv.config();

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
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error: "Unauthorized.."});
    }
});

//middleware :: routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

app.use('/', postRoutes);
app.use('/', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server connected on port ${port}`));