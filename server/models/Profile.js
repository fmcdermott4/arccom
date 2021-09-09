const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    access: {
        type: Schema.Types.ObjectId,
        ref: "Access"
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }  
});

// pre-save middleware to update password
profileSchema.pre('findOneAndUpdate', async function () {    
        let data = this.getUpdate();
        if(data.password){
            const saltRounds = 10;    
            data.password = await bcrypt.hash(data.password, saltRounds);
        }        
});

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});


// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;