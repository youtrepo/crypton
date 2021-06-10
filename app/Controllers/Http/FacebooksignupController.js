'use strict'

const User = use('App/Models/User')
const balance=use('App/Models/Balance')
const iplocate = require("node-iplocate");

class FacebooksignupController {
  async redirect ({ ally }) {
    await ally.driver('facebook').redirect()
  }

  async callback ({request, ally, auth,view }) {
    try {
      const fbUser = await ally.driver('facebook').getUser()

      //get users location
      let ip=await request.ip()
      let country=await iplocate(ip)

      // user details to be saved
      const userDetails = {
        email: fbUser.getEmail(),
        token: fbUser.getAccessToken(),
        username:fbUser.getName(),
        country:country,
        login_source: 'facebook'
      }
        userDetails.ip=ip

      //balances
      const balances=[{
        email:userDetails.email,
        coin:'btc'
      },
        {
          email:userDetails.email,
          coin:'eth'
        },
        {
          email:userDetails.email,
          coin:'bch'
        },
        {
          email:userDetails.email,
          coin:'ltc'
        }



      ]

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      const checkBalances=await balances.findByOrFail('email', userDetails.email)

      if (!checkBalances) {
        await balance.createMany(balances)
      }
      await auth.login(user)

      return view.render('dashboard/')
    } catch (error) {
      console.log(error)
      return 'Unable to authenticate. Try again later'
    }
  }
}

module.exports = FacebooksignupController
