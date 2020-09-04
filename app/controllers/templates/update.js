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
            error: 'All fields are mandatory !'
        })
    } else {
        try {
            Template.findByIdAndUpdate(req.params.id, {
                tplname,
                tplcategory,
                tpldescription,
                updatedAt: new Date()
            })
                .then(template => res.json({success: template !== null}))
                .catch(error => res.status(400).json({error}));

        } catch (error) {
            res.status(400).json({error});
        }
    }
};
module.exports = update;