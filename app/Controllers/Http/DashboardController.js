'use strict'

const Env = use('Env')
const balance=use('App/Models/Balance')
const  notification=use('App/Models/Notification')
const transaction=use('App/Models/Transaction')
const Ws=use('App/Services/Ws')
const fromNow = require('fromnow');
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

class DashboardController {
  async dashboard({auth,request,response,view}){
    try {
      await auth.check()
        let user = await auth.getUser()
        Ws.on('connection',(socket)=>{socket.join(user.email)})
        let btc = await balance.findBy({email:user.email,coin:'btc'})
        let bch = await balance.findBy({email:user.email,coin:'bch'})
        let ltc = await balance.findBy({email:user.email,coin:'ltc'})
        let eth = await balance.findBy({email:user.email,coin:'eth'})
        let notifications=await notification.query().where({email:user.email}).fetch()
        let transactions=await transaction.query().where({email:user.email}).fetch()

      //get coin prices
      let real_btcprice=[]
      let real_dashprice=[]
      let real_bchprice=[]
      let real_ltcprice=[]
      let btcprices=await CoinGeckoClient.coins.fetchMarketChart('bitcoin',{
        vs_currency:'usd',
        days:'1'
      })
      let dashprices=await CoinGeckoClient.coins.fetchMarketChart('dash',{
        vs_currency:'usd',
        days:'1'
      })
      let bchprices=await CoinGeckoClient.coins.fetchMarketChart('bitcoin-cash',{
        vs_currency:'usd',
        days:'1'
      })
      let ltcprices=await CoinGeckoClient.coins.fetchMarketChart('litecoin',{
        vs_currency:'usd',
        days:'1'
      })

      //btc
      for await (const price of btcprices.data.prices){
        real_btcprice.push(Math.round(price.pop()))
      }
      //dash
      for await (const price of dashprices.data.prices){
        real_dashprice.push(Math.round(price.pop()))
      }
      //bch
      for await (const price of bchprices.data.prices){
        real_bchprice.push(Math.round(price.pop()))
      }
      ///ltc
      for await (const price of ltcprices.data.prices){
        real_ltcprice.push(Math.round(price.pop()))
      }


        return view.render('dashboard/index',{
          btc:btc,
          bch:bch,
          eth:eth,
          ltc:ltc,
          btcprices:real_btcprice,
          dashprices:real_dashprice,
          bchprices:real_bchprice,
          ltcprices:real_ltcprice,
          param:request.url(),
          title:Env.get('TITLE'),
          notifications:notifications.toJSON(),
          transactions:transactions.toJSON(),
          fromNow:fromNow,
          url:Env.get('URL')
        })
    } catch (error) {
      console.log(error)
      if (error.message==='E_INVALID_SESSION: Invalid session'){
        response.redirect('/login')
      }else {
        response.status(500).redirect('/500')
      }
    }
  }
}

module.exports = DashboardController
