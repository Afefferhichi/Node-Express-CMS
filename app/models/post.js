var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    "pstOrder": { type: String },
    "pstTitle": { type: String, required: true },
    "pstContent": { type: String, required: true },
    "pstNumberOfLikes": { type: Number, default: 0 },
    "pstNumberOfDislikes": { type: Number, default: 0 },
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
