var mongoose = require('mongoose')

var DBSchema = mongoose.Schema({
  projectId: { type: String, required: true },
  projectName: { type: String, required: true },
  envName:String,
  branch: String,
  server: String,
  path: String,
  content: String,
  version: String,
  creator: String,
  createdTime: { type: Date, default: Date.now }
})

module.exports = DBSchema