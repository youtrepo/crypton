'use strict'

const users=use('App/Models/User')
const referral=use('App/Models/Referral')
const Env = use('Env')

class ReferralController {
  async referral({request,response,view,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      //lets get users username
      let referralDetails=await users.findBy('email', user.email)
      //get referrals
      let refs=await referral.query().where({username:user.username}).fetch()
      return view.render('dashboard/referral',{
        link:Env.get('APP_URL')+'/signup?ref='+referralDetails.username,
        refs:refs.toJSON()
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
