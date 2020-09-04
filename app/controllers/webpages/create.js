const Webpage = require('../../models/webpage');

const create = (req, res) => {
    const {
        wbpLocation,
        wbpFollowers,
        wbpDescription,
    } = req.body;
    const wbpId = (+new Date()).toString();
    if (
        !wbpId ||
        !wbpLocation ||
        !wbpFollowers ||
        !wbpDescription
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        const webpage = new Webpage({
            wbpId,
            wbpLocation,
            wbpFollowers,
            wbpDescription
        });
        try {
            webpage.save((error, createdWebpage) => {
                if (error) {
                    res.json({error})
                } else {
                    res.json({
                        createdWebpage,
                        success: true
                    })
                }
            })
        } catch (error) {
            res.status(400).json({error});
        }
    }

};

module.exports = create;