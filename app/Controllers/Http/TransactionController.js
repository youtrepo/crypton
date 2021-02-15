'use strict'

const Ws = use('Ws')
const transaction=use('App/Models/Transaction')
class TransactionController {
  async transactions({request,response}){
    try{
      console.log(request.all())
      console.log('mmh')
      response.status(200)
    }catch (e) {
      console.log(e)
    }
  }
}

module.exports = TransactionController
