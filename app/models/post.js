const mongoose = require('mongoose');
const Comment = require('./comment');
const Attachment = require('./attachment');

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
    "attachments": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachment"
    }],
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
    await Comment
        .find({ _id: { $in: doc.comments } })
        .then((comments) => comments.map(comment => comment.remove()))
    await Attachment
        .find({ _id: { $in: doc.attachments } })
        .then(attachments => attachments.map(attachment => attachment.remove()))
    next();
});

module.exports = mongoose.model('Post', postSchema);
