
const mongoose = require('mongoose');
const DBSchema = require('../models/server');
const {requestHandler} = require('../utils/db')
const config = require('../config/statusCode')
// Doc Ref
var DBModel = mongoose.model('Server', DBSchema);

const add = function(req, res) {
  // 校验字段
  const {ip, username, pwd, deployPathList} = req.body
  if (!ip) {
    return requestHandler(res, config.PARAMS_ERR, '服务器IP地址不能为空')
  }
  if (!username) {
    return requestHandler(res, config.PARAMS_ERR, '服务器登录用户名不能为空')
  }
  if (!pwd) {
    return requestHandler(res, config.PARAMS_ERR, '服务器登录密码不能为空')
  }
  if (!deployPathList) {
    return requestHandler(res, config.PARAMS_ERR, '部署路径不能为空')
  } else if (!Array.isArray(deployPathList)) {
    return requestHandler(res, config.PARAMS_ERR, '部署路径必须是数组')
  }
  new DBModel(req.body).save(function (err, result) {
    if (err) {
      return requestHandler(res, config.DB_ERR, '数据库错误，保存失败')
    }
    return requestHandler(res, config.SUCCESS, '添加成功')
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

module.exports = {
  add,
  list
}