var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    "pstOrder": { type: String},
    "pstTitle": { type: String, required: true},
    "pstContent": { type: String, required: true},
    "pstNumberOfLikes": { type: String},
    "pstNumberOfDislikes": { type: String},
    "attachmentIds": { type: String},
    "pstRate": { type: String},
    "createdAt": { type: Date, default: Date.new},
    "updatedAt": { type: Date, default: Date.new},
    "createdBy": { type: String},
    "updatedBy": { type: String}
});
//,{ collection: 'users' });

module.exports = mongoose.model('Post', postSchema);
