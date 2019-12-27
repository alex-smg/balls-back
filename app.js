const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sport');

var cors = require('cors');
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

app.use('/person', require('./routes/person'));
app.use('/team', require('./routes/team'));


app.listen(3000);