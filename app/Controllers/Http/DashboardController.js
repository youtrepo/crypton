'use strict'

class DashboardController {
  async dashboard({auth,request,response,view}){
    try {
      await auth.check()
      return view.render('dashboard/index')
    } catch (error) {
      response.redirect('/login')
    }
  }
}

module.exports = DashboardController
