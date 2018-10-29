const router = require('express').Router()
  , MController = require('../controllers/user')
  
router.post('/register', function(req, res) {
 MController.register(req, res)
})

router.get('/list', function(req, res) {
  MController.list(req, res)
 })

module.exports = router