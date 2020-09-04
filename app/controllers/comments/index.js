const create = require('./create');
const deleteComment = require('./delete');
const {list, show} = require('./read');
const update = require('./update');

module.exports = {
    create,
    delete: deleteComment,
    list,
    show,
    update
}