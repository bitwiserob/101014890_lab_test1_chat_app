const mongoose = require('mongoose');

const GroupMessageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    sent: {type: Date, default: Date.now},
    room: {
        type: String,
        required: true
    }
});



const GroupMessage = mongoose.model('GroupMessage', GroupMessageSchema);
module.exports = GroupMessage;