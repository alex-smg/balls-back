let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tournamentSchema = new mongoose.Schema({
    name: String,
    description: String,
    addressLocality: String,
    addressRegion: String,
    postalCode: String,
    streetAddress: String,
    codeRegion: String,
    lattitude: Number,
    longitude: Number,
    image: String,
    date_begin: Date,
    date_end: Date,
    date_end_inscription: Date,
    widthTeam: Number,
    gender: String,
    numberTeam: Number,
    level: String,
    typeOfHen: String,
    publish: Boolean,
    full: Boolean,
    creator:
    {
        type: mongoose.Types.ObjectId,
        ref: 'Person'
    },
    admin: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Person'
        }
    ],
    teams : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Team'
        }
    ],
    created_at: Date,
    updated_at: Date
}, { collection : 'tournament' });

let Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
