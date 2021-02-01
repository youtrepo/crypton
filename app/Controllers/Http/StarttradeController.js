'use strict'

const trade=use('App/Models/Trade')
const chat=use('App/Models/Chat')
const moment=require('moment');
const Ws=use('App/Services/Ws')
const offer=use('App/Models/Offer')
const notifications=use('App/Models/Notification')

class StarttradeController {
  async start({request,response,auth}){
    try {
      await auth.check()
      let user=await auth.getUser()
      let data=await request.post()
      let[coin,currency,coin_type,rate,time,c,id]=[data.coin,data.currency,data.coin_type,data.rate,data.time,data.c,data.yout]
      if (coin&&currency) {
        let d=moment().set('minute',time)
        let trade_data= await trade.findOrCreate(
          {offer_Id:id },{
          status:'active',
          type:'buy',
            offer_Id:id,
          coin:coin_type,
          currency:c,
          amount:coin,
          local_amount:currency,
          rate:rate,
          deadline:d
        })
        let info=await trade.query().where({offer_Id:id,status:'active'}).fetch()
        let m_info=await offer.query().where({offer_id:id}).fetch()
        let trade_id=await info.toJSON()[0].trade_id
        let socket_id=await m_info.toJSON()[0].email
        await offer.query().where('offer_id',id).update({ status:'trading' })
        await notifications.create({email:socket_id,msg:'trading',status:'progress',type:'trade',trade_link:trade_id})
        await notifications.create({email:user.email,msg:'trading',status:'progress',type:'trade',trade_link:trade_id})
        await Ws.on('connection',(socket)=>{socket.to(socket_id).emit('new trade started')})
        await response.json({chat:trade_id,success:true})
      }else {
        await response.status(500).send('error params missing')
      }
    } catch (error) {
      console.log(error)
      if (error.message === 'E_INVALID_SESSION: Invalid session') {
        response.status(403).send('access forbidden')
      } else {
        response.status(500).send('error')
      }
    }

  }
}

module.exports = StarttradeController
