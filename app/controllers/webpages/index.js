const create = require('./create');
const deleteWebpage = require('./delete');
const {list, show} = require('./read');
const update = require('./update');

module.exports = {
    create,
    delete: deleteWebpage,
    list,
    show,
    update
}