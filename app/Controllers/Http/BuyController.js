'use strict'

const offer=use('App/Models/Offer')
const axios = require('axios').default;
class BuyController {
  async buy({auth,request,response,params,view}){
    try {
      await auth.check()
      let user = await auth.getUser()
      let id=params.id
      if (id) {
        let offers=await offer.query().where({offer_id:id}).fetch()
        if (offers.toJSON().length!==0) {
          let info=offers.toJSON()[0]
          let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency:info.currency,

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionD
            // digits: 0, // (causes 2500.99 to be printed as $2,501)
          });
          let price = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency='+info.coin);
          let rate=formatter.format(parseFloat(price.data.data['rates'][info.currency])+info.margin/100*parseFloat(price.data.data['rates'][info.currency]))
          let uc=parseFloat(price.data.data['rates'][info.currency])+info.margin/100*parseFloat(price.data.data['rates'][info.currency])
          return view.render('dashboard/buy', {
            offer:info,
            min:formatter.format(info.min_amount),
            max:formatter.format(info.max_amount),
            rate:rate,
            owner:info.email===user.email,
            uc:uc.toFixed(2),
            uc_min:info.min_amount,
            uc_max:info.max_amount
          })
        }else {
          return view.render('errors/404')
        }
      }else {
        return view.render('errors/404')
      }

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

module.exports = BuyController
