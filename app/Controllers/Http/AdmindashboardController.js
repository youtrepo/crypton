'use strict'

class AdmindashboardController {
  async admin({request,response,view,auth}){
    try {
      await auth.check()
      let user=await auth.getUser()
      let isAdmin=(user.is_admin === 1)
      if (isAdmin){
        return view.render('admin/dashboard')
      }else {
        response.status(403).redirect('/403')
      }
    }catch (e){
      if (e.message === 'E_INVALID_SESSION: Invalid session') {
        response.redirect('/login')
      } else {
        response.status(500).send('error')
      }
      console.log(e)
    }
  }
}

module.exports = AdmindashboardController
