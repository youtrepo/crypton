'use strict'

const Env = use('Env')
const Mail = use('Mail')
const Helpers = use('Helpers')
const {verify} = require('hcaptcha');
const User = use('App/Models/User')
const balance=use('App/Models/Balance')
const iplocate = require("node-iplocate");
const publicIp = require('public-ip');
const { v4: uuidv4 } = require('uuid');
class RegisterController {
  async register({request,response,view,session,auth}){
    let data=request.only(['username','email','password'])
    let [secret,token]=[Env.get('captcha_secret'),request.post()['g-recaptcha-response']]
    let verify_captcha=await verify(secret, token)
    if (verify_captcha.success===false){
      response.send('Captcha error')
    }else{
      try {
        let ip=await publicIp.v4({onlyHttps:true})
        let country=await iplocate(ip)
        data.country=(country.country)?country.country:'usa'
        data.ip=ip
        data.token=uuidv4();
        let checkuser=await User.findBy({email:data.email})
        let checkusername=await User.findBy({username:data.username})
        if (checkusername){
          response.send('username exists')
        }else if (!checkuser){
          const balances=[{
            email:data.email,
            coin:'btc'
          },
            {
              email:data.email,
              coin:'eth'
            },
            {
              email:data.email,
              coin:'bch'
            },
            {
              email:data.email,
              coin:'ltc'
            }



          ]
          await User.create(data)
          await balance.createMany(balances)
          let info=Env.get('URL')+'/verify/'+data.token
          await Mail.send('emails.welcome',info, (message) => {
            message
              .to(data.email)
              .from(Env.get('MAIL_USERNAME'))
              .subject('Welcome to '+Env.get('TITLE'))
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
          await auth
            .remember(true)
            .attempt(data.email, data.password)
          response.send('success')
        }else {
          response.send('User exists')
        }
      }catch (e){
        response.send('oops something is wrong on our end')
        console.log(e)
      }

    }

  }
}

module.exports = RegisterController
