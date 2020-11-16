'use strict'
const Env = use('Env')
class SignupController {
  async signup({request,response,view}){
    return view.render('landing/signup',{captcha_key:Env.get('captcha_key')})
  }
}

module.exports = SignupController
