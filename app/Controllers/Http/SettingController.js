'use strict'
const users=use('App/Models/User')
const { authenticator} =require('otplib');
const Env=use('Env')
const qr=require('qrcode')
const Drive=use('Drive')

class SettingController {
  async settings({request,response,view,auth}){
    try {
      await auth.check()
      let user = await auth.getUser()
      const username =user.username;
      const service = Env.get('TITLE');
      let secret=await users.query().where({email:user.email}).fetch()
      let check_secret=secret.toJSON()[0]
      let token=check_secret.secret
      if (!check_secret.secret){
        let token=await authenticator.generateSecret();
        let update_secret=await users.query().where({email:user.email}).update({secret:token})
      }
      const otpauth = await authenticator.keyuri(username, service,token)
      const image=await qr.toDataURL(otpauth,{width: 200})
      let data=await users.findBy('email',user.email)
      const exists = await Drive.exists(`uploads/${user.username}/pic.jpg`)
      let file=null
      if (exists){
        file=await Drive.get(`uploads/${user.username}/pic.jpg`,'base64')
      }
    return view.render('dashboard/settings',{
      user:user,
      file:file,
      otp:token,
      qr:image
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
