const Comment = require('../../models/comment');

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
        const comment = new Comment({
            cmtValue,
            cmtHelpfulCounts,
            cmtUnhelpfulCounts,
            cmtFlagCounts,
            createdBy,
            updatedBy
        });
        try {
            comment.save((error, createdComment) => {
                if (error) {
                    res.json({error})
                } else {
                    res.json({
                        createdComment,
                        success: true
                    })
                }
            })
        } catch (error) {
            res.status(400).json({error});
        }
    }

};

module.exports = create;