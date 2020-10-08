const Comment = require('../../models/comment');
const Post = require('../../models/post');

const deleteComment = (req, res) => {
    try {
        Comment
            .findByIdAndDelete(req.params.id)
            .then((deletedComment) => {
                console.log('deleteComment', deletedComment, req.params.id);
                if (deletedComment) {
                    Post
                        .findById(deletedComment.postId)
                        .then(post => {
                            if (post) {
                                const existingIndex = post.comments.indexOf(deletedComment._id);
                                if (existingIndex > -1) {
                                    const originalComments = [...post.comments];
                                    originalComments.splice(existingIndex, 1);
                                    post.comments = originalComments;
                                    post.save();
                                }
                            }
                        })
                    res.json({ success: true, deletedComment })
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