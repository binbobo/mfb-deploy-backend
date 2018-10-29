const app = require('express')()
const bodyParser = require('body-parser')
const {initDB} = require('./src/utils/db')

app.use(bodyParser.json())
// 引入接口路由
app.use(require('./src/routes'))

// 数据库连接
initDB(function () {
  app.listen(3000, function() {
    console.log('Listening on port 3000...')
  })
})

