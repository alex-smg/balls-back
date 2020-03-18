let mongoose = require('mongoose');

let sportSchema = new mongoose.Schema({
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

let Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
