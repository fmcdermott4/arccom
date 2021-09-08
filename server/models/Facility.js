const {Schema, model} = require('mongoose');

const facilitySchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    }
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;