'use strict'
const users=use('App/Models/User')
const offers=use('App/Models/Offer')
const trades=use('App/Models/Trade')
const wallets=use('App/Models/Wallet')
const alerts=use('App/Models/Alert')

class AdmindashboardController {
  async admin({request,response,view,auth}){
    try {
      await auth.check()
      let user=await auth.getUser()
      let isAdmin=(user.is_admin === 1)
      if (isAdmin){
        let[user,offer,trade,wallet]=[await users.all(),await offers.all(),await trades.all(),await wallets.all()]
        //successful trades
        let success=await trades.query().where({status:'completed'}).fetch()
        let pending=await trades.query().where({status:'paid'}).orWhere({status:'active'}).fetch()
        let disputed=await trades.query().where({status:'disputed'}).fetch()
        let cancelled=await trades.query().where({status:'cancelled'}).fetch()

        return view.render('admin/dashboard',{
          users:user.toJSON(),
          offers:offer.toJSON(),
          trades:trade.toJSON(),
          wallets:wallet.toJSON(),
          success:success.toJSON(),
          pending:pending.toJSON(),
          disputed:disputed.toJSON(),
          cancelled:cancelled.toJSON()
        })
      }else {
        response.status(403).redirect('/403')
      }
    }catch (e){
      if (e.message === 'E_INVALID_SESSION: Invalid session') {
        response.redirect('/login')
      } else {
        response.status(500).redirect('/500')
      }
      console.log(e)
    }
  }
  ///manage users
  async users({request,response,auth,view}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let isAdmin = (user.is_admin === 1)
      if (isAdmin) {
        let Users=await users.all()
        return view.render('admin/users',{users:Users.toJSON()})

      }else {
        response.status(403).redirect('/403')
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


  //manage disputed trades
  async trades({request,response,auth,view}){
    try {
      await auth.check()
      let user = await auth.getUser()
      let isAdmin = (user.is_admin === 1)
      if (isAdmin) {
        let disputed=await trades.query().where({status:'disputed'}).fetch()
        return view.render('admin/trades',{trades:disputed.toJSON()})

      }else {
        response.status(403).redirect('/403')
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



  ///mass alerts
  async alerts({request,response,auth,view}){
    try {
      await auth.check()
      let user = await auth.getUser()
      let isAdmin = (user.is_admin === 1)
      if (isAdmin) {
        let alert=await alerts.all()
        return view.render('admin/alerts',{alerts:alert.toJSON()})

      }else {
        response.status(403).redirect('/403')
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

module.exports = AdmindashboardController
