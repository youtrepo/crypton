'use strict'

class AdmindashboardController {
  async admin({request,response,view}){
    try {
      return view.render('admin/dashboard')
    }catch (e){
      console.log(e)
    }
  }
}

module.exports = AdmindashboardController
