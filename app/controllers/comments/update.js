const Comment = require('../../models/comment');

const update = (req, res) => {
    const {
        cmtValue,
        cmtFlagCounts,
        createdBy,
        updatedBy
    } = req.body;
    if (
        !cmtValue ||
        !cmtHelpfulCounts ||
        !cmtUnhelpfulCounts ||
        !cmtFlagCounts ||
        !createdBy ||
        !updatedBy
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        try {
            Comment.findByIdAndUpdate(req.params.id, {
                cmtValue,
                cmtFlagCounts,
                createdBy,
                updatedBy,
                updatedAt: new Date()
            })
                .then(comment => res.json({success: comment !== null}))
                .catch(error => res.status(400).json({success: false, error}));
        } catch (error) {
            res.status(400).json({success: false, error});
        }
    }

};

module.exports = update;