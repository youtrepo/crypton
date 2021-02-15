'use strict'

const trade=use('App/Models/Trade')
const buyer=use('App/Models/User')
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
      let buyer_data=await buyer.query().where({email:user.email}).fetch()
      let[coin,currency,coin_type,rate,time,c,id]=[data.coin,data.currency,data.coin_type,data.rate,data.time,data.c,data.yout]
      let seller_data=await offer.query().where({offer_id:id}).fetch()
      if (coin&&currency) {
        let d=moment().add(time,'minutes').toDate()
        let trade_data= await trade.create({
          status:'active',
          type:'buy',
            offer_id:id,
          coin:coin_type,
          currency:c,
          amount:coin,
          local_amount:currency,
          rate:rate,
          deadline:d,
            buyer:buyer_data.toJSON()[0].username,
            seller:seller_data.toJSON()[0].user
        })
        let info=await trade.query().where({offer_id:id,status:'active'}).fetch()
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
