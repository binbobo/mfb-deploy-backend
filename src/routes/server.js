const router = require('express').Router()
  , MController = require('../controllers/server')

router.post('/add', MController.add)
router.get('/list', MController.list)

module.exports = router