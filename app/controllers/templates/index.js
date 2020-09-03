const create = require('./create');
const deleteTemplate = require('./delete');
const {list, show} = require('./read');
const update = require('./update');

module.exports = {
    create,
    delete: deleteTemplate,
    list,
    show,
    update
}