'use strict'
const coins=use('App/Models/Coin')
const balances=use('App/Models/Balance')
const Env = use('Env')
const wallets=use('App/Models/Wallet')
const BitGo = require('bitgo');
const transactions=use('App/Models/Transaction')
let bitgo = new BitGo.BitGo({env: Env.get('BITGO_ENV'), accessToken: Env.get('BITGO_KEY')});


class WithdrawController {
  async withdraw({request,response,view,auth}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let requestMethod=request.method()
      if (requestMethod==='GET'){
        //get all coins
        let allCoins=await coins.all()

        //get balances
        let allBalances=await balances.query().where({email:user.email}).fetch()
        //render the view page
        return view.render('dashboard/withdraw',{coins:allCoins.toJSON(),balances:allBalances.toJSON()})
      }else if (requestMethod==='POST'){
        //now we handle withdrawals
        //first we check tha balance
        let data=request.only(['coin','amount','address'])
        let [coin,amount,address]=[data.coin,data.amount,data.address]
        if (coin&&amount){
          //check balance
          let balance=await balances.query().where({email:user.email,coin:coin.toLowerCase()}).fetch()
          let checkBalance=balance.toJSON()[0]
          if (checkBalance.value<amount||checkBalance.value===0){
            response.json({success:false,msg:'Not enough balance'})
          }else{
            //initialise bitgo session
            await bitgo.session()
            //first we get the wallet
            if (Env.get('BITGO_ENV')==='test'){
              coin='t'+coin.toLowerCase()
            }
            let wallet=await wallets.query().where({email:user.email,coin:coin.toLowerCase()}).fetch()
            let walletInfo=wallet.toJSON()[0]
            let walletId = walletInfo.walletid;
            let userWallet=await bitgo.coin(coin).wallets().get({ id: walletId })


            //we process the withdraw
            let transaction=await userWallet.send({
              amount:amount* 1e8,
              address: address,
              walletPassphrase: user.password
            })
            await balances.query().where({email:user.email,coin:coin.toLowerCase()}).decrement({value:amount})

            //convert coin
            let converted='';

            //convert the amount
            //btc
            if (coin.indexOf('btc')!==-1){
              converted=convert.convertBTC(transaction.transfer.value,'satoshi','btc')
            }
            //dash
            if (coin.indexOf('dash')!==-1){
              converted=convert.convertDASH(transaction.transfer.value,'duff','dash')
            }
            //ltc
            if (coin.indexOf('ltc')!==-1){
              converted=convert.convertLTC(transaction.transfer.value,'photon','ltc')
            }
            //bch
            if (coin.indexOf('bch')!==-1){
              converted=convert.convertBCH(transaction.transfer.value,'satoshi','bch')
            }

            //update transactions
            await transactions.create({
              wallet:transaction.transfer.wallet,
              value:transaction.transfer.value,
              amount:converted,
              txid:transaction.transfer.txid,
              coin:transaction.transfer.coin,
              type:'withdraw',
              email:user.email
            })

            await response.json({success:true,msg:'withdraw success'})
          }
        }

      }
    } catch (e) {
      if (e.message === 'E_INVALID_SESSION: Invalid session') {
        response.redirect('/login')
      } else {
        response.json({success:false,msg:'something went wrong'})
      }
      console.log(e)
    }
  }
}

module.exports = WithdrawController
