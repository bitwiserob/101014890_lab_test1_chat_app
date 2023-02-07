const mongoose = require('mongoose');

const PrivateMessageSchema = mongoose.Schema({
    message: String,
    sender: String,
    sent: {type: Date, default: Date.now},
    receiver: String
});



const PrivateMessage = mongoose.model('PrivateMessage', PrivateMessageSchema);
module.exports = PrivateMessage;