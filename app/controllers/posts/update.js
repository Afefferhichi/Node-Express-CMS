const Post = require('../../models/post');

const update = (req, res) => {
    const {
        pstOrder,
        pstTitle,
        pstContent,
        pstNumberOfLikes,
        pstNumberOfDislikes,
        attachmentIds,
        pstRate,
        createdBy,
        updatedBy
    } = req.body;
    if (
        !pstOrder ||
        !pstTitle ||
        !pstContent ||
        !pstNumberOfLikes ||
        !pstNumberOfDislikes ||
        !attachmentIds ||
        !pstRate ||
        !createdBy ||
        !updatedBy
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        try {
            Post.findByIdAndUpdate(req.params.id, {
                pstOrder,
                pstTitle,
                pstContent,
                pstNumberOfLikes,
                pstNumberOfDislikes,
                attachmentIds,
                pstRate,
                updatedAt: new Date(),
                createdBy,
                updatedBy
            })
                .then((post) => res.json({success: post !== null}))
                .catch(error => res.status(400).json({success: false, error}));
        } catch (error) {
            res.status(400).json({success: false, error});
        }
    }

};

module.exports = update;