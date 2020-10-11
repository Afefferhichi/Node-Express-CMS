const Comment = require('../../models/comment');
const Attachment = require('../../models/attachment');

const update = (req, res) => {
    const {
        cmtValue,
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
        try {
            Comment.findById(req.params.id)
                .then(comment => {
                    if (comment) {
                        comment.cmtValue = cmtValue;
                        comment.cmtFlagCounts = cmtFlagCounts;
                        comment.createdBy = createdBy;
                        comment.updatedBy = updatedBy;
                        comment.updatedAt = new Date();
                        comment.save(async (error, updatedComment) => {
                            if (error)
                                res.status(400).json({ success: false, error });
                            else {
                                try {
                                    if (req.files && req.files.length > 0) {
                                        await Attachment
                                            .find({ _id: { $in: updatedComment.attachments } })
                                            .then(attachments => attachments.map(attachment => attachment.remove()))
                                        updatedComment.attachments = await Promise.all(req.files.map(async file => {
                                            const attachment = new Attachment(file);
                                            return (await attachment.save());
                                        }));
                                    }
                                    updatedComment.save(async (error, updatedComment) => {
                                        if (error)
                                            res.status(400).json({ success: false, error });
                                        else {
                                            updatedComment.attachments = await Attachment.find({ _id: { $in: updatedComment.attachments } })
                                            res.json({ success: true, updatedComment })
                                        }
                                    });
                                } catch (error) {
                                    console.log('error on saving attachment 2', error);
                                    res.status(400).json({ success: false });
                                }
                            }
                        });
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