'use strict'

class DashboardController {
  async dashboard({request,response,view}){
    return view.render('dashboard/index')
  }
}

module.exports = DashboardController
