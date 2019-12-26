var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    player_creator: Number,
    player_admin: Number,
    created_at: Date,
    full: Boolean,
    persons : [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'Person'
        }
    ],
    updated_at: Date
}, { collection : 'team' });

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;
