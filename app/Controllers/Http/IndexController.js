'use strict'

const Env = use('Env')
const Antl = use('Antl')
const offers=use('App/Models/Offer')
const axios = require('axios').default;

Antl.bootLoader()
class IndexController {
  async index({request,response,view}){
    let sell=await offers.query().where({offer_type:'sell'}).fetch()
    let buy=await offers.query().where({offer_type:'buy'}).fetch()
    let sells=sell.toJSON()
    let buys=buy.toJSON()
    let btc = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC');
    let bch = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BCH');
    let ltc = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=LTC');
    let dash = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=DASH');


    //buys
    for await (let info of buys){
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:info.currency,

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      info.min_amount=formatter.format(info.min_amount)
      info.max_amount=formatter.format(info.max_amount)

      switch (info.coin) {
        case 'Btc':
          info.rate=formatter.format(parseFloat(btc.data.data['rates'][info.currency])+info.margin/100*parseFloat(btc.data.data['rates'][info.currency]))
          break;
        case 'Bch':
          info.rate=formatter.format(parseFloat(bch.data.data['rates'][info.currency])+info.margin/100*parseFloat(bch.data.data['rates'][info.currency]))
          break;
        case 'Ltc':
          info.rate=formatter.format(parseFloat(ltc.data.data['rates'][info.currency])+info.margin/100*parseFloat(ltc.data.data['rates'][info.currency]))
          break;
        case 'Dash':
          info.rate=formatter.format(parseFloat(dash.data.data['rates'][info.currency])+info.margin/100*parseFloat(dash.data.data['rates'][info.currency]))
          break;

      }
    }

    //sells
    for await (let info of sells){
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:info.currency,

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      info.min_amount=formatter.format(info.min_amount)
      info.max_amount=formatter.format(info.max_amount)

      switch (info.coin) {
        case 'Btc':
          info.rate=formatter.format(parseFloat(btc.data.data['rates'][info.currency])+info.margin/100*parseFloat(btc.data.data['rates'][info.currency]))
          break;
        case 'Bch':
          info.rate=formatter.format(parseFloat(bch.data.data['rates'][info.currency])+info.margin/100*parseFloat(bch.data.data['rates'][info.currency]))
          break;
        case 'Ltc':
          info.rate=formatter.format(parseFloat(ltc.data.data['rates'][info.currency])+info.margin/100*parseFloat(ltc.data.data['rates'][info.currency]))
          break;
        case 'Dash':
          info.rate=formatter.format(parseFloat(dash.data.data['rates'][info.currency])+info.margin/100*parseFloat(dash.data.data['rates'][info.currency]))
          break;

      }
    }

  return view.render('landing/index',{title:Env.get('TITLE'),Antl:Antl,buys:buys,sells:sells})
  }
}

module.exports = IndexController
