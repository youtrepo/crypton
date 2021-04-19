'use strict'

class ProfileController {
  async profile({request, response, view,auth}) {
    try {
      await auth.check();
      let user = await auth.getUser()
      // console.log(user)
      return view.render('dashboard/profile',{
        fullname: user.$attributes.username,
        country:  user.$attributes.country, 
        email: user.$attributes.email
      })
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
