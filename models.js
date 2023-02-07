var User = mongoose.model('User', {
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    created: {type: Date, default: Date.now}
});

var GroupMessage = mongoose.model('GroupMessage', {
    message: String,
    sender: String,
    sent: {type: Date, default: Date.now},
    room: String
});

var PrivateMessage = mongoose.model('PrivateMessage', {
    message: String,
    sender: String,
    sent: {type: Date, default: Date.now},
    receiver: String
});