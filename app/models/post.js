var mongoose = require('mongoose');

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
    "attachmentIds": { type: String },
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
//,{ collection: 'users' });

module.exports = mongoose.model('Post', postSchema);
