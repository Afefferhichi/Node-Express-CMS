const Post = require('../../models/post');
const Attachment = require('../../models/attachment');

const update = (req, res) => {
    const {
        pstOrder,
        pstTitle,
        pstContent,
        pstRate,
        createdBy,
        updatedBy
    } = req.body;
    if (
        !pstTitle ||
        !pstContent
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        try {
            Post.findById(req.params.id)
                .then(async (post) => {
                    if (post) {
                        post.pstOrder = pstOrder;
                        post.pstTitle = pstTitle;
                        post.pstContent = pstContent;
                        post.pstRate = pstRate;
                        post.updatedAt = new Date();
                        post.updatedBy = updatedBy;
                        post.createdBy = createdBy;
                        try {
                            if (req.files && req.files.length > 0) {
                                await Attachment
                                    .find({ _id: { $in: post.attachments } })
                                    .then(attachments => attachments.map(attachment => attachment.remove()))
                                post.attachments = await Promise.all(req.files.map(async file => {
                                    const attachment = new Attachment(file);
                                    return (await attachment.save());
                                }));
                            }
                            post.save(async (error, updatedPost) => {
                                if (error)
                                    res.status(400).json({ success: false, error });
                                else {
                                    updatedPost.attachments = await Attachment.find({_id: {$in: updatedPost.attachments}})
                                    res.json({ success: true, updatedPost })
                                }
                            });
                        } catch (error) {
                            console.log('error on saving attachment 2', error);
                            res.status(400).json({ success: false });
                        }
                    } else {
                        res.status(400).json({ success: false });
                    }
                })
                .catch(error => res.status(400).json({ success: false, error }));
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

};

module.exports = update;