'use strict'

class BuyController {
  async buy({auth,request,response,params,view}){
    try {
      await auth.check()
      let user = await auth.getUser()
      if (params.id) {
        return view.render('dashboard/buy')
      }else {
        return view.render('errors/404')
      }

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

module.exports = BuyController
