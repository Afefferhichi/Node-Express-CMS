const Comment = require('../../models/comment');

const list = (req, res) => {
    try {
        const condition = req.query;
        condition['postId'] = req.params.post_id;
        Comment.find(condition)
            .then(comments => {
                res.json({
                    success: true,
                    comments
                })
            })
            .catch(error => {
                res.json({error})
            });
    } catch (error) {
        res.status(400).json({error});
    }

};

const show = (req, res) => {
    try {
        Comment.findById(req.params.id)
            .then(comment => {
                res.json({
                    success: true,
                    comment
                })
            })
            .catch(error => {
                res.json({error})
            });
    } catch (error) {
        res.status(400).json({error});
    }

};


module.exports = {
    list, show
}