const create = require("./create");
const deleteContactMessage = require("./delete");
const {list, show} = require("./read");
const update = require("./update");

module.exports = {
  name: "contact_messages",
  create,
  delete: deleteContactMessage,
  list,
  show,
  update,
};
