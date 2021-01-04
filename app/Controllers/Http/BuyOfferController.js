'use strict'

const Env = use('Env')
const offer=use('App/Models/Offer')
const country=use('App/Models/Country')
const currency=use('App/Models/Currency')
const coin=use('App/Models/Coin')
const payment=use('App/Models/Payment')
const axios = require('axios').default;


class BuyOfferController {
  async buy({auth, request, response, view}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let buy_offers=await offer.query().where('email', '!=', user.email).andWhere('offer_type', 'sell').fetch()
      let btc = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC');
      let bch = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BCH');
      let ltc = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=LTC');
      let dash = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=DASH');
      let offers=buy_offers.toJSON();
     let[countries,currencies,payments,coins]=[await country.all(),await currency.all(),await payment.all(),await coin.all()]

      for await (let info of offers){
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
      return view.render('dashboard/buy_coin',{
        offers:offers,
        param:request.url(),
        title:Env.get('TITLE'),
        btc:btc.data,
        bch:bch.data,
        ltc:ltc.data,
        dash:dash.data,
        countries:countries.toJSON(),
        coins:coins.toJSON(),
        payments:payments.toJSON(),
        currencies:currencies.toJSON()
      })
    } catch (e) {
      if (e.message === 'E_INVALID_SESSION: Invalid session') {
        response.redirect('/login')
      } else {
        response.status(500).redirect('/500')
      }
      console.log(e)

    }
  }
}

module.exports = BuyOfferController
