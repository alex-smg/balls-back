let mongoose = require('mongoose');

let addressSchema = new mongoose.Schema({
    addressLocality: String,
    addressRegion: String,
    postalCode: String,
    streetAddress: String,
    created_at: Date,
}, { collection : 'address' });

let Address = mongoose.model('Address', addressSchema);

module.exports = Address;
