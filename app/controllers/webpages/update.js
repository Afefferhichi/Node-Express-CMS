const Webpage = require('../../models/webpage');

const update = (req, res) => {
    const {
        wbpLocation,
        wbpFollowers,
        wbpDescription,
    } = req.body;
    if (
        !wbpLocation ||
        !wbpFollowers ||
        !wbpDescription
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        try {
            Webpage.findById(req.params.id)
                .then(webpage => {
                    webpage.wbpLocation = wbpLocation;
                    webpage.wbpFollowers = wbpFollowers;
                    webpage.wbpDescription = wbpDescription;
                    webpage.save()
                        .then(() => res.json({success: true, updatedWebpage: webpage}));
                })
                .catch(err => res.status(400).json({err: err}));

        } catch (error) {
            res.status(400).json({error});
        }
    }

};

module.exports = update;