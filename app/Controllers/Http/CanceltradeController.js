'use strict'

const trades=use('App/Models/Trade')
const escrows=use('App/Models/Escrow')
const balances=use('App/Models/Balance')


class CanceltradeController {
  async cancel({request,response,auth}){
    try{
      await auth.check()
      let user = await auth.getUser()
      let data=await request.only(['id','user'])
      let tradeData=await trades.query().where({trade_id:data.id}).fetch()
      let info=tradeData.toJSON()[0]
      let escrow=await escrows.query().where({trade_id:data.id}).fetch()
      let escrowData=escrow.toJSON()[0]

      //cancel the trade only if active which means no payment has been made
      if (info.status==='active'&&escrowData.status==='pending'){
        await trades.query().where({trade_id:data.id}).update({status:'cancelled'})

        //return escrow
        await balances.query().where({email:escrowData.email,coin:escrowData.coin.toLowerCase()}).increment({value:escrowData.amount})

        //mark escrow completed
        await escrows.query().where({trade_id:data.id}).update({status:'completed'})

        //response
        await response.json({success:true,msg:'Trade cancelled'})

      }


    }catch (e) {
      if (e.message==='E_INVALID_SESSION: Invalid session'){
        response.redirect('/login')
      }else {
        response.status(500).json({success:false,msg:'server error'})
      }
      console.log(e)

    }
  }
}

module.exports = CanceltradeController
