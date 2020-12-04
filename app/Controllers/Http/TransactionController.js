'use strict'

const Ws = use('Ws')
const transaction=use('App/Models/Transaction')
class TransactionController {
  async transactions({request,response}){
    console.log(request.all())
  }
}

module.exports = TransactionController
