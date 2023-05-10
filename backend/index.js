const app = require('./app');
const Database = require('./config/database');


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});