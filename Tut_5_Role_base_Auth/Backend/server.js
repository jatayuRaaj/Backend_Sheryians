const connectDB = require('./db/db');
const app = require('./src/app');
require('dotenv').config();


connectDB();

app.listen(3000, ()=>{
    console.log("server is running at 3000");
})
