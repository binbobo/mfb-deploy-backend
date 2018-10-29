var mongoose = require('mongoose')

var DBSchema = mongoose.Schema({
  username: { type: String, required: true, unique : true },
  password: { type: String, required: true },
  createdTime: { type: Date, default: Date.now },
  nickname: String,
  email: { type: String, required: true }
})

module.exports = DBSchema