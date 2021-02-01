'use strict'

const Ws=use('App/Services/Ws')
class NotificationsubscribeController {
  async subscribe({request,response,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      await Ws.on('connection',(socket)=>{
        socket.join(user.email)
        socket.emit('subscribed',{success:true,msg:'notifications success'})
      })
    }
    catch (e) {
      console.log(e)
      Ws.emit('error',{success:false,error:'notifications error'})
    }
  }
}

module.exports = NotificationsubscribeController
