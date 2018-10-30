const mongoose = require('mongoose');
const DBSchema = require('../models/user');
const {requestHandler, checkEmptyFields} = require('../utils/db')
const config = require('../config/statusCode')
// Doc Ref
var DBModel = mongoose.model('User', DBSchema);

// const login = function (req, res) {
//   DBModel.findOne({'username': req.body.username}, function (err, user) {
//     if (err) return DBCommonHander.errorHandler(err, res, '检查用户是否存在失败')
//     if (user == null) return DBCommonHander.errorHandler(err, res, '用户不存在')
//     if (user.password !== req.body.password) return DBCommonHander.errorHandler(err, res, '密码错误')
//     // 设置Session 标识当前登陆用户
//     req.session.user =  {
//       name: user.username,
//       email: user.email
//     }
//     return DBCommonHander.successHandler( res, '登陆成功', {
//       name: user.username,
//       email: user.email
//     })
//   })
// }

const register = function (req, res) {
  const {username, password, email} = req.body
  const fields = [{
    value: username,
    label: '用户名'
  },{
    value: password,
    label: '密码'
  },{
    value: email,
    label: '邮箱'
  }]
  const checkFieldsErr = checkEmptyFields(fields)
  if (checkFieldsErr) return requestHandler(res, config.PARAMS_ERR, checkFieldsErr)

  DBModel.findOne({username}, function (err, user) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，检查用户是否存在失败')
    if (user != null) return requestHandler(res, config.BUSS_LOGIN_ERR, '用户已存在')
    // 创建一个新的用户
    new DBModel(req.body).save(function (err, user) {
        if (err) return requestHandler(res, config.DB_ERR, '数据库错误，注册失败')
        return  requestHandler(res, config.SUCCESS, '注册成功')
      })
    })
}

// 获取所有服务器列表
const list = function (req, res) {
  DBModel.find({}, 'username', function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询列表失败')
    return requestHandler(res, config.SUCCESS, '查询列表成功', data)
  });
};

// 获取所有服务器列表
const getUserByName = function (req, res) {
  let {name} = req.query
  if (typeof name !== 'string' || !name.trim()) return requestHandler(res, config.PARAMS_ERR, '请求参数错误')
  DBModel.find({'username': { $regex: '.*' + name + '.*' }}, 'username', function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询失败')
    return requestHandler(res, config.SUCCESS, '查询成功', data)
  });
};


// const logout = function (req, res) {
//   DBCommonHander.successHandler( res, '退出系统成功', null)
// }

module.exports = {
  getUserByName,
  list,
  register
}