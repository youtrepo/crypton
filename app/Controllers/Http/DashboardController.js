'use strict'

const Env = use('Env')
const balance=use('App/Models/Balance')
const  notification=use('App/Models/Notification')
const transaction=use('App/Models/Transaction')
const fromNow = require('fromnow');
class DashboardController {
  async dashboard({auth,request,response,view}){
    try {
      await auth.check()
        let user = await auth.getUser()
        let btc = await balance.findBy({email:user.email,coin:'btc'})
        let bch = await balance.findBy({email:user.email,coin:'bch'})
        let ltc = await balance.findBy({email:user.email,coin:'ltc'})
        let eth = await balance.findBy({email:user.email,coin:'eth'})
        let notifications=await notification.query().where({email:user.email}).fetch()
        let transactions=await transaction.query().where({email:user.email}).fetch()

        return view.render('dashboard/index',{
          btc:btc,
          bch:bch,
          eth:eth,
          ltc:ltc,
          param:request.url(),
          title:Env.get('TITLE'),
          notifications:notifications.toJSON()[0],
          transactions:transactions.toJSON()[0],
          fromNow:fromNow
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
