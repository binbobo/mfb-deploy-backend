
const mongoose = require('mongoose');
const DBSchema = require('../models/project');
const {requestHandler} = require('../utils/db')
const config = require('../config/statusCode')
// Doc Ref
var DBModel = mongoose.model('Project', DBSchema);

const add = function(req, res) {
  // 校验字段
  const {name, repo, creator} = req.body
  if (!name) {
    return requestHandler(res, config.PARAMS_ERR, '项目名称不能为空')
  }
  if (typeof repo !== 'object') {
    return requestHandler(res, config.PARAMS_ERR, '仓库信息不能为空')
  } else {
    const {repoType, repoUrl} = repo
    if (!repoType) {
      return requestHandler(res, config.PARAMS_ERR, '仓库类型不能为空')
    }
    if (!repoUrl) {
      return requestHandler(res, config.PARAMS_ERR, '仓库地址不能为空')
    }
  }

  // 默认创建用户
  if (!creator) req.body.creator = 'wangbin'
  // 初始成员为创建用户
  req.body.member = [req.body.creator]

  new DBModel(req.body).save(function (err, result) {
    if (err) {
      return requestHandler(res, config.DB_ERR, '数据库错误，保存失败')
    }
    return requestHandler(res, config.SUCCESS, '添加成功', result)
  })
}

// 获取所有服务器列表
const list = function (req, res) {
  DBModel.find({}, function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询列表失败')
    return requestHandler(res, config.SUCCESS, '查询列表成功', {
      total: data.length,
      result: data
    })
  });
};

const info = function (req, res) {
  const {projectId} = req.query
  if (!projectId) return requestHandler(res, config.PARAMS_ERR, '请求参数错误')

  DBModel.findOne({_id:projectId}, function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询失败')
    return requestHandler(res, config.SUCCESS, '查询成功', {
      total: data.length,
      result: data
    })
  });
};

module.exports = {
  add,
  list,
  info
}