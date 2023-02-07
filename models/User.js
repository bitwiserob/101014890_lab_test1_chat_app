const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname: String,
    lastname: String,
    password:{
        type: String,
        required: true
    },

    created: {type: Date, default: Date.now}
});


const User = mongoose.model('User', UserSchema);
module.exports = User;