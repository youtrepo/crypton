'use strict'

const Task = use('Task')
const Ws=use('App/Services/Ws')
const trade=use('App/Models/Trade')

class Chat extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }

  async handle () {
    let data=await trade.all()
    let details=await data.toJSON()
    for await (const trade of details){
      Ws.on('connection',(socket)=>{
        socket.join(trade.trade_id)
      })
    }
    this.info('Task Chat handle')
    console.log('started tasks')

  }
}

module.exports = Chat
