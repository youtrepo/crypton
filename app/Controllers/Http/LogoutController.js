'use strict'

class LogoutController {
  async logout({request,response,auth}){
    try {
      await auth.logout()
      return response.redirect('/login')
    }catch (e) {
      console.log(e)
    }
  }
}

module.exports = LogoutController
