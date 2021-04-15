'use strict'

class AdminloginController {
  async admin({request,response,view,auth}){
    return view.render('admin/index')
  }
}

module.exports = AdminloginController
