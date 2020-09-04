const Template = require('../../models/template');

const create = (req, res) => {
    const {
        tplname,
        tplcategory,
        tpldescription,
    } = req.body;
    if (
        !tplname ||
        !tplcategory ||
        !tpldescription
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        const template = new Template({
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
            res.status(400).json({error});
        }
    }

};

module.exports = create;