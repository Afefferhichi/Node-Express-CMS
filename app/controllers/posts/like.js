const Post = require('../../models/post');

const like = (req, res) => {
    try {
        Post.findById(req.params.id)
            .then((post) => {
                if (post) {
                    let likeMethod = req.route.path;
                    likeMethod = likeMethod.substr(likeMethod.lastIndexOf('/') + 1)

                    let newLikes = post.pstNumberOfLikes;
                    let newDiskLikes = post.pstNumberOfDislikes;
                    if (likeMethod === 'like') {
                        newLikes++;
                        post.pstNumberOfLikes = newLikes;
                    }
                    else if (likeMethod === 'dislike') {
                        newDiskLikes++;
                        post.pstNumberOfDislikes = newDiskLikes;
                    }

                    post.save(error => {
                        if (error)
                            res.status(400).json({ success: false, error });
                        else
                            res.json({
                                success: true,
                                pstNumberOfLikes: newLikes,
                                pstNumberOfDislikes: newDiskLikes
                            });
                    });
                } else {
                    res.status(400).json({ success: false });
                }
            })
            .catch(error => res.status(400).json({ success: false, error }));
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

module.exports = like;