'use strict'

const coin=use('App/Models/Coin')
const currency=use('App/Models/Currency')
const payment=use('App/Models/Payment')
const country=use('App/Models/Country')
const Env = use('Env')
class CreateofferController {
  async create_offer({auth,request,response,view}){
    try{
      await auth.check()
      let coins=await coin.all()
      let currencies=await currency.all()
      let payments=await payment.all()
      let countries=await country.all()
      return view.render('dashboard/create_offer',{coins:coins.toJSON(),currencies:currencies.toJSON(),payments:payments.toJSON(),countries:countries.toJSON()})
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

module.exports = CreateofferController
