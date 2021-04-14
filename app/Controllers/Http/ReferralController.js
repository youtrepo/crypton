'use strict'

const users=use('App/Models/User')
const Env = use('Env')

class ReferralController {
  async referral({request,response,view,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      //lets get users username
      let referralDetails=await users.findBy('email', user.email)
      return view.render('dashboard/referral',{
        link:Env.get('URL')+'/'+referralDetails.username,
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

module.exports = ReferralController
