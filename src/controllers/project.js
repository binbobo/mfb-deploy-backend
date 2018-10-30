
const mongoose = require('mongoose');
const ProjectSchema = require('../models/project');
const UserSchema = require('../models/user');
const {requestHandler} = require('../utils/db')
const config = require('../config/statusCode')
// Doc Ref
const ProjectModel = mongoose.model('Project', ProjectSchema);
const UserModel = mongoose.model('User', UserSchema);

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

  new ProjectModel(req.body).save(function (err, result) {
    if (err) {
      return requestHandler(res, config.DB_ERR, '数据库错误，保存失败')
    }
    return requestHandler(res, config.SUCCESS, '添加成功', result)
  })
}

// 获取所有服务器列表
const list = function (req, res) {
  ProjectModel.find({}, function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询列表失败')
    return requestHandler(res, config.SUCCESS, '查询列表成功', {
      total: data.length,
      result: data
    })
  });
};

const info = function (req, res) {
  let {id, fields} = req.body
  if (!fields || !Array.isArray(fields)) fields = []
  if (!id) return requestHandler(res, config.PARAMS_ERR, '请求参数错误')

  ProjectModel.findOne({_id:id}, fields.join(' '),function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询失败')
    return requestHandler(res, config.SUCCESS, '查询成功', data)
  });
};

const memberInfo = function (req, res) {
  let {id} = req.body
  if (!id) return requestHandler(res, config.PARAMS_ERR, '请求参数错误')

  ProjectModel.findOne({_id:id}, 'member creator',function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询项目信息失败')
    const {creator, member} = data
    UserModel.find({username:{$in: member}}, 'username email',function (err, data) {
      if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询用户信息失败')
      return requestHandler(res, config.SUCCESS, '查询成功', {
        creator,
        memberList: data
      })
    })
  })
}

const inviteMember = function (req, res) {
  let {id, member} = req.body
  if (!id || !member) return requestHandler(res, config.PARAMS_ERR, '请求参数错误')

  // 检查邀请的成员是不是系统用户
  UserModel.findOne({username:member},function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询失败')
    if (!data) return requestHandler(res, config.BUSS_LOGIN_ERR, '被邀请成员不存在')
    // 判断被邀请成员是否已在项目中
    ProjectModel.findOne({_id:id}, 'member', function (err, data) {
      if (err) return requestHandler(res, config.DB_ERR, '数据库错误，查询失败')
      if (data.member.indexOf(member)>-1) return requestHandler(res, config.BUSS_LOGIN_ERR, '该成员已在项目中')
      // 更新项目记录 添加新成员
      ProjectModel.findByIdAndUpdate(id, { "$push": { member } },function (err, data) {
        if (err) return requestHandler(res, config.DB_ERR, '数据库错误，更新失败')
        return requestHandler(res, config.SUCCESS, '更新成功')
      })
    })
  })
}

const removeMember = function (req, res) {
  let {id, member} = req.body
  if (!id || !member) return requestHandler(res, config.PARAMS_ERR, '请求参数错误')

  // 更新项目记录 添加新成员
  ProjectModel.findByIdAndUpdate(id, { "$pull": { member } },function (err, data) {
    if (err) return requestHandler(res, config.DB_ERR, '数据库错误，更新失败')
    return requestHandler(res, config.SUCCESS, '更新成功')
  })
}

module.exports = {
  removeMember,
  inviteMember,
  memberInfo,
  add,
  list,
  info
}