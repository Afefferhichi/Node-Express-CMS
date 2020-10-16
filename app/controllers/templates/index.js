const create = require('./create');
const deleteTemplate = require('./delete');
const {list, show} = require('./read');
const update = require('./update');
const setEnabled = require('./setEnabled');
const makeInUse = require('./makeInUse');

module.exports = {
    create,
    delete: deleteTemplate,
    list,
    show,
    update,
    setEnabled,
    makeInUse
}