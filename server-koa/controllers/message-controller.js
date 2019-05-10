const MessageModel = require('../models/message')
const { withAuth } = require('../util')
const ERRMSG = require('../util/errmsg')

let getmessage = withAuth(
  async (ctx, next) => {
    try {
      const wid = ctx.params.wid
      const cname = ctx.params.cname
      let result = await MessageModel.get(wid, cname)
      if (result.length > 0) {
        ctx.ok({
          success: true,
          message: result
        })
      } else {
        ctx.notFound({ success: false, error: ERRMSG['notFound'] })
      }
    } catch (error) {
      ctx.internalServerError({ error })
    }
  }
)

let addmessage = withAuth(
  async (ctx, next) => {
    try {
      const { wid, cname, uemail, mcontent } = ctx.request.body
      let mtime = new Date()
      let result = await MessageModel.addNewmessage(wid, cname, uemail, mtime, mcontent)
      if (result) {
        ctx.created({ success: true, message: mcontent })
      } else {
        ctx.badRequest({ success: false, error: ERRMSG['badRequest'] })
      }
    } catch (error) {
      ctx.badRequest({ error })
    }
  }
)

module.exports = {
  getmessage,
  addmessage
}
