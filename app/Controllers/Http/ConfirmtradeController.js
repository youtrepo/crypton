'use strict'

const trade=use('App/Models/Trade')
class ConfirmtradeController {
  async confirm({request,response,auth}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let data=request.only(['id'])
      if (data.id){
        await trade.query().where({trade_id:data.id}).update({status:'paid'})
        response.json({status:'success',msg:'ok'})
      }
    } catch (error) {
      console.log(error)
      if (error.message === 'E_INVALID_SESSION: Invalid session') {
        response.status(403)
      } else {
        response.status(500)
      }
    }
  }
}

module.exports = ConfirmtradeController
