const Post = require('../../models/post');
const Comment = require('../../models/comment');

const deletePost = (req, res) => {
    try {
        Post
            .findById(req.params.id)
            .then(post => {
                if (post) {
                    try {
                        post.remove();
                        res.json({ success: true, deletedPost: post })
                    } catch (error) {
                        res.status(400).json({ error });
                    }
                } else {
                    res.json({ success: false, error_code: 'NO_EXIST' })
                }
            });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = deletePost;