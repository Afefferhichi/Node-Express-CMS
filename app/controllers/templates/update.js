const Template = require('../../models/template');
const update = (req, res) => {
    const {
        name,
        category,
        description,
        html,
        design,
    } = req.body;
    if (
        !name ||
        !category ||
        !description
    ) {
        res.json({
            error: 'All fields are mandatory !'
        })
    } else {
        try {
            Template.findByIdAndUpdate(req.params.id, {
                name,
                category,
                description,
                html,
                design,
                updatedAt: new Date()
            })
                .then(template => res.json({ success: template !== null }))
                .catch(error => res.status(400).json({ error }));

        } catch (error) {
            res.status(400).json({ error });
        }
    }
};
module.exports = update;