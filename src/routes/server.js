const router = require('express').Router()
  , MController = require('../controllers/server')

router.post('/add', function(req, res) {
 MController.add(req, res)
})
router.get('/list', function(req, res) {
  MController.list(req, res)
 })

module.exports = router