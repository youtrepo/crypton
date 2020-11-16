'use strict'

class LoginController {
  async login({request,response,view}){
    return view.render('landing/login')
  }
}

module.exports = LoginController
