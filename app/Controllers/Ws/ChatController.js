'use strict'

/*
///////////////
websockets controller for trade chats
/////////////////////
*/
const chat=use('App/Models/Chat')
const trade=use('App/Models/Trade')
const offers=use('App/Models/User')
const Chat=use('App/Models/Chat')
const moment = require('moment');
class ChatController {
  async chat({request, response, view,auth,params}) {
    try {
      await auth.check()
      let trade_id=params.id
      if(trade_id===undefined){
        response.status(400).redirect('/400')
      }
      let user=await auth.getUser()
      let trade_data=await trade.query().where({trade_id:trade_id}).fetch()
      let offer_data=await offers.query().where({username:trade_data.toJSON()[0].seller}).fetch()
      let real_user=await offers.query().where({email:user.email}).fetch()
      let chat=await Chat.query().where({trade_id:trade_id}).fetch()
      let owner=await offer_data.toJSON()[0].email
      let [buyer,seller]=[trade_data.toJSON()[0].buyer,trade_data.toJSON()[0].seller]
      if (trade_data.toJSON()[0].length===0){
        response.status(400).redirect('/400')
      }
      let formatter = await new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:trade_data.toJSON()[0].currency,
      });
      return view.render('dashboard/chat',{
        seller:seller,
        buyer:buyer,
        me:real_user.toJSON()[0].username,
        amount:formatter.format(trade_data.toJSON()[0].local_amount),
        id:trade_id,
        owner:(owner===user.email),
        chat_start:moment(trade_data.toJSON()[0].created_at).format("dddd hh:mm a"),
        time:moment(trade_data.toJSON()[0].deadline).utc().toDate(),
        chat:chat.toJSON(),
        trade:trade_data.toJSON()[0]

      })
    } catch (e) {
      if (e.message==='E_INVALID_SESSION: Invalid session'){
        response.redirect('/login')
      }else {
        response.status(500).redirect('/500')
      }
      console.log(e)
    }
  }
}

module.exports = ChatController