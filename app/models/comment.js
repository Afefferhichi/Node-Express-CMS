const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    cmtValue: { type: String, required: true },
    cmtHelpfulCounts: { type: String },
    cmtUnhelpfulCounts: { type: String },
    cmtFlagCounts: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: String },
    updatedBy: { type: String },
    postId: { type: mongoose.Schema.Types.ObjectId }
});
//,{ collection: 'comments' });

module.exports = mongoose.model('Comment', commentSchema);
