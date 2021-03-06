const Router = require('koa-router')
const router = new Router()
const cInvitationController = require('../controllers/cinvitation-controller')

router.get('/:remail', cInvitationController.getallinvitation)
router.get('/:wid/:cname', cInvitationController.getChannelInvitation)
router.post('/', cInvitationController.addcinvitation)
router.delete('/', cInvitationController.deleteallcinvitation)

module.exports = router.routes()
