'use strict'

class ProfileController {
  async profile({request, response, view,auth}) {
    try {
      await auth.check()
      return view.render('dashboard/profile')
    } catch (error) {
      console.log(error)
      if (error.message === 'E_INVALID_SESSION: Invalid session') {
        response.redirect('/login')
      } else {
        response.status(500).redirect('/500')
      }
    }
  }
}

module.exports = ProfileController
