const mongoose = require('mongoose')
const DBSchema = require('../models/history')
const {requestHandler} = require('../utils/db')
const config = require('../config/statusCode')
// Doc Ref
var DBModel = mongoose.model('History', DBSchema)

const add = function (req, res) {
  const {creator} = req.body
  // 默认为当前登录用户
  if (!creator) req.body.creator = 'wangbin'
  // 创建一个构建记录
  new DBModel(req.body).save(function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，操作失败')
    return  requestHandler(res, config.SUCCESS, '操作成功')
  })
}

// 获取所有服务器列表
const list = function (req, res) {
  const {projectId} = req.body
  DBModel.find({projectId}, function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询列表失败')
    return requestHandler(res, config.SUCCESS, '查询列表成功', {
      result: data,
      total: data.length
    })
  })
}

module.exports = {
  list,
  add
}