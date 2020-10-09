var mongoose = require('mongoose');
const Comment = require('./comment');

const postSchema = new mongoose.Schema({
    "pstOrder": { type: String },
    "pstTitle": { type: String, required: true },
    "pstContent": { type: String, required: true },
    "pstLikes": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    "pstDislikes": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    "attachment": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachment"
    },
    "pstRate": { type: String },
    "createdAt": { type: Date, default: Date.new },
    "updatedAt": { type: Date, default: Date.new },
    "createdBy": { type: String },
    "updatedBy": { type: String },
    "comments": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

postSchema.post('remove', async (doc, next) => {
    await Comment.deleteMany({ _id: { $in: doc.comments } });
    next();
});

module.exports = mongoose.model('Post', postSchema);
