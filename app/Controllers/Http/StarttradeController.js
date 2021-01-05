'use strict'


const trade=use('App/Models/Trade')
const chat=use('App/Models/Chat')
const moment=require('moment');
class StarttradeController {
  async start({request,response,auth}){
    try {
      await auth.check()
      let data=await request.post()
      let[coin,currency,coin_type,rate,time,c,id]=[data.coin,data.currency,data.coin_type,data.rate,data.time,data.c,data.yout]
      if (coin&&currency) {
        let d=moment().set('minute',time)
        let trade_data= await trade.findOrCreate(
          {offer_Id:id },{
          status:'active',
          type:'buy',
          coin:coin_type,
          currency:c,
          amount:coin,
          local_amount:currency,
          rate:rate,
          deadline:d
        })
        await response.send(trade_data)
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
