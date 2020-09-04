const mongoose = require('mongoose');

const webpageSchema = new mongoose.Schema({
    wbpId: {
        type: String,
        required: true
    },
    wbpLocation: {
        type: String,
        required: true
    },
    wbpFollowers: {
        type: String,
        required: true
    },
    wbpDescription: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});
//,{ collection: 'webpages' });

module.exports = mongoose.model('Webpage', webpageSchema);
