'use strict'

const moment = require('moment');
const Drive=use('Drive')
const trades=use('App/Models/Trade')
const offers=use('App/Models/Offer')


class ProfileController {
  async profile({request, response, view,auth}) {
    try {
      await auth.check();
      let user = await auth.getUser()
      let offer=await offers.query().where({email:user.email}).fetch()
      let activeTrades=await trades.query().where({seller:user.username,status:'active'}).orWhere({buyer:user.username,status:'paid'}).orWhere({buyer:user.username,status:'active'}).orWhere({seller:user.username,status:'paid'}).orWhere({buyer:user.username,status:'active'}).orWhere({seller:user.username,status:'disputed'}).orWhere({buyer:user.username,status:'active'}).orWhere({buyer:user.username,status:'disputed'}).fetch()
      let total=await  trades.query().where({seller:user.username}).orWhere({buyer:user.username}).fetch()
      let cancelled=await  trades.query().where({seller:user.username,status:'cancelled'}).orWhere({buyer:user.username,status:'cancelled'}).fetch()
      let disputed=await  trades.query().where({seller:user.username,status:'disputed'}).orWhere({buyer:user.username,status:'disputed'}).fetch()
      let success=await  trades.query().where({seller:user.username,status:'completed'}).orWhere({buyer:user.username,status:'completed'}).fetch()
      let totalTrades=total.toJSON()
      const exists = await Drive.exists(`uploads/${user.username}/pic.jpg`)
      let file=null
      if (exists){
        file=await Drive.get(`uploads/${user.username}/pic.jpg`,'base64')
      }

      return view.render('dashboard/profile',{
       user:user,
        moment:moment,
        file:file,
        total:totalTrades,
        pending:activeTrades.toJSON(),
        cancelled:cancelled.toJSON(),
        disputed:disputed.toJSON(),
        success:success.toJSON(),
        offers:offer.toJSON()
      })
    } catch (error) {
      console.log(error)
      if (error.message === 'E_INVALID_SESSION: Invalid session') {
        response.redirect('/login')
      } else {
        response.status(500).redirect('/500')
      }
    }
  }
}

module.exports = ProfileController
