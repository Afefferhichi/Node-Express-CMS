const Webpage = require('../../models/webpage');

const create = (req, res) => {
    const {
        wbpFollowers,
        wbpDescription,
    } = req.body;
    const wbpId = (+new Date()).toString();
    if (
        !wbpId ||
        !wbpFollowers ||
        !wbpDescription
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        const webpage = new Webpage({
            wbpId,
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