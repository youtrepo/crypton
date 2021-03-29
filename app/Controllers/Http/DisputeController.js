'use strict'
const trades=use('App/Models/Trade')

class DisputeController {
  async dispute({request,response,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      if (request.ajax()){
        let data=await request.only(['id', 'user'])

        //dispute trade
        let dispute=await trades.query().where({trade_id:data.id}).update({status:'disputed',disputed_by:data.user})
        return response.json({success:true,msg:"trade disputed successfully"})
      }
    }catch (error) {
      if (error.message==='E_INVALID_SESSION: Invalid session'){
        response.status(403).json({success: false, msg: 'forbidden'})
      }else {
        response.status(403).json({success: false, msg: 'forbidden'})
        console.log(error)
      }
    }
  }
}

module.exports = DisputeController
