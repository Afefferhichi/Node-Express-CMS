const Post = require('../../models/post');
const Attachment = require('../../models/attachment');

const create = async (req, res) => {
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
        !pstTitle ||
        !pstContent
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        let savedAttachment
        if (req.file) {
            try {
                const attachment = new Attachment(req.file);
                savedAttachment = (await attachment.save());
            } catch (error) {
                console.log('error on saving attachment', error);
            }
        }
        const post = new Post({
            pstOrder,
            pstTitle,
            pstContent,
            pstNumberOfLikes,
            pstNumberOfDislikes,
            attachmentIds,
            pstRate,
            createdAt: new Date(),
            createdBy,
            updatedBy,
            attachment: savedAttachment
        });
        try {
            post.save((error, createdPost) => {
                if (error) {
                    res.json({ error })
                } else {
                    res.json({
                        createdPost,
                        success: true
                    })
                }
            })
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

module.exports = create;