'use strict'
const users=use('App/Models/User')
const Drive=use('Drive')

class SettingController {
  async settings({request,response,view,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      let data=await users.findBy('email',user.email)
      const exists = await Drive.exists(`uploads/${user.username}/pic.jpg`)
      let file=null
      if (exists){
        file=await Drive.get(`uploads/${user.username}/pic.jpg`,'base64')
      }
      console.log(file)
    return view.render('dashboard/settings',{
      user:user,
      file:file
    })
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
