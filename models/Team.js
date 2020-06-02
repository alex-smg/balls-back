let mongoose = require('mongoose');

let teamSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    player_creator: {
        type: mongoose.Types.ObjectId,
        ref: 'Person'
    },
    player_admin: {
        type: mongoose.Types.ObjectId,
        ref: 'Person'
    },
    updated_at: Date,
    full: Boolean,
    nbrPlayer: Number,
    searchPlayer: Boolean,
    persons : [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'Person'
        }
    ],
    tournaments : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Tournaments'
        }
    ],
}, { collection : 'team' });

let Team = mongoose.model('Team', teamSchema);

module.exports = Team;
