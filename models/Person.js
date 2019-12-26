var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    created_at: Date,
    roles: String,
    firstname: String,
    lastname: String,
    updated_at: Date
},{ collection : 'person' });

personSchema.virtual('teams', {
    ref: 'Team',
    localField: '_id',
    foreignField: 'types'
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;
