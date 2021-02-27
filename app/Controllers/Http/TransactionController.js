'use strict'


///check transactions
///receive webhook transactions notifications
const Ws = use('Ws')
const Env = use('Env')
const BitGo = require('bitgo');
const transactions=use('App/Models/Transaction')
const wallets=use('App/Models/Wallet')
const balance=use('App/Models/Balance')
const convert=require('cryptocurrency-unit-convert')

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
        let details=await wallets.query().where({walletid:walletId}).fetch();
        let email=details.toJSON()[0].email
       let converted='';

        //convert the amount
        //btc
        if (coin.indexOf('btc')!==-1){
          converted=convert.convertBTC(transaction.value,'satoshi','btc')
        }
        //dash
        if (coin.indexOf('dash')!==-1){
          converted=convert.convertDASH(transaction.value,'duff','dash')
        }
        //ltc
        if (coin.indexOf('ltc')!==-1){
          converted=convert.convertLTC(transaction.value,'photon','ltc')
        }
        //bch
        if (coin.indexOf('bch')!==-1){
          converted=convert.convertBCH(transaction.value,'satoshi','bch')
        }
//save the transaction
        if (check_transaction.toJSON().length===0){
          await transactions.create({
            wallet:walletId,
            txid:transfer,
            value:transaction.value,
            amount:converted,
            coin:coin,
            type:transaction.type,
            email:email
          })

            ///update balance
         await balance.query().where({email:email,coin:'btc'}).increment('value', converted)
        }else {
          console.log('transaction confirmed')
        }
      }
      response.status(200)
    }catch (e) {
      console.log(e)
    }
  }
}

module.exports = TransactionController
