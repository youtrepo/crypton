'use strict'

const Env = use('Env')
class LoginController {
  async login({request,response,view,auth}){
    try {
      await auth.check()
      return response.redirect('/dashboard')
    }catch (e) {
      return view.render('landing/login',{captcha_key:Env.get('captcha_key')})
    }
  }
}

module.exports = LoginController
