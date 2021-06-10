'use strict'

const users=use('App/Models/User')
const { authenticator} =require('otplib');
class AuthenticatorController {
  async authenticator({request, response, auth}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      let data=request.only(['token'])
      let token=data.token
      let getsecret=await users.query().where({email:user.email}).fetch()
      let secret=getsecret.toJSON()[0].secret
      if (token){
        const isValid=await authenticator.verify({token,secret})
        if (isValid){
          await users.query().where({email:user.email}).update({'2fa':true})
          await response.json({
           success:true,
            msg:'2fa Enabled successfully'
          })
        }else {
          await response.json({
            success:false,
            msg:'Authenticator code not valid'
          })
        }
      }

    } catch (error) {
      console.log(error)
      if (error.message === 'E_INVALID_SESSION: Invalid session') {
        response.status(403).send('unauthorized')
      } else {
        response.status(500).redirect('/500')
      }
    }
  }
}

module.exports = AuthenticatorController
