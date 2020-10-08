const Post = require('../../models/post');
const Comment = require('../../models/comment');

const deletePost = (req, res) => {
    try {
        Post
            .findByIdAndDelete(req.params.id)
            .then((deletedPost) => {
                if (deletedPost) {
                    try {
                        deletedPost.comments.map(async comment_id => {
                            await Comment.findByIdAndDelete(comment_id);
                        })
                        res.json({ success: true, deletedPost })
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