const Post = require('../../models/post');

const deletePost = (req, res) => {
    try {
        Post
            .findByIdAndDelete(req.params.id)
            .then((deletedPost) => {
                if (deletedPost) {
                    res.json({success: true, deletedPost})
                } else {
                    res.json({success: false, error_code: 'NO_EXIST'})
                }
            });
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = deletePost;