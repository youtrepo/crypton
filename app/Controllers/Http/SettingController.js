'use strict'

class SettingController {
  async settings({request,response,view,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
    return view.render('dashboard/settings')
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

module.exports = SettingController
