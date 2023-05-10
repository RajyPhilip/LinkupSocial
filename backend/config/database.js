
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection ;

db.on('error',console.error.bind(console,"ERROR CONNECTING TO DATABASE"));
db.once('open', function(){
    console.log("Successfully connected to database:: MongoDB");
});

module.exports=db ; 