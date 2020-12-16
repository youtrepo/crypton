'use strict'

const Env = use('Env')
const offer=use('App/Models/Offer')
class UserofferController {
  async offers({auth,request,response,view}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let offers=await offer.query().where({email:user.email}).fetch()
      console.log(offers.toJSON())
      return view.render('dashboard/offers',{offers:offers.toJSON(),param:request.url(), title:Env.get('TITLE'),})
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

module.exports = UserofferController
