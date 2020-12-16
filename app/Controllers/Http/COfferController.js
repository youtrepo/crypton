'use strict'


const { v4: uuidv4 } = require('uuid');
const offers=use('App/Models/Offer')
const users=use('App/Models/User')
class COfferController {
  async c_offer({auth,request,response,view}){
    try{
      await auth.check()
      let user = await auth.getUser()
      let data=await request.post()
      let user_name=await users.findBy('email',user.email)
      const offer_id=await uuidv4()
      let create_offer=await offers.findOrCreate(
        { offer_id:offer_id },{
          offer_id:offer_id,
        email:user.email,
        offer_type:data.type,
        coin:data.coin,
        payment_method:data.payment_method,
        currency:data.currency,
        margin:data.margin,
        min_amount:data.min_amount,
        max_amount:data.max_amount,
        timeframe:data.timeframe,
        country:data.country,
        terms:data.terms,
        instructions:data.instructions,
        privacy:data.contact,
        requirements:data.requirements,
          status:'active',
          'user':user_name.username
      })
console.log(offer_id)
      return response.send('success')
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

module.exports = COfferController
