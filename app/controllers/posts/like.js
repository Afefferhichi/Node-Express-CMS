const Post = require('../../models/post');

const like = (req, res) => {
    try {
        Post.findById(req.params.id)
            .then((post) => {
                if (post) {
                    let likeMethod = req.route.path;
                    likeMethod = likeMethod.substr(likeMethod.lastIndexOf('/') + 1)
                    if (likeMethod === 'like')
                        post.pstNumberOfLikes = (post.pstNumberOfLikes || 0) + 1;
                    else if (likeMethod === 'dislike')
                        post.pstNumberOfLikes = (post.pstNumberOfLikes || 0) - 1;

                    post.save(error => {
                        if (error)
                            res.status(400).json({ success: false, error });
                        else
                            res.json({ success: true, pstNumberOfLikes: post.pstnumberoflikes });
                    });
                } else {

                }
            })
            .catch(error => res.status(400).json({ success: false, error }));
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

module.exports = like;