const create = require('./create');
const deletePost = require('./delete');
const {list, show} = require('./read');
const update = require('./update');

module.exports = {
    create,
    delete: deletePost,
    list,
    show,
    update
}