var express = require('express')
  , router = express.Router()

router.use('/user', require('./user'))
router.use('/server', require('./server'))
router.use('/project', require('./project'))

module.exports = router