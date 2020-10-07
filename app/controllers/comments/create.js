const Comment = require('../../models/comment');
const Post = require('../../models/post');

const create = (req, res) => {
    const {
        cmtValue,
        cmtHelpfulCounts,
        cmtUnhelpfulCounts,
        cmtFlagCounts,
        createdBy,
        updatedBy
    } = req.body;
    if (
        !cmtValue
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        Post.findById(req.params.post_id)
            .then(post => {
                const comment = new Comment({
                    cmtValue,
                    cmtHelpfulCounts,
                    cmtUnhelpfulCounts,
                    cmtFlagCounts,
                    createdBy,
                    updatedBy,
                    postId: post._id
                });
                try {
                    comment.save((error, createdComment) => {
                        if (error) {
                            res.json({ error })
                        } else {
                            post.comments = post.comments.concat(createdComment._id);
                            try {
                                post.save(error => {
                                    if (error) {
                                        res.json({ error });
                                    } else {
                                        res.json({
                                            createdComment,
                                            success: true
                                        });
                                    }
                                });
                            } catch (error) {
                                res.status(400).json({ error });
                            }
                        }
                    })
                } catch (error) {
                    res.status(400).json({ error });
                }
            })
            .catch(error => res.status(400).json({ success: false, error }));
    }

};

module.exports = create;