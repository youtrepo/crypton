'use strict'

const BitGo = require('bitgo');
const Env = use('Env')
const wallets=use('App/Models/Wallet')
var QRCode = require('qrcode')
const coin='tdash'
var bitgo = new BitGo.BitGo({env: Env.get('BITGO_ENV'), accessToken:  Env.get('BITGO_KEY')});
class WalletdashController {
  async walletdash({auth,request,response,view}){
    try {
      await auth.check()
        await bitgo.session()
        let user = await auth.getUser()
        let check=await wallets.findBy({email:user.email,coin:coin})
        const params = {
          "passphrase":user.password,
          "label":user.email
        };
        if (check){
          let qrcode=await QRCode.toDataURL(check.address, {width: 200})
          return view.render('dashboard/walleteth',{wallet:check.address,qr:qrcode,param:request.url(),title:Env.get('TITLE')})
        }else {
          const { wallet } = await bitgo.coin(coin).wallets().generateWallet(params);
          const webhook=await wallet.addWebhook({
            url:Env.get('URL')+'/transactions',
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
          return view.render('dashboard/walleteth',{wallet:wallet._wallet.receiveAddress.address,qr:qrcode,param:request.url(),title:Env.get('TITLE')})
        }
    }catch (e) {
      if (e.message==='E_INVALID_SESSION: Invalid session'){
        response.redirect('/login')
      }else {
        response.status(500).redirect('/500')
      }
      console.log(e)
    }

  }
}

module.exports = WalletdashController
