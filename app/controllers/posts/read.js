const Post = require('../../models/post');

const list = (req, res) => {
    try {
        const condition = req.query;
        Post.find(condition)
            .populate('comments', 'cmtValue cmtHelpfuls cmtUnHelpfuls postId _id')
            .then(posts => {
                res.json({
                    success: true,
                    posts
                })
            })
            .catch(error => {
                res.json({ error })
            });
    } catch (error) {
        res.status(400).json({ error });
    }

};

const show = (req, res) => {
    try {
        Post.findById(req.params.id)
            .populate('comments', 'cmtValue cmtHelpfuls cmtUnHelpfuls postId _id')
            .then(post => {
                res.json({
                    success: true,
                    post
                })
            })
            .catch(error => {
                res.json({ error })
            });
    } catch (error) {
        res.status(400).json({ error });
    }

};


module.exports = {
    list, show
}