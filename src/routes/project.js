const router = require('express').Router()
  , MController = require('../controllers/project')

router.post('/add', function(req, res) {
 MController.add(req, res)
})
router.get('/list', function(req, res) {
  MController.list(req, res)
 })
 router.get('/info', function(req, res) {
  MController.info(req, res)
 })

module.exports = router