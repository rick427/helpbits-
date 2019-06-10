const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');
const bodyParser = require('body-parser');
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

//middleware::routes
app.use('/', postRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server connected on port ${port}`));