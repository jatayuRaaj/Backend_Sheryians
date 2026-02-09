const express = require('express');
const authRoutes = require('../routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRoutes = require('../routes/post.routes');


const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);    // when we need to access the api we will write api/auth/controllersName
app.use("/api/auth", postRoutes);


module.exports = app;