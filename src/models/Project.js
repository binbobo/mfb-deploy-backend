var mongoose = require('mongoose')

var DBSchema = mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  createdTime: { type: Date, default: Date.now },
  creator: { type: String, required: true },
  member: [String],
  env: [{
    server: String,
    name: String
  }],
  repo: {
    // type 是关键字  不能用作字段名称
    repoType: String,
    repoUrl:  String
  }
})

module.exports = DBSchema