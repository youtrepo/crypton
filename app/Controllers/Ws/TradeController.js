'use strict'

/*
///////////////
websockets controller for trades
/////////////////////
*/
const trade=use('App/Models/Trade')
class TradeController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage (message) {
    (async ()=>{
      if (message.msg==='cancelled') {
        //cancel trade
        let id = message.token
        await trade.query().where({trade_id: id}).update({status: 'cancelled'})
        this.socket.broadcastToAll('done', {
          trade: 'cancelled'
        })
        //mark trade as paid
      }else if (message.msg==='paid'){
        let id = message.token
        await trade.query().where({trade_id: id}).update({status: 'paid'})
        this.socket.broadcastToAll('done', {
          trade: 'paid'
        })
        //mark trade as disputed
      }else if (message.msg==='disputed'){
        let id = message.token
        await trade.query().where({trade_id: id}).update({status: 'disputed'})
        this.socket.broadcastToAll('done', {
          trade: 'disputed'
        })
        //mark trade as completed
      } else if (message.msg==='completed'){
      let id = message.token
      await trade.query().where({trade_id: id}).update({status: 'completed'})
      this.socket.broadcastToAll('done', {
        trade: 'completed'
      })
    }
    })()
  }
}

module.exports = TradeController
