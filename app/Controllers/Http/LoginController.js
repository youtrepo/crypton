'use strict'

const Env = use('Env')
class LoginController {
  async login({request,response,view,auth}){
    try {
      await auth.check()
      return response.redirect('/dashboard')
    }catch (e) {
      if (e.message==='E_INVALID_SESSION: Invalid session') {
        return view.render('landing/login', {captcha_key: Env.get('captcha_key')})
      }else {
        response.status(500).redirect('/500')
      }
    }
  }
}

module.exports = LoginController
