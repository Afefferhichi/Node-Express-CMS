const Post = require('../../models/post');

const update = (req, res) => {
    const {
        pstOrder,
        pstTitle,
        pstContent,
        attachmentIds,
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
                .then((post) => {
                    post.pstOrder = pstOrder;
                    post.pstTitle = pstTitle;
                    post.pstContent = pstContent;
                    post.attachmentIds = attachmentIds;
                    post.pstRate = pstRate;
                    post.updatedAt = new Date();
                    post.updatedBy = updatedBy;
                    post.createdBy = createdBy;
                    post.save((error, updatedPost) => {
                        if (error)
                            res.status(400).json({ success: false, error });
                        else
                            res.json({ success: true, updatedPost })
                    })
                })
                .catch(error => res.status(400).json({ success: false, error }));
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

};

module.exports = update;