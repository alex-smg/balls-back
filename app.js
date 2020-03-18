const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/balls');
mongoose.set('useFindAndModify', false);




var cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT'
    ],
    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));

app.use('/person', require('./routes/person'));
app.use('/team', require('./routes/team'));
app.use('/tournament', require('./routes/tournament'));

app.use('/upload', express.static('upload'));


app.listen(3000);
