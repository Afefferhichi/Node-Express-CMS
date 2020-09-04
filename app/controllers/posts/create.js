const Post = require('../../models/post');

const create = (req, res) => {
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
        const post = new Post({
            pstOrder,
            pstTitle,
            pstContent,
            pstNumberOfLikes,
            pstNumberOfDislikes,
            attachmentIds,
            pstRate,
            createdBy,
            updatedBy
        });
        try {
            post.save((error, createdPost) => {
                if (error) {
                    res.json({error})
                } else {
                    res.json({
                        createdPost,
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