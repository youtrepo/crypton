'use strict'

const BitGo = require('bitgo');
const Env = use('Env')
const wallets=use('App/Models/Wallet')
var QRCode = require('qrcode')
const coin='btc'
var bitgo = new BitGo.BitGo({env: Env.get('BITGO_ENV'), accessToken:  Env.get('BITGO_KEY')});
class WalletbtcController {
  async walletbtc({auth,request,response,view}){
    try {
      if (await auth.check()) {
        await bitgo.session()
        let user = await auth.getUser()
        let check=wallets.findBy({email:user.email,coin:coin})
        console.log(check)
        return view.render('dashboard/walletbtc')

      }else {
        response.redirect('/login')
      }
    }catch (e) {
      response.send('oops something is not right on our end')
      console.log(e)
    }

  }
}

module.exports = WalletbtcController
