const express= require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config({path:'./config/config.env'})

//for getting form data cookies etc
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// importing routes 
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user') ;
//prefix routes
app.use('/api/v1',postRoutes)
app.use('/api/v1',userRoutes)


module.exports = app ;