var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    "pstOrder": { type: String, required: true},
    "pstTitle": { type: String, required: true},
    "pstContent": { type: String, required: true},
    "pstNumberOfLikes": { type: String, required: true},
    "pstNumberOfDislikes": { type: String, required: true},
    "attachmentIds": { type: String, required: true},
    "pstRate": { type: String, required: true},
    "createdAt": { type: Date, default: Date.new},
    "updatedAt": { type: Date, default: Date.new},
    "createdBy": { type: String, required: true},
    "updatedBy": { type: String, required: true}
});
//,{ collection: 'users' });

module.exports = mongoose.model('Post', postSchema);
