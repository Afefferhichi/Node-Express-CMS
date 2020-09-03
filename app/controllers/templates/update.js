const Template = require('../../models/template');

const update = (req, res) => {
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
            err: 'All fields are mandatory !'
        })
    } else {
        try {
            Template.findById(req.params.id)
                .then(template => {
                    template.tplname = tplname;
                    template.tplcategory = tplcategory;
                    template.tpldescription = tpldescription;
                    template.save()
                        .then(() => res.json({success: true, updatedTemplate: template}));
                })
                .catch(err => res.status(400).json({err: err}));

        } catch (error) {
            res.status(400).json({error});
        }
    }

};

module.exports = update;