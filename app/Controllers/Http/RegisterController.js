'use strict'

const Env = use('Env')
const Event = use('Event')
let {verify} = require('hcaptcha');
const User = use('App/Models/User')
const balance=use('App/Models/Balance')
const referral=use('App/Models/Referral')
const iplocate = require("node-iplocate");
const publicIp = require('public-ip');
const { v4: uuidv4 } = require('uuid');
class RegisterController {
  async register({request,response,view,session,auth}){
    let data=request.only(['username','email','password'])
    let ref=request.only(['ref'])
    let [secret,token]=[Env.get('captcha_secret'),request.post()['g-recaptcha-response']]
    let verify_captcha=await verify(secret, token)
    if (verify_captcha.success===false){
      response.send('Captcha error')
    }else{
      try {
        let ip=await request.ip()
        let country=await iplocate(ip)
        data.country=(country.country)?country.country:'United States'
        data.ip=ip
        data.token=uuidv4();
        let checkuser=await User.findBy({email:data.email})
        let checkusername=await User.findBy({username:data.username})
        if (checkusername){
          response.send('username exists')
        }else if (!checkuser){
          const balances=[{
            username:data.username,
            email:data.email,
            coin:'btc'
          },
            {
              username:data.username,
              email:data.email,
              coin:'eth'
            },
            {
              username:data.username,
              email:data.email,
              coin:'bch'
            },
            {
              username:data.username,
              email:data.email,
              coin:'ltc'
            }



          ]
          await User.create(data)
          await balance.createMany(balances)
          if (ref.ref){
            await referral.findOrCreate({ref:data.username},{
              username:ref.ref,
              ref:data.username,
              email:data.email
            })

            //update balances
            await balance
              .query()
              .where('username', ref.ref)
              .increment({
                value:0.00001
              })
          }
          data.info=Env.get('APP_URL')+'/verify/'+data.token
          //fire event new user registered
          Event.fire('new::user', data)

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
