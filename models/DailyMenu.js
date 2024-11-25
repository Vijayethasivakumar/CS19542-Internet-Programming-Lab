const mongoose = require('mongoose');

const DailyMenuSchema = new mongoose.Schema({
    menuType: { type: String, required: true},
    menuName: { type: String, required: true},
    image: { type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', DailyMenuSchema);