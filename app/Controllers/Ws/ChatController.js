'use strict'


const chat = use('App/Models/Chat')
const moment = require('moment');
class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage (message) {
    (async ()=>{
      let token=this.socket.topic.split('chat:')[1]
      if (!token) this.socket.broadcastToAll('error')
      await chat.create({
        trade_id:token,
        messages:message.msg,
        user:message.user,
        type:'sell'
      })
      message.time=moment().format("hh:mm a")
      this.socket.broadcastToAll('message', message)
    })()
  }
}

module.exports = ChatController
