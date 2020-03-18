let mongoose = require('mongoose');

let teamSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    player_creator: Number,
    player_admin: Number,
    updated_at: Date,
    full: Boolean,
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
