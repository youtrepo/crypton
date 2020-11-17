'use strict'


const Env = use('Env')
const {verify} = require('hcaptcha');
class AuthenticateController {
  async authenticate({request,response,auth}){
    let data=await request.only(['email','password'])
    let [secret,token]=[Env.get('captcha_secret'),request.post()['g-recaptcha-response']]
    let verify_captcha=await verify(secret, token)
    if (verify_captcha.success===false){
      response.send('Captcha error')
    }else {
      try{
        await auth
          .remember(true)
          .attempt(data.email, data.password)
        return response.send('success')
      }catch (e) {
        response.send('invalid login')
        console.log(e)
      }
    }
  }
}

module.exports = AuthenticateController
