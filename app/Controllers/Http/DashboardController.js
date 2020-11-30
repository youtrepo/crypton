'use strict'

const balance=use('App/Models/Balance')
class DashboardController {
  async dashboard({auth,request,response,view}){
    try {
      if (await auth.check()) {
        let user = await auth.getUser()
        let btc = await balance.findBy({email:user.email,coin:'btc'})
        let bch = await balance.findBy({email:user.email,coin:'bch'})
        let ltc = await balance.findBy({email:user.email,coin:'ltc'})
        let eth = await balance.findBy({email:user.email,coin:'eth'})

        return view.render('dashboard/index',{
          btc:btc,
          bch:bch,
          eth:eth,
          ltc:ltc
        })
      }else {
        response.redirect('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = DashboardController
