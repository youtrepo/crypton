'use strict'
const trades=use('App/Models/Trade')
const users=use('App/Models/User')

class MytradeController {
  async trades({request,response,auth,view}){
    //here we get and render users trades
    try {
      await auth.check()
      let user = await auth.getUser()
      let userDetails=await users.query().where({email:user.email}).fetch()
      let User=await userDetails.toJSON()[0]
      let trade=await  trades.query().where({seller:User.username}).orWhere({buyer:User.username}).fetch()
      return view.render('dashboard/trades',{
        trades:trade.toJSON()
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

module.exports = MytradeController
