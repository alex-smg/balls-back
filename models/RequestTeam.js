let mongoose = require('mongoose');

let RequestTeamSchema = new mongoose.Schema({
    idTeam: Number,
    nameTeam: String,
    idApplicant: Number,
    idPlayer: Number,
    accepted: Boolean,
    refused: Boolean
}, { collection : 'request' });

let RequestTeam = mongoose.model('RequestTeam', RequestTeamSchema);

module.exports = RequestTeam;

