const express = require('express');
const connectDB = require('../db/db');

connectDB();

const app = express();



module.exports = app;