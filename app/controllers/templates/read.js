const Template = require('../../models/template');

const list = (req, res) => {
  try {
    const condition = req.query;
    if (req.user.role !== "admin") {
      condition['enabled'] = true;
    }
    Template.find(condition)
      .then(templates => {
        res.json({
          success: true,
          templates,
        })
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
        res.json({
          success: true,
          template
        })
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
