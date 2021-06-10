'use strict'

class TransactionController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log(request)
  }
}

module.exports = TransactionController
