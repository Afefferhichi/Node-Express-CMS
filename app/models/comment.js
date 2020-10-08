const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    cmtValue: { type: String, required: true },
    cmtHelpfuls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    cmtUnHelpfuls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    cmtFlagCounts: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: String },
    updatedBy: { type: String },
    postId: { type: mongoose.Schema.Types.ObjectId }
});
//,{ collection: 'comments' });

module.exports = mongoose.model('Comment', commentSchema);
