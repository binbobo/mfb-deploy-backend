var mongoose = require('mongoose')

var DBSchema = mongoose.Schema({
  ip: String,
  username: String,
  pwd: String,
  deployPathList: [String]
})

module.exports = DBSchema