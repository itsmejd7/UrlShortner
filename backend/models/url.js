const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortcode: { type: String, required: true, unique: true },
    longurl: { type: String, required: true },
    visitcount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Url', urlSchema);
