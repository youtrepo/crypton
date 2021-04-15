'use strict'

// const Ws=use('App/Services/Ws')
class NotificationsubscribeController {
  async subscribe({request,response,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      const data = request.only(['type'])
      if (request.ajax()&&data.type==='notifications') {
        response.json({success:true,msg:user.email})
      }else {
        response.status(403).json({success:false,msg:'access forbidden'})
      }

    }
    catch (e) {
      console.log(e)
    }
  }
}

module.exports = NotificationsubscribeController
