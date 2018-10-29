const mongoose = require('mongoose')
const config = require('../config/db')

const initDB = function (callback) {
  const {server, port, dbName} = config
  mongoose.connect(`mongodb://${server}:${port}/${dbName}`)

  mongoose.connection
    .on('error', function(err) {
      console.error('连接数据库失败，请确认服务是否启动')
      process.exit(0)
    })
    .once('open', function () {
      console.log('connectted to mongodb!');
      callback()
    });
}

const requestHandler = (res, code, message, data=null) => {
  let resBody = {
    code,
    message
  }
  if (data) resBody.data = data
  res.json(resBody)
}

const checkEmptyFields = (fields) => {
  fields.forEach(item => {
    if (item.value != 0 && !item.value) {
      return `${item.lable}不能为空`
    }
  })
  return ''
}

module.exports = {
  initDB,
  checkEmptyFields,
  requestHandler
}