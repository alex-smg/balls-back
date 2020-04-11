let mongoose = require('mongoose');

let RequestTeamSchema = new mongoose.Schema({
    idTeam : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Team'
        }
    ],
    nameTeam: String,
    idApplicant: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Person'
        }
    ],
    idPlayer: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Person'
        }
    ],
    accepted: Boolean,
    refused: Boolean
}, { collection : 'request' });

let RequestTeam = mongoose.model('RequestTeam', RequestTeamSchema);

module.exports = RequestTeam;

