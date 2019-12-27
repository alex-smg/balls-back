const express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser')



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
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
// parse application/json
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/person', require('./routes/person'));

app.use('/team', require('./routes/team'));

app.listen(3000);