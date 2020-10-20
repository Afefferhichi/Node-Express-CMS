const Post = require('../../models/post');
const Attachment = require('../../models/attachment');
const User = require('../../models/user');

const create = async (req, res) => {
    const {
        pstOrder,
        pstTitle,
        pstContent,
        pstNumberOfLikes,
        pstNumberOfDislikes,
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

        const post = new Post({
            pstOrder,
            pstTitle,
            pstContent,
            pstNumberOfLikes,
            pstNumberOfDislikes,
            pstRate,
            createdAt: new Date(),
            createdBy,
            updatedBy,
            attachments: [],
            author: await User.findById(req.user._id),
        });

        try {
            post.save(async (error, createdPost) => {
                if (error) {
                    res.json({ error })
                } else {
                    if (req.files && req.files.length > 0) {
                        try {
                            post.attachments = await Promise.all(req.files.map(async file => {
                                const attachment = new Attachment(file);
                                return (await attachment.save());
                            }));
                            await post.save();
                        } catch (error) {
                            console.log('error on saving attachment 2', error);
                        }
                    }
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