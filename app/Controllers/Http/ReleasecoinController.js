'use strict'

const escrows=use('App/Models/Escrow')
const Balances=use('App/Models/Balance')
const users=use('App/Models/User')
const trades=use('App/Models/Trade')

class ReleasecoinController {
  async release({request, response, auth}) {
    try {
      await auth.check()
      let user = await auth.getUser()
      if (request.ajax()) {
        let data = await request.only(['id','user'])

        //release the coin and mark trade as completed
        let dispute = await trades.query().where({trade_id: data.id}).update({
          status: 'completed'
        })
        let escrow=await escrows.query().where({trade_id:data.id}).update({status:'completed'})
        let info=await escrows.query().where({trade_id:data.id}).fetch()
        let user=await users.query().where({username:data.user}).fetch()
        let escrowData=info.toJSON()[0]
        await Balances.query().where({email:user.toJSON()[0].email,coin:escrowData.coin.toLowerCase()}).increment({value:escrowData.amount})

        //response
        return response.json({success: true, msg: "Trade completed successfully"})
      }
    } catch (error) {
      if (error.message === 'E_INVALID_SESSION: Invalid session') {
        response.status(403).json({success: false, msg: 'forbidden'})
      } else {
        response.json({success: false, msg: 'something is wrong'})
        console.log(error)
      }
    }
  }
}

module.exports = ReleasecoinController
