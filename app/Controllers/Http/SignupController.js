'use strict'

const users=use('App/Models/User')
const Env = use('Env')
class SignupController {
  async signup({request,response,view,auth}){
    try {
      await auth.check()
      response.redirect('/dashboard')
    }catch (e) {
      if (e.message==='E_INVALID_SESSION: Invalid session') {
        let msg = null
        let ref = request.get('ref').ref
        if (ref) {
          let isUser = await users.findBy('username', ref)
          if (isUser) {
            msg = {
              user: isUser.toJSON().username
            }
          }
        }
        return view.render('landing/signup', {
          captcha_key: Env.get('captcha_key'),
          msg: msg
        })
      }else {
        response.status(500).redirect('/500')
      }
    }
  }
}

module.exports = SignupController
