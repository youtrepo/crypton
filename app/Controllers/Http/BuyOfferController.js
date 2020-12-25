'use strict'

const Env = use('Env')
const offer=use('App/Models/Offer')
const axios = require('axios').default;


class BuyOfferController {
  async buy({auth, request, response, view}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let buy_offers=await offer.query().where({email:user.email}).fetch()
      let btc = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC');
      let bch = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=BCH');
      let ltc = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=LTC');
      let dash = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=DASH');
      console.log(dash)

      return view.render('dashboard/buy_coin',{
        offers:buy_offers.toJSON(),
        param:request.url(),
        title:Env.get('TITLE'),
        btc:btc,
        bch:bch,
        ltc:ltc,
        dash:dash
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
