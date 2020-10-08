const Comment = require('../../models/comment');

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
                        comment.save((error, updatedComment) => {
                            if (error)
                                res.status(400).json({ success: false, error });
                            else
                                res.json({ success: true, updatedComment })
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