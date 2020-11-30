'use strict'

const BitGo = require('bitgo');
const Env = use('Env')
const wallets=use('App/Models/Wallet')
var QRCode = require('qrcode')
const coin='tbtc'
var bitgo = new BitGo.BitGo({env: Env.get('BITGO_ENV'), accessToken:  Env.get('BITGO_KEY')});
class WalletbtcController {
  async walletbtc({auth,request,response,view}){
    try {
      if (await auth.check()) {
        await bitgo.session()
        let user = await auth.getUser()
        let check=await wallets.findBy({email:user.email,coin:coin})
        const params = {
          "passphrase":user.password,
          "label":user.email
        };
        if (check){
          let qrcode=await QRCode.toDataURL(check.address, {width: 200})
          return view.render('dashboard/walletbtc',{wallet:check.address,qr:qrcode})
        }else {
          const { wallet } = await bitgo.coin(coin).wallets().generateWallet(params);
          const webhook=await wallet.addWebhook({
            url:Env.get('URL'),
            type: "transfer"
          });
          let address=wallet._wallet.receiveAddress.address
          const create_wallet=await wallets.create({
            email:user.email,
            coin:coin,
            walletid:wallet._wallet.id,
            address:address,
            status:'active'

          })
          let qrcode=await QRCode.toDataURL(address, {width: 200})
          return view.render('dashboard/walletbtc',{wallet:wallet._wallet.receiveAddress.address,qr:qrcode})
        }

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
