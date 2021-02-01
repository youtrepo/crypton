'use strict'

const Env = use('Env')
const Ws=use('App/Services/Ws')
class LoginController {
  async login({request,response,view,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      Ws.on('connection',(socket)=>{socket.join(user.email)})
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
