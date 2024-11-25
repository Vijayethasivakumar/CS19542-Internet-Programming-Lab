const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    Menuid : { type: String, required: true},
    ratings : { type: Number, required: true},
    Comments : { type: String, required: true},
    submitedBy: { type: String},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', RatingSchema);