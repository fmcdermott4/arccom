const {Schema, model} = require('mongoose');

const accessSchema = new Schema({ 
    level:{
        type: String,
        required: true,
        trim: true
    }
});

const Access = model('Access', accessSchema);

module.exports = Access;