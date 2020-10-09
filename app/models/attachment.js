const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    encoding: { type: String, default: ''},
    mimetype: { type: String, default: ''},
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, default: 0 },
});

module.exports = mongoose.model('Attachment', attachmentSchema);
