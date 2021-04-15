'use strict'
/*
///////////////
websockets controller for notifications
/////////////////////
*/
class NotificationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = NotificationController
