const Comment = require('../../models/comment');

const deleteComment = (req, res) => {
    try {
        Comment
            .findByIdAndDelete(req.params.id)
            .then((deletedComment) => {
                if (deletedComment) {
                    res.json({success: true, deletedComment})
                } else {
                    res.json({success: false, error_code: 'NO_EXIST'})
                }
            });
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = deleteComment;