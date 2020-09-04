const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    tplname: {
        type: String,
        required: true
    },
    tplcategory: {
        type: String,
        required: true
    },
    tpldescription: {
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
//,{ collection: 'templates' });

module.exports = mongoose.model('Template', templateSchema);
