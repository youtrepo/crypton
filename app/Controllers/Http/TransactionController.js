'use strict'

const Ws = use('Ws')
const Env = use('Env')
const BitGo = require('bitgo');
const transactions=use('App/Models/Transaction')
let bitgo = new BitGo.BitGo({env: Env.get('BITGO_ENV'), accessToken:  Env.get('BITGO_KEY')});
const transaction=use('App/Models/Transaction')
class TransactionController {
  async transactions({request,response}){
    try{
      await bitgo.session()
      let data=await request.all()
      if (data.hash&&data.transfer&&data.coin&&data.type&&data.state&&data.wallet){
        let[hash,transfer,coin,type,state,walletId]=[data.hash,data.transfer,data.coin,data.type,data.state,data.wallet]
        const wallet= await bitgo.coin(coin).wallets().get({ id: walletId })
        let transaction=await wallet.getTransfer({ id: transfer })
        let check_transaction=await transactions.query().where({txid:transfer}).fetch()
        if (check_transaction.toJSON().length===0){
          await transaction.create({
            wallet:walletId,
            txid:transfer,
            hash:hash,
            coin:coin,
            type:transaction.type
          })
        }
      }
      response.status(200)
    }catch (e) {
      console.log(e)
    }
  }
}

module.exports = TransactionController
