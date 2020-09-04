const Webpage = require('../../models/webpage');

const deleteWebpage = (req, res) => {
    try {
        Webpage
            .findByIdAndDelete(req.params.id)
            .then((deletedWebpage) => {
                if (deletedWebpage) {
                    res.json({success: true, deletedWebpage})
                } else {
                    res.json({success: false, error_code: 'NO_EXIST'})
                }
            });
    } catch (error) {
        res.status(400).json({error});
    }
};

module.exports = deleteWebpage;