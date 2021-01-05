'use strict'

class NotfificationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = NotfificationController
