let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let personSchema = new mongoose.Schema({
    email: String,
    password: String,
    image: String,
    created_at: Date,
    roles: String,
    height: String,
    birth: Date,
    postPlayer: String,
    level: String,
    gender: String,
    club: String,
    firstname: String,
    lastname: String,
    updated_at: Date,
    teams : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Team'
        }
    ],
},{ collection : 'person' });

personSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

/*personSchema.virtual('teams', {
    ref: 'Team',
    localField: '_id',
    foreignField: 'types'
});*/

let Person = mongoose.model('Person', personSchema);

module.exports = Person;
