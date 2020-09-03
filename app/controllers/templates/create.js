const Template = require('../../models/template');

const create = (req, res) => {
    const {
        tplname,
        tplcategory,
        tpldescription,
    } = req.body;
    const tplId = (+new Date()).toString();
    if (
        !tplId ||
        !tplname ||
        !tplcategory ||
        !tpldescription
    ) {
        res.json({
            err: 'All fields are mandatory !'
        })
    } else {
        const template = new Template({
            tplId,
            tplname,
            tplcategory,
            tpldescription
        });
        try {
            template.save((error, createdTemplate) => {
                if (error) {
                    res.json({error})
                } else {
                    res.json({
                        createdTemplate,
                        success: true
                    })
                }
            })
        } catch (error) {
            res.status(400).send('Server Error: ' + error.toString());
        }
    }

};

module.exports = create;