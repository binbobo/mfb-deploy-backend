const router = require('express').Router()
  , MController = require('../controllers/user')
  
router.post('/register', MController.register)

router.get('/list', MController.list)

router.get('/getUserByName', MController.getUserByName)

module.exports = router