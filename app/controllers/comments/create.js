const Comment = require('../../models/comment');
const Post = require('../../models/post');
const Attachment = require('../../models/attachment');

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
                                post.save(async error => {
                                    if (error) {
                                        res.json({ error });
                                    } else {
                                        let comment2;
                                        if (req.files) {
                                            try {
                                                comment.attachments = await Promise.all(req.files.map(async file => {
                                                    const attachment = new Attachment(file);
                                                    return (await attachment.save());
                                                }));
                                                comment2 = await comment.save();
                                            } catch (error) {
                                                console.log('error on saving attachment 3', error);
                                            }
                                        }
                                        res.json({
                                            createdComment: comment2 || comment,
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