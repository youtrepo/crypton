'use strict'


const trade=use('App/Models/Trade')
const moment = require('moment');
class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage (message) {
    message.time=moment().format("hh:mm a")
    this.socket.broadcastToAll('message', message)
  }
}

module.exports = ChatController
