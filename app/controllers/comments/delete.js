const comment = require('../../models/comment');
const Comment = require('../../models/comment');
const Post = require('../../models/post');

const deleteComment = (req, res) => {
    try {
        Comment
            .findById(req.params.id)
            .then(async comment => {
                if (comment) {
                    const post = await Post.findById(comment.postId)
                    if (post) {
                        const existingIndex = post.comments.indexOf(comment._id);
                        if (existingIndex > -1) {
                            const originalComments = [...post.comments];
                            originalComments.splice(existingIndex, 1);
                            post.comments = originalComments;
                            await post.save();
                        }
                    }
                    try {
                        comment.remove();
                        res.json({ success: true, deletedComment: comment })
                    } catch (error) {
                        res.status(400).json({ error });
                    }
                } else {
                    res.json({ success: false, error_code: 'NO_EXIST' })
                }
            })
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = deleteComment;