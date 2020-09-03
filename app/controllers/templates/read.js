const Template = require('../../models/template');

const list = (req, res) => {
    try {
        const condition = req.query;
        Template.find(condition)
            .then(templates => {
                res.json(templates)
            })
            .catch(error => {
                res.json({error})
            });
    } catch (error) {
        res.status(400).json({error});
    }

};

const show = (req, res) => {
    try {
        Template.findById(req.params.id)
            .then(template => {
                res.json(template)
            })
            .catch(error => {
                res.json({error})
            });
    } catch (error) {
        res.status(400).json({error});
    }

};


module.exports = {
    list, show
}