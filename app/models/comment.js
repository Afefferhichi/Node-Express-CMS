const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    cmtValue: { type: String, required: true },
    cmtHelpfulCounts: { type: String, required: true },
    cmtUnhelpfulCounts: { type: String, required: true },
    cmtFlagCounts: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
});
//,{ collection: 'comments' });

module.exports = mongoose.model('Comment', commentSchema);
