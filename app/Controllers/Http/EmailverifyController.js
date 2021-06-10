'use strict'

const Mail = use('Mail')
const Env = use('Env')
const Helpers = use('Helpers')
const authenticator=require('otplib')
const secret=Env.get('APP_KEY')



class EmailverifyController {
  async verify({request, response,auth}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      const token =authenticator.totp.generate(secret);
      user.token=token
      await Mail.send('emails.verify',user, (message) => {
        message
          .to(user.email)
          .from(Env.get('MAIL_SENDER'))
          .subject('Welcome to ' + Env.get('TITLE'))
          .embed(Helpers.publicPath('/images/Top.png'), 'logo')
          .embed(Helpers.publicPath('/images/Top_blu.png'), 'blue')
          .embed(Helpers.publicPath('/images/message_1.png'), 'message1')
          .embed(Helpers.publicPath('/images/safe-deposit.png'), 'safedepo')
          .embed(Helpers.publicPath('/images/exchange_1.png'), 'exchange')
          .embed(Helpers.publicPath('/images/creativepencil.png'), 'creative')
          .embed(Helpers.publicPath('/images/facebook2x.png'), 'facebook')
          .embed(Helpers.publicPath('/images/twitter2x.png'), 'twitter')
          .embed(Helpers.publicPath('/images/instagram2x.png'), 'instagram')
          .embed(Helpers.publicPath('/images/eedff64b-4552-4bea-bea4-7a9eb07487a7.jpg'), 'notknown')
          .embed(Helpers.publicPath('/images/Icon_logo_animate.gif'), 'gif')
          .embed(Helpers.publicPath('/images/Btm_blu.png'), 'btm')
      })
      await response.json({
        success:true,
        msg:'Code sent successfully,check your email inbox'
      })

    } catch (e) {
      if (e.message === 'E_INVALID_SESSION: Invalid session') {
        response.status(403)
      } else {
        response.json({
          success:false,
          msg:'internal server error'
        })
      }
      console.log(e)

    }
  }
}

module.exports = EmailverifyController
