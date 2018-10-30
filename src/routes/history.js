const router = require('express').Router()
  , MController = require('../controllers/history')

router.post('/add', MController.add)
router.post('/list', MController.list)

module.exports = router