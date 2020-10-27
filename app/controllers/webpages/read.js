const Webpage = require('../../models/webpage');

const list = (req, res) => {
  try {
    const condition = req.query;
    Webpage.find(condition)
      .then(webpages => {
        res.json({
          success: true,
          webpages
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
    Webpage.findById(req.params.id)
      .then(webpage => {
        res.json({
          success: true,
          webpage
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