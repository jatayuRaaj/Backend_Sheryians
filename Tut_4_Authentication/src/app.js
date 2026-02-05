const express = require('express');


const app = express();
app.use(express.json());

// app.get('/home', (req, res) => {
//     res.send('<h1>This is Home Page</h1>')
// })


module.exports = app;