const express= require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({path:'./config/config.env'})

//for getting form data cookies etc
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(cookieParser());


// importing routes 
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user') ;
//prefix routes
app.use('/api/v1',postRoutes)
app.use('/api/v1',userRoutes)

// production env
app.use(express.static(path.join(__dirname, "./client/build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

module.exports = app ;