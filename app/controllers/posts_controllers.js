const Post = require('../models/post');

const posts = (req, res) => {
    const condition = req.query.type === 'new' ? {type: 'new'} : {};
    Post.where(condition)
        .then(posts => {
            res.json({
                success: true,
                data: posts.length
            })
        })
        .catch(reason => {
            res.json({err: reason})
        });
};


const posts_controller = {
    posts
};


module.exports = posts_controller;