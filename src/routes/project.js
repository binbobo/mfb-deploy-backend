const router = require('express').Router()
  , MController = require('../controllers/project')

router.post('/add', MController.add)
router.get('/list', MController.list)
router.post('/info', MController.info)
router.post('/memberInfo', MController.memberInfo)
router.post('/inviteMember', MController.inviteMember)
router.post('/removeMember', MController.removeMember)
router.post('/addEnv', MController.addEnv)

module.exports = router