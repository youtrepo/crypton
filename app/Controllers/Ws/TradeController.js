'use strict'
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
      }else if (message.msg==='paid'){
        let id = message.token
        await trade.query().where({trade_id: id}).update({status: 'paid'})
        this.socket.broadcastToAll('done', {
          trade: 'paid'
        })
      }
    })()
  }
}

module.exports = TradeController
