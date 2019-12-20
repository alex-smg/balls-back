const express = require('express');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/sport');

const app = express();


//Middleware

// app.use('/posts', (req, res) => {
//     console.log('test'); 
// })

// routes

// app.get('/', (req, res) => {
//     res.send('Welcome');
// })

app.use('/', require('./routes/person'));

app.listen(3000);