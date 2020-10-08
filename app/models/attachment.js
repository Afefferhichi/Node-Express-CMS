const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    originalname: { type: String, required: true },
    encoding: { type: String, default: ''},
    encoding: { type: String, default: ''},
    size: { type: Number, default: 0 },
    destination: { type: String },
});

module.exports = mongoose.model('Attachment', attachmentSchema);
