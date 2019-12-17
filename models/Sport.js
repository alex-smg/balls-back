var mongoose = require('mongoose');

var sportSchema = new mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    regles: [
        {
            nrbJouers: Number,
            land: String
        }
    ]
});

var Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
