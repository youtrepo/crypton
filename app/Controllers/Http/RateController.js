'use strict'
const ratings=use('App/Models/Rating')
class RateController {
  async rate({request,response,auth}){
    try{
      await auth.check()
      let user = await auth.getUser()
      let data=await request.only(['rating', 'feedback','user'])
      await ratings.create({
        username:data.user,
        ratings:data.rating,
        feedback:data.feedback
      })
      await response.json({success:true,msg:'feedback success'})

    }catch (e) {
      if (e.message==='E_INVALID_SESSION: Invalid session'){
        response.redirect('/login')
      }else {
        response.status(500).redirect('/500')
      }
      console.log(e)

    }
  }
}

module.exports = RateController
