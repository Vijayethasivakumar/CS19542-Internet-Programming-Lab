const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    userName: { type: String, required: true},
    password: { type: String, required: true},
    isAdmin: { type: String}
});

module.exports = mongoose.model('login', LoginSchema);