var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    postName: {
        type: String
    },
    type: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }



});
//,{ collection: 'users' });

module.exports = mongoose.model('Post', postSchema);
