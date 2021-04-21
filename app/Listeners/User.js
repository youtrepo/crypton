'use strict'

//import mail
const Mail = use('Mail')
const Helpers = use('Helpers')
const Env = use('Env')

const User = exports = module.exports = {}

User.registered = async (data) => {
  try {
    await Mail.send('emails.welcome',data, (message) => {
      message
        .to(data.email)
        .from(Env.get('MAIL_USERNAME'))
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
  }catch (e) {
    console.log(e)
  }
}
